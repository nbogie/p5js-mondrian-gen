"use strict";

var paletteStrs = [
  "yellow,yellow,gray",
  "#c70000,#f4b600,#2d2bb4,black",
  "#FE4365,#FC9D9A,#F9CDAD,#C8C8A9,#83AF9B,#FE4365,#FC9D9A,#F9CDAD",
  "#69D2E7,#A7DBD8,#E0E4CC,#F38630,#FA6900,#69D2E7,#A7DBD8,#E0E4CC",
  "#556270,#4ECDC4,#C7F464,#FF6B6B,#C44D58,#556270,#4ECDC4,#C7F464"
];
var useFeltTip = false;

function setup() {
  var limit = min(windowWidth, windowHeight);
  var d = min(limit, 320);
  var w1 = d;
  var h1 = d;

  createCanvas(w1, h1);
}

function draw() {
  var seed = random(0, 99999999);
  randomSeed(seed);

  useFeltTip = random() > 0.5;
  var colors = random(paletteStrs).split(",");
  var presets = {
    chip: {
      hs: [10, 50, 60, 110, 180, 230, 320, 330],
      vs: [10, 190, 230, 240, 250, 260, 280, 330],
      colors: [
        "#69D2E7",
        "#A7DBD8",
        "#E0E4CC",
        "#F38630",
        "#FA6900",
        "#69D2E7",
        "#A7DBD8",
        "#E0E4CC"
      ]
    }
  };
  var preset = presets.chip;
  var margin = 20;
  var plan = planMondrian({ x: margin, y: margin }, width - margin * 2, seed);
  drawMondrianFromPlan(colors, plan);
  console.log(plan);
  //drawMondrian(320, preset.colors, preset.hs, preset.vs);
}

function planMondrian(pos, dim, seed, horizs, verts) {
  randomSeed(seed);

  var bw = dim;
  var bh = dim;

  var minLineSpace = 20;
  var numInternalLines = 6;

  function generateLinePositions(num, offset, mx, spacing) {
    return Array.from(
      new Array(num),
      (a, b) => offset + randomQuantised(spacing, mx)
    );
  }

  if (typeof verts == "undefined") {
    verts = sort(
      [pos.x, pos.x + bw].concat(
        generateLinePositions(numInternalLines, pos.x, bh, minLineSpace)
      )
    );
  }
  if (typeof horizs == "undefined") {
    horizs = sort(
      [pos.y, pos.y + bh].concat(
        generateLinePositions(numInternalLines, pos.y, bh, minLineSpace)
      )
    );
  }

  return {
    pos: pos,
    verts: verts,
    horizs: horizs,
    bw: bw,
    bh: bh,
    background: "white",
    strokeColor: "black",
    strokeWeight: bw / 140.0
  };
}

function drawMondrianFromPlan(colors, plan) {
  var verts = plan.verts;
  var horizs = plan.horizs;
  var pos = plan.pos;
  var bw = plan.bw;
  var strokeColor = plan.strokeColor;
  background(plan.background);
  strokeWeight(plan.strokeWeight);

  var bh = plan.bh;

  function drawColors() {
    var ixs = oneUpto(verts.length);
    var iys = oneUpto(horizs.length);
    colors.forEach(function(c) {
      var ix, ix2, iy, iy2;
      [ix, ix2] = _.sample(ixs, 2);
      [iy, iy2] = _.sample(iys, 2);
      somerect(verts[ix], horizs[iy], verts[ix2], horizs[iy2], strokeColor, c);
    });
  }

  function drawLines() {
    horizs.forEach(function(y) {
      someline(pos.x, y, pos.x + bw, y, strokeColor);
    });
    verts.forEach(function(x) {
      someline(x, pos.y, x, pos.y + bh, strokeColor);
    });
  }
  if (useFeltTip) {
    drawColors();
    drawLines();
  } else {
    drawLines();
    drawColors();
  }

  noLoop();
}

function someline(a, b, c, d) {
  strokeWeight(2);
  stroke("black");
  if (useFeltTip) {
    ftline(a, b, c, d);
  } else {
    line(a, b, c, d);
  }
}

function somerect(x1, y1, x2, y2, scol, fcol) {
  if (useFeltTip) {
    noStroke();
    fill(fcol);
    rectMode(CORNERS);
    rect(x1, y1, x2, y2);

    stroke("black");
    var rw = x2 - x1;
    var rh = y2 - y1;
    ftrect(x1, y1, rw, rh);
  } else {
    fill(fcol);
    stroke("black");
    rectMode(CORNERS);
    rect(x1, y1, x2, y2);
  }
}
function mousePressed() {
  draw();
}

function oneUpto(mx) {
  return Array.from(new Array(mx), (x, i) => i);
}

function randomQuantised(spacing, mx) {
  return spacing * floor(random(0, mx / spacing));
}

/* Code courtesy of http://stackoverflow.com/questions/12796513/html5-canvas-to-png-file*/

function saveCanvas() {
  var image = canvas.toDataURL("image/png");
  /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
  image = image.replace(/^data:image\/[^;]*/, "data:application/octet-stream");
  /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
  image = image.replace(
    /^data:application\/octet-stream/,
    "data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=mondrian.png"
  );
  this.href = image;
}

function keyPressed() {
  if (key == "S") {
    saveCanvas();
  }
}

//felt-tip simulated lines, from Nikolaus Gradwohl
//https://www.local-guru.net/blog/2010/4/23/simulation-of-hand-drawn-lines-in-processing
function ftline(x1, y1, x2, y2) {
  beginShape();
  vertex(x1 + random(-2, 2), y1 + random(-2, 2));
  curveVertex(x1 + random(-2, 2), y1 + random(-2, 2));
  curveVertex(
    x1 + (x2 - x1) / 3 + random(-2, 2),
    y1 + (y2 - y1) / 3 + random(-2, 2)
  );
  curveVertex(
    x1 + 2 * (x2 - x1) / 3 + random(-2, 2),
    y1 + 2 * (y2 - y1) / 3 + random(-2, 2)
  );
  curveVertex(x2 + random(-2, 2), y2 + random(-2, 2));
  vertex(x2 + random(-2, 2), y2 + random(-2, 2));
  endShape();

  beginShape();
  vertex(x1 + random(-1, 1), y1 + random(-1, 1));
  curveVertex(x1 + random(-1, 1), y1 + random(-1, 1));
  curveVertex(
    x1 + (x2 - x1) / 3 + random(-1, 1),
    y1 + (y2 - y1) / 3 + random(-1, 1)
  );
  curveVertex(
    x1 + 2 * (x2 - x1) / 3 + random(-1, 1),
    y1 + 2 * (y2 - y1) / 3 + random(-1, 1)
  );
  curveVertex(x2 + random(-1, 1), y2 + random(-1, 1));
  vertex(x2 + random(-1, 1), y2 + random(-1, 1));
  endShape();
}

function ftrect(x1, y1, w, h) {
  ftline(x1, y1, x1, y1 + h);
  ftline(x1, y1, x1 + w, y1);
  ftline(x1 + w, y1, x1 + w, y1 + h);
  ftline(x1, y1 + h, x1 + w, y1 + h);
}
