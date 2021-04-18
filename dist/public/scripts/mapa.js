var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.lineCap = 'round';

// variable to hold how many frames have elapsed in the animation
var t = 1;

var boxes = [];
boxes.push({
  x: 46,
  y: 169,
  w: 50,
  h: 50,
  color: '#79f7c9',
  name: 'A',
  nodes: [
    {
      nameOfVertex: 'C',
      weight: 3
    },
    {
      nameOfVertex: 'E',
      weight: 7
    },
    {
      nameOfVertex: 'B',
      weight: 4
    }
  ],
}); // A
boxes.push({
  x: 258,
  y: 45,
  w: 50,
  h: 50,
  color: '#4a9177',
  name: 'B',
  nodes: [
    {
      nameOfVertex: 'A',
      weight: 4
    },
    {
      nameOfVertex: 'C',
      weight: 6
    },
    {
      nameOfVertex: 'D',
      weight: 5
    }
  ],
}); // B
boxes.push({
  x: 503,
  y: 126,
  w: 50,
  h: 50,
  color: '#0dd48b',
  name: 'C'
}); // C
boxes.push({
  x: 279,
  y: 252,
  w: 50,
  h: 50,
  color: '#053825',
  name: 'D'
}); // D
boxes.push({
  x: 92,
  y: 370,
  w: 50,
  h: 50,
  color: '#051710',
  name: 'E'
}); // E
boxes.push({
  x: 472,
  y: 365,
  w: 50,
  h: 50,
  color: '#0f9944',
  name: 'F'
}); // F
boxes.push({
  x: 234,
  y: 450,
  w: 50,
  h: 50,
  color: '#5ac784',
  name: 'G'
}); // G


// define the path to plot
var vertices = [];
boxes.forEach(box => {
  if (box.nodes) {
    box.nodes.forEach(node => {
      vertices.push({
        name: box.name + ' -> ' + node.nameOfVertex,
        nodeX: (box.x + box.w / 2),
        nodeY: (box.y + box.h / 2),
        x: node.nameOfVertex,
        y: node.nameOfVertex
      });
    })
  }
});

boxes.forEach(box => {
  vertices.forEach(vertice => {
    if (box.name == vertice.x) {
      vertice.x = box.x + box.w / 2;
      vertice.y = box.y + box.h / 2;
    }
  })
});

console.log(vertices);


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


// set some style
ctx.lineWidth = 5;
ctx.strokeStyle = '#fde293';
// calculate incremental points along the path
var points = calcWaypoints(vertices);
// extend the line from start to finish with animation

animate(points);

for (var i = 0; i < boxes.length; i++) {
  var box = boxes[i];
  ctx.fillStyle = box.color;
  ctx.fillRect(box.x, box.y, box.w, box.h);
  ctx.fillStyle = '#FFF';
  ctx.fillText(box.name, box.x + 20, box.y + 30);
}

// calc waypoints traveling along vertices
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
  // increment 't' to get the next waypoint
  t++;
}

function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  console.log('x: ' + x + ' y: ' + y)
}

canvas.addEventListener('mousedown', function (e) {
  getCursorPosition(canvas, e)
})

