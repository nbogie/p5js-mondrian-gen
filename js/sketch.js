"use strict";

var palettes = [

    { name:"canva: muted and antique", str: "#a4cabc,#eab364,#b2473e,#acbd78" },
    { name: "canva: surf and turf", str: "#6ab187,#20948b,#de7a22,#f4cc70" },
    { name: "canva: grecian holiday", str: "#2988bc,#2f496e,#f4eade,#ed8c72" },
    { name: "canva: fun and tropical" , str: "#4897d8,#ffdb5c,#fa6e59,#f8a055" },
    { name: "canva: timeless and nautical" , str: "#00293c,#1e656d,#f1f3c3,#f62a00" },
  
    { name: "Acoustic Hail by manekineko", str: "#FFE577,#C2BEB9,#F99767,#F6705F,#B0A6A6,#FFE577,#C2BEB9,#F99767"},  // http://www.colourlovers.com/palette/3740326/Acoustic_Hail
    { name: "Five Chameleons by manekineko", str: "#C3E216,#535527,#474A26,#22DD9B,#EEDB35,#C3E216,#535527,#474A26"},  // http://www.colourlovers.com/palette/3751540/Five_Chameleons
    { name: "1001 stories ", str: "#F8B195,#F67280,#C06C84,#6C5B7B,#355C7D,#F8B195,#F67280,#C06C84"}, //http://www.colourlovers.com/palette/1811244/1001_Stories
    { name: "papua new guinea", str: "#5E412F,#FCEBB6,#78C0A8,#F07818,#F0A830,#5E412F,#FCEBB6,#78C0A8"}, // http://www.colourlovers.com/palette/919313/Papua_New_Guinea
    { name: "trance", str: "#452632,#91204D,#E4844A,#E8BF56,#E2F7CE,#452632,#91204D,#E4844A"}, // http://www.colourlovers.com/palette/594151/t_r_a_n_c_e
    { name: "koi carp", str: "#F0D8A8,#3D1C00,#86B8B1,#F2D694,#FA2A00,#F0D8A8,#3D1C00,#86B8B1"}, // http://www.colourlovers.com/palette/656966/Koi_Carp
    { name: "dance to forget", str: "#FF4E50,#FC913A,#F9D423,#EDE574,#E1F5C4,#FF4E50,#FC913A,#F9D423"}, // http://www.colourlovers.com/palette/937624/Dance_To_Forget
    { name: "coup de grace", str: "#99B898,#FECEA8,#FF847C,#E84A5F,#2A363B,#99B898,#FECEA8,#FF847C"}, // http://www.colourlovers.com/palette/1098589/coup_de_gr%C3%A2ce
    { name: "wasabi suicide", str: "#FF4242,#F4FAD2,#D4EE5E,#E1EDB9,#F0F2EB,#FF4242,#F4FAD2,#D4EE5E"}, //wasabi suicide http://www.colourlovers.com/palette/482416/Wasabi_Suicide
    { name: "yellow and gray", str: "yellow,yellow,gray"},
    { name: "mondrian-ish", str: "#c70000,#f4b600,#2d2bb4,black"},
    { name: "??? by sugar!", str: "#FE4365,#FC9D9A,#F9CDAD,#C8C8A9,#83AF9B,#FE4365,#FC9D9A,#F9CDAD"}, // http://www.colourlovers.com/palette/629637/()
    { name: "Giant Goldfish by manekineko", str: "#69D2E7,#A7DBD8,#E0E4CC,#F38630,#FA6900,#69D2E7,#A7DBD8,#E0E4CC"}, // http://www.colourlovers.com/palette/92095/Giant_Goldfish
    { name: "Cheer Up Emo Kid", str: "#556270,#4ECDC4,#C7F464,#FF6B6B,#C44D58,#556270,#4ECDC4,#C7F464"}, // http://www.colourlovers.com/palette/1930/cheer_up_emo_kid
    { name: "LoversInJapan by lovelyrita", str: "#E94E77,#D68189,#C6A49A,#C6E5D9,#F4EAD5"}, // http://www.colourlovers.com/palette/867235/LoversInJapan
    { name: "Ocean Five by DESIGNJUNKEE", str: "#00A0B0,#6A4A3C,#CC333F,#EB6841,#EDC951"}, // http://www.colourlovers.com/palette/1473/Ocean_Five
    { name: "Entrapped InAPalette by annajak", str: "#B9D7D9,#668284,#2A2829,#493736,#7B3B3B"}, // 
    { name: "mellon ball surprise by Skyblue2u", str: "#D1F2A5,#EFFAB4,#FFC48C,#FF9F80,#F56991"}, //
    { name: "fresh cut day by electrikmonk", str: "#00A8C6,#40C0CB,#F9F2E7,#AEE239,#8FBE00"}  // 


  ];

var useFeltTip = false;

var gPlanLocked;
var gPlanPrevious;
var gPaletteLocked;
var gPalettePrevious;

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
  
  var palette = gPaletteLocked ? gPaletteLocked : random(palettes);
  var colors = _.shuffle(palette.str.split(","));
  console.log("palette is ", palette.name, " and plan is: ", plan);

  drawMondrianFromPlan(colors, plan);
  gPlanPrevious = plan;
  gPalettePrevious = palette;
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
  gPaletteLocked = gPalettePrevious;
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

