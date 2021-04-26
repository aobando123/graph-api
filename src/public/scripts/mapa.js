var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var t = 1;
var points = [];
var globalV = [];
var globalG = [];
var globalC = [];
var globalUbicacionA = false;
var globalUbicacionB = false;
var rutaElem = document.getElementById("ruta");
var pesoElem = document.getElementById("pesoRuta");
var listItem = null;
var listItemW = null;

ctx.lineCap = 'round';
initMapCanvas();

function initMapCanvas() {
  var boxes = [
    {x:31, y:204, w:70, h:30, name: 'Garabito'},
    {x:204, y:41, w:70, h:30, name: 'Esparza'},
    {x:409, y:82, w:70, h:30, name: 'Orotina'},
    {x:298, y:229, w:70, h:30, name: 'Turrubares'},
    {x:628, y:180, w:70, h:30, name: 'Atenas'},
    {x:275, y:402, w:70, h:30, name: 'Puriscal'},
    {x:482, y:348, w:70, h:30, name: 'Mora'},
    {x:407, y:667, w:70, h:30, name: 'Acosta'},
    {x:652, y:478, w:70, h:30, name: 'Santa_Ana'},
    {x:51, y:567, w:70, h:30, name: 'Parrita'},
    {x:828, y:734, w:70, h:30, name: 'Aserri'},
    {x:937, y:550, w:70, h:30, name: 'Alajuelita'},
    {x:855, y:398, w:70, h:30, name: 'Escazu'},
    {x:1129, y:665, w:100, h:30, name: 'Desamparados'},
    {x:1134, y:447, w:70, h:30, name: 'Curridabat'},
    {x:1259, y:382, w:100, h:30, name: 'Montes_de_Oca'},
    {x:1312, y:755, w:100, h:30, name: 'Leon_Cortes'},
    {x:1091, y:45, w:70, h:30, name: 'Tibas'},
    {x:1231, y:225, w:70, h:30, name: 'Goicoechea'},
    {x:1405, y:96, w:70, h:30, name: 'Moravia'},
    {x:1427, y:261, w:120, h:30, name: 'Vazquez_de_Coronado'},
    {x:1426, y:613, w:50, h:30, name: 'Dota'},
    {x:946, y:178, w:70, h:30, name: 'San_Jose'},
    {x:1683, y:729, w:70, h:30, name: 'Tarrazu'},
    {x:1769, y:583, w:100, h:30, name: 'Perez_Zeledon'},
  ];

  $.ajax({
    method: "GET",
    url: "/map/graph",
  }).done(function( graphData ) {
    graphData.forEach(data => {
      var boxV = boxes.find(box => box.name === data.name);
      Object.assign(data, boxV);
    });

    calculateVerticesCanvas(graphData);
    printOptionsMap(graphData);
  });
}

function calculateVerticesCanvas(graphData) {
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
  drawCanvas(vertices, graphData)
}

function drawCanvas(vertices, graphData) {
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'white';
  ctx.beginPath();

  vertices.forEach(vertice => {
    ctx.moveTo(vertice.nodeX, vertice.nodeY);
    ctx.lineTo(vertice.x, vertice.y);
  });

  ctx.stroke();

  if (globalV.length === 0) {
    globalV = vertices;
    globalG = graphData;
  }

  drawLocations();
}

function drawLocations() {
  globalG.forEach(graph => {
    if (globalUbicacionA == graph.name || globalUbicacionB == graph.name) {
      ctx.fillStyle = '#ffaf57';
    } else {
      ctx.fillStyle = 'white';
    }
    ctx.fillRect(graph.x, graph.y, graph.w, graph.h);
    ctx.fillStyle = '#000';
    ctx.fillText(graph.name, graph.x + 10, graph.y + 20);
  });
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
  if (t != 1) {
    cleanCanvas();
  };
  globalUbicacionA = optionA;
  globalUbicacionB = optionB;
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#ffaf57";

  $.ajax({
    method: "GET",
    url: `/map/shortest/${optionA}/${optionB}`,
  }).done(function( caminoData ) {
    var caminoVertices = getCaminoVertices(globalV, caminoData.path);
    console.log(caminoVertices);
    points = calcWaypoints(caminoVertices);
    $('#pesoTexto').css("display", "block");
    $('#pesoTotal').text("Total : "+caminoData.totalWeigth+"km");

    caminoVertices.forEach(vertice => {
      if (vertice.weight) { addListItem(vertice); }
    });

    animate();
  });
}

function initAnimationBuscar(option) {
  if (t != 1) {
    cleanCanvas();
  };
  globalUbicacionA = option;
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#ffaf57";
  $('#pesoTexto').css("display", "block");

  var caminoVertices = [];
  var init = globalV.find(vertice => vertice.node === option);
  caminoVertices.push({x: init.nodeX, y: init.nodeY});

  globalV.forEach(vertice => {
    if (vertice.node === option) {
      addListItem(vertice);
      caminoVertices.push(vertice);
      caminoVertices.push({x: init.nodeX, y: init.nodeY});
    }
  });
  points = calcWaypoints(caminoVertices);
  animate();
}

function addListItem(vertice) {
  listItem = document.createElement("li");
  listItemW = document.createElement("li");
  listItem.appendChild(document.createTextNode(vertice.name));
  listItemW.appendChild(document.createTextNode(vertice.weight + "km"));
  rutaElem.appendChild(listItem);
  pesoElem.appendChild(listItemW);
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
      path.weight = pathVertice.weight;
    }
  });
  caminoVertices.unshift(caminoInit);
  return (caminoVertices.filter(camino => camino.x));
}

function calcWaypoints(verticesC) {
    var waypoints = [];
    for (var i = 1; i < verticesC.length; i++) {
        var pt0 = verticesC[i - 1];
        var pt1 = verticesC[i];
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

    ctx.beginPath();
    ctx.moveTo(points[t - 1].x, points[t - 1].y);
    ctx.lineTo(points[t].x, points[t].y);
    ctx.stroke();
    drawLocations();
    t++;
}

function printOptionsMap(graph) {
  var selectA = document.getElementById("selectA");
  var selectB = document.getElementById("selectB");
  var ubicacion = document.getElementById("ubicacion");
  graph.forEach(vertice => {
    var optionA = document.createElement("option");
    var optionB = document.createElement("option");
    var ubicacionOption = document.createElement("option");
    optionA.text = vertice.name;
    optionA.value = vertice.name;
    optionB.text = vertice.name;
    optionB.value = vertice.name;
    ubicacionOption.text = vertice.name;
    ubicacionOption.value = vertice.name;
    ubicacion.add(ubicacionOption);
    if (selectA && selectB) {
      selectA.add(optionA);
      selectB.add(optionB);
    }
  });
}

function cleanCanvas() {
  t = 1;
  $('#ruta').empty();
  $('#pesoRuta').empty();
  $('#pesoTotal').empty();
  globalUbicacion = false;
  globalUbicacionB = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCanvas(globalV, globalG);
}

$( "#buscarUbicaciones" ).click(function() {
  var optionA = $('#selectA').val();
  var optionB = $('#selectB').val();
  
  initAnimation(optionA, optionB);
});

$( "#buscarUbicacion" ).click(function() {
  var option = $('#ubicacion').val();
  
  initAnimationBuscar(option);
});

$( "#limpiarMapa" ).click(function() {
  cleanCanvas();
});
