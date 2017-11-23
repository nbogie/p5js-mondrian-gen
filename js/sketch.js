"use strict";
//Palettes:
//Giant Goldfishby manekineko: http://www.colourlovers.com/palette/92095/Giant_Goldfish
//(???)by sugar!: http://www.colourlovers.com/palette/629637/()
//cheer up emo kid by electrikmonk: http://www.colourlovers.com/palette/1930/cheer_up_emo_kid

var paletteStrs = [
  "#c70000,#f4b600,#2d2bb4,black",
  "#FE4365,#FC9D9A,#F9CDAD,#C8C8A9,#83AF9B,#FE4365,#FC9D9A,#F9CDAD",
  "#69D2E7,#A7DBD8,#E0E4CC,#F38630,#FA6900,#69D2E7,#A7DBD8,#E0E4CC",
  "#556270,#4ECDC4,#C7F464,#FF6B6B,#C44D58,#556270,#4ECDC4,#C7F464"
];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  var seed = random(0,99999999);
  randomSeed(seed);

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
  var plan = planMondrian({x: 20, y: 20}, 320, seed);
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
    verts = sort([pos.x, pos.x + bw].concat(
      generateLinePositions(numInternalLines, pos.x, bh, minLineSpace))
    );
  }
  if (typeof horizs == "undefined") {
    horizs = sort([pos.y, pos.y + bh].concat(
      generateLinePositions(numInternalLines, pos.y, bh, minLineSpace))
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
    strokeWeight: bw
  };
}


function drawMondrianFromPlan(colors, plan) {
  var verts = plan.verts;
  var horizs = plan.horizs;
  var pos = plan.pos;
  var bw = plan.bw;
  var strokeColor = plan.strokeColor;
  stroke(strokeColor);
  background(plan.background);
  strokeWeight(bw/140.0);

  var bh = plan.bh;
  horizs.forEach(function(y) {
    line(pos.x, y, pos.x + bw, y);
  });
  verts.forEach(function(x) {
    line(x, pos.y, x, pos.y + bh);
  });

  var ixs = oneUpto(verts.length);
  var iys = oneUpto(horizs.length);
  rectMode(CORNERS);

  colors.forEach(function(c) {
    var ix, ix2, iy, iy2;
    [ix, ix2] = _.sample(ixs, 2);
    [iy, iy2] = _.sample(iys, 2);
    fill(c);
    stroke(strokeColor);
    rect(verts[ix], horizs[iy], verts[ix2], horizs[iy2]);
  });

  noLoop();
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