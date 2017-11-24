"use strict";

var paletteStrs = [
  "yellow,yellow,gray",
  "#c70000,#f4b600,#2d2bb4,black",
  "#FE4365,#FC9D9A,#F9CDAD,#C8C8A9,#83AF9B,#FE4365,#FC9D9A,#F9CDAD",
  "#69D2E7,#A7DBD8,#E0E4CC,#F38630,#FA6900,#69D2E7,#A7DBD8,#E0E4CC",
  "#556270,#4ECDC4,#C7F464,#FF6B6B,#C44D58,#556270,#4ECDC4,#C7F464",
  "#E94E77,#D68189,#C6A49A,#C6E5D9,#F4EAD5", // ["LoversInJapan by lovelyrita"](http://www.colourlovers.com/palette/867235/LoversInJapan)
  "#00A0B0,#6A4A3C,#CC333F,#EB6841,#EDC951", // ["Ocean Five by DESIGNJUNKEE"](http://www.colourlovers.com/palette/1473/Ocean_Five)
  "#B9D7D9,#668284,#2A2829,#493736,#7B3B3B", // "Entrapped InAPalette by annajak",
  "#D1F2A5,#EFFAB4,#FFC48C,#FF9F80,#F56991", // "mellon ball surprise by Skyblue2u"
  "#00A8C6,#40C0CB,#F9F2E7,#AEE239,#8FBE00"  // "fresh cut day by electrikmonk"
    
  
];
var useFeltTip = false;

var gPlanLocked;
var gPlanPrevious;
var gColorsLocked;
var gColorsPrevious;

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

  useFeltTip = random() > 0.1;
  var presets = {
    chip: {
      hs: [10, 50, 60, 110, 180, 230, 320, 330],
      vs: [10, 190, 230, 240, 250, 260, 280, 330]
    }, 
    geom: {
      hs: [20, 20, 40, 160, 160, 180, 280, 300],
      vs: [20, 20, 20, 80, 120, 140, 220, 300]
    }
  };

  var preset = presets.geom;
  var margin = 20;
  
  var plan = gPlanLocked? gPlanLocked : planMondrian({ x: margin, y: margin }, width - margin * 2, seed);
  var colors = gColorsLocked ? gColorsLocked : random(paletteStrs).split(",");  
  
  console.log('plan is: ', plan);

  drawMondrianFromPlan(colors, plan);
  gPlanPrevious = plan;
  gColorsPrevious = colors;
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

function lockPlan() {
  gPlanLocked = gPlanPrevious;
}

function lockColors() {
  gColorsLocked = gColorsPrevious;
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
  switch(key) {
    case "S": 
      saveCanvas();
      break;
    case "L": 
      lockPlan();
      break;
    case "C": 
      lockColors();
      break;
    default: 
      break;
  }
}

//felt-tip simulated lines, from Nikolaus Gradwohl
//https://www.local-guru.net/blog/2010/4/23/simulation-of-hand-drawn-lines-in-processing
function oneWavyLine(x1, y1, x2, y2, amt) {  
  noFill();
  beginShape();
  var dotTheEnds = false;
  var dx = x2 - x1;
  var dy = y2 - y1;

  if (dotTheEnds) {
    var r = 3;
    fill("black");
    ellipseMode(CENTER);
    ellipse(x1, y1, r, r);
    ellipse(x2, y2, r, r);
    noFill();
  }
  //start of line
  vertex(x1 + random(-amt, amt), y1 + random(-amt, amt));

  //at the start
  curveVertex(x1 + random(-amt, amt), y1 + random(-amt, amt));

  //1/3 of the way along
  curveVertex(x1 + dx / 3 + random(-amt, amt), y1 + dy / 3 + random(-amt, amt));

  //2/3 of the way along
  curveVertex(
    x1 + 2 * dx / 3 + random(-amt, amt),
    y1 + 2 * dy / 3 + random(-amt, amt)
  );

  //at the destination
  curveVertex(x2 + random(-amt, amt), y2 + random(-amt, amt));

  //end of line
  vertex(x2 + random(-amt, amt), y2 + random(-amt, amt));

  endShape();
}

function ftline(x1, y1, x2, y2) {
  [1, 2].forEach(function(variance) {
    strokeWeight(1);
    stroke("black");
    oneWavyLine(x1, y1, x2, y2, variance);
  });
}
function ftrect(x1, y1, w, h) {
  ftline(x1, y1, x1, y1 + h);
  ftline(x1, y1, x1 + w, y1);
  ftline(x1 + w, y1, x1 + w, y1 + h);
  ftline(x1, y1 + h, x1 + w, y1 + h);
}

