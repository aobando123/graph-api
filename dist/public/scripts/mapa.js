var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var t = 1;
var points = [];
var globalV = [];
ctx.lineCap = 'round';
initMapCanvas();

function initMapCanvas() {
  var boxes = [];
  boxes.push({
    x: 46,
    y: 169,
    w: 50,
    h: 50,
    color: '#79f7c9',
  }); // A
  boxes.push({
    x: 258,
    y: 45,
    w: 50,
    h: 50,
    color: '#4a9177',
  }); // B
  boxes.push({
    x: 503,
    y: 126,
    w: 50,
    h: 50,
    color: '#0dd48b',
  }); // C
  boxes.push({
    x: 279,
    y: 252,
    w: 50,
    h: 50,
    color: '#053825',
  }); // D
  boxes.push({
    x: 92,
    y: 370,
    w: 50,
    h: 50,
    color: '#051710',
  }); // E
  boxes.push({
    x: 472,
    y: 365,
    w: 50,
    h: 50,
    color: '#0f9944',
  }); // F
  boxes.push({
    x: 234,
    y: 450,
    w: 50,
    h: 50,
    color: '#5ac784',
  }); // G

  $.ajax({
    method: "GET",
    url: "/map/graph",
  }).done(function( graphData ) {
    for (let index = 0; index < graphData.length; index++) {
      Object.assign(graphData[index], boxes[index]);
    }
    calculateVerticesCanvas(graphData);
    printOptionsMap(graphData);
  });
}

function calculateVerticesCanvas(graphData) {
  // define the path to plot
  var vertices = [];
  graphData.forEach(box => {
    if (box.nodes) {
      box.nodes.forEach(node => {
        vertices.push({
          node: box.name,
          name: box.name + '->' + node.nameOfVertex,
          weight: node.weight,
          nodeX: (box.x + box.w / 2),
          nodeY: (box.y + box.h / 2),
          x: node.nameOfVertex,
          y: node.nameOfVertex
        });
      })
    }
  });

  graphData.forEach(box => {
    vertices.forEach(vertice => {
      if (box.name == vertice.x) {
        vertice.x = box.x + box.w / 2;
        vertice.y = box.y + box.h / 2;
      }
    })
  });
  console.log(vertices);
  drawVerticesCanvas(vertices, graphData)
}

function drawVerticesCanvas(vertices, graphData) {
  // draw the complete line
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'white';
  // tell canvas you are beginning a new path
  ctx.beginPath();

  vertices.forEach(vertice => {
    ctx.moveTo(vertice.nodeX, vertice.nodeY);
    ctx.lineTo(vertice.x, vertice.y);
  });

  // stroke the path
  ctx.stroke();

  graphData.forEach(graph => {
    ctx.fillStyle = graph.color;
    ctx.fillRect(graph.x, graph.y, graph.w, graph.h);
    ctx.fillStyle = '#FFF';
    ctx.fillText(graph.name, graph.x + 20, graph.y + 30);
  });

  globalV = vertices;
}

function calcWaypoints(vertices) {
  var waypoints = [];
  vertices.forEach(vertice => {
    var pt0 = { x: vertice.nodeX, y: vertice.nodeY };
    var pt1 = { x: vertice.x, y: vertice.y };
    var dx = pt1.x - pt0.x;
    var dy = pt1.y - pt0.y;
    for (var j = 0; j < 100; j++) {
      var x = pt0.x + dx * j / 100;
      var y = pt0.y + dy * j / 100;
      waypoints.push({
        x: x,
        y: y
      });
    }
  });
  return (waypoints);
}

function initAnimation(optionA, optionB) {
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#669df6";

  $.ajax({
    method: "GET",
    url: `/map/shortest/${optionA}/${optionB}`,
  }).done(function( caminoData ) {
    var caminoVertices = getCaminoVertices(globalV, caminoData);
    points = calcWaypoints(caminoVertices);
    console.log(caminoVertices);
    document.getElementById("json").innerHTML = JSON.stringify(caminoData, undefined, 2);
    animate();
  });
}

function getCaminoVertices(vertices, camino) {
  var caminoVertices = [];
  var caminoInit = {};
  camino.reduce(( pre, cur ) => {
    caminoVertices.push({name: pre + '->' + cur});
    return cur;
  });
  caminoVertices.forEach(path => {
    const pathVertice = vertices.find(vertice => vertice.name === path.name);
    const pathInit = vertices.find(vertice => vertice.node === camino[0]);
    if (!caminoInit.x && pathInit) {
      caminoInit.x = pathInit.nodeX;
      caminoInit.y = pathInit.nodeY;
    }
    if (pathVertice) {
      path.x = pathVertice.x;
      path.y = pathVertice.y;
    }
  });
  caminoVertices.unshift(caminoInit);
  return (caminoVertices.filter(camino => camino.x));
}


// calc waypoints traveling along vertices
function calcWaypoints(vertices) {
    var waypoints = [];
    for (var i = 1; i < vertices.length; i++) {
        var pt0 = vertices[i - 1];
        var pt1 = vertices[i];
        var dx = pt1.x - pt0.x;
        var dy = pt1.y - pt0.y;
        for (var j = 0; j < 100; j++) {
            var x = pt0.x + dx * j / 100;
            var y = pt0.y + dy * j / 100;
            waypoints.push({
                x: x,
                y: y
            });
        }
    }
    return (waypoints);
}


function animate() {
    if (t < points.length - 1) {
        requestAnimationFrame(animate);
    }
    // draw a line segment from the last waypoint
    // to the current waypoint
    ctx.beginPath();
    ctx.moveTo(points[t - 1].x, points[t - 1].y);
    ctx.lineTo(points[t].x, points[t].y);
    ctx.stroke();
    // increment "t" to get the next waypoint
    t++;
}

function printOptionsMap(graph) {
  var selectA = document.getElementById("selectA");
  var selectB = document.getElementById("selectB");
  graph.forEach(vertice => {
    var optionA = document.createElement("option");
    var optionB = document.createElement("option");
    optionA.text = vertice.name;
    optionA.value = vertice.name;
    optionB.text = vertice.name;
    optionB.value = vertice.name;
    selectA.add(optionA);
    selectB.add(optionB);
  });
}

$( "#buscarUbicaciones" ).click(function() {
  var optionA = $('#selectA').val();
  var optionB = $('#selectB').val();
  
  initAnimation(optionA, optionB);
});

