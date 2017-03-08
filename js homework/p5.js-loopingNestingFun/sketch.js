var brickA = []; //brick empty array
var xtrasA = []; //door/hande/window empty array
var sunA = []; //rotating sun

function setup() {
  createCanvas(500, 500);
  background('#DDFFF7') //light blue

  for (var i = 0; i < 4; i++) { //initialize constructor
    brickA[i] = new Bricks();
  }

  for (var j = 0; j < 5; j++) { //initialize constructor
    xtrasA[j] = new Xtras();
  }

  for (var k = 0; k < 6; k++) {
    sunA = new Sun(0, 0, 50, 80, 20); //initialize sun constructor
  }

}

function draw() {

  var d = {
    x: 70,
    y: 350,
    w: 50,
    h: 85,
    e: 7
  }

  for (var i = 0; i < brickA.length; i++) { //build bricks
    brickA[i].brickLoop();
  }
  for (var j = 0; j < xtrasA.length; j++) { //build extra pieces - doors/stairs
    xtrasA[j].makeDoors(d.x, d.y, d.w, d.h, d.x + 20, d.y + 20, d.e, d.e);
    xtrasA[j].makeDoors(d.x + 155, d.y - 20, d.w, d.h, d.x + 180, d.y + 10, d.e, d.e);
    xtrasA[j].makeDoors(d.x + 330, d.y -10, d.w, d.h, d.x + 360, d.y + 20, d.e, d.e);
    xtrasA[j].makeStairs();
  }
  for (var k = 0; k < sunA.length; k++) {
    push();
    translate(width * 0.5, height * 0.8);
    rotate(frameCount / 100.0);
    sunA[k].sunny(0, 0, 50, 80, 20);
    pop();
  }
}


function Bricks() {
  this.brk = {
    x: 150,
    y: 100,
    w: 25,
    h: 10
  }

  this.brickLoop = function() { //will add more to manipulate with mouse here
    for (var i = 0; i < width; i += 25) {
      for (var j = 0; j < height; j += 10) {
        stroke('white'); //set up bricks
        strokeWeight(0.25);
        //loopin dem brickss
        if (i <= width/3 && j <= height - 100) { //left bldg
          fill('#684240'); //dark coffee 684240
          rect(i, j + 100, this.brk.w, this.brk.h);
        } else if (i <= width/1.5 && j <= height) { //middle bldg
          fill('#773E3B') //dark coral 773E3B
          rect(i, j + 150, this.brk.w, this.brk.h);
        } else if (i <= width && j <= height - 175) { //right bldg
          fill('#774C4A'); //other cool color = #772B2B // 774C4A
          rect(i, j + 175, this.brk.w, this.brk.h);
        }
      }
    }
  }
}

function Xtras() {
  this.xtra = {
    a: 100,
    b: 200,
    c: 300,
    d: 400,
    e: 50,
    f: 150
  }

  this.makeDoors = function(x1, y1, w1, h1, x2, y2, w2, h2) {
  //doors
  noStroke(); //door set up
  fill('brown');
  rect(x1, y1, w1, h1);
  stroke('black');
  strokeWeight(0.5); //handle set up
  fill('white');
  ellipse(x2, y2, w2, h2);
  }

  this.makeStairs = function() {
    //sidewalk
    fill('gray');
    rect(0, 400, 500, 100);
    //stair set up
    stroke('black');
    strokeWeight(3);
    //left stairs
    fill('brown');
    rect(this.xtra.e, this.xtra.d, this.xtra.a, this.xtra.b); //left stairs
    line(this.xtra.e, this.xtra.d + 30, this.xtra.f, this.xtra.d + 30);
    line(this.xtra.e, this.xtra.d + 70, this.xtra.f, this.xtra.d + 70);
    //right stairs
    fill('#683425');
    rect(this.xtra.c + 80, this.xtra.d, this.xtra.a - 10, this.xtra.b); //right stairs
    line(this.xtra.c + 80, this.xtra.d + 30, this.xtra.d + 70, this.xtra.d + 30);
    line(this.xtra.c + 80, this.xtra.d + 70, this.xtra.d + 70, this.xtra.d + 70);
    //middle stairs
    fill('#683425'); //find different color later
    rect(this.xtra.b, this.xtra.d, this.xtra.a, this.xtra.b); //middle stairs
    line(this.xtra.b, this.xtra.d + 30, this.xtra.c, this.xtra.d + 30);
    line(this.xtra.b, this.xtra.d + 70, this.xtra.c, this.xtra.d + 70);
  }
}

function Sun(x, y, radius1, radius2, npoints) {
  this.x = 250;
  this.y = 100;
  this.z = 200;
  this.w = 300;

  this.angle = TWO_PI / npoints;
  this.halfAngle = this.angle/2.0;


  this.sunny = function(x, y, radius1, radius2, npoints) { //need to change later! back to the petals
    noStroke();
    fill('yellow');

    beginShape();
    for (var i = 0; i < TWO_PI; i += this.angle) {
      var sx = x + cos(i) * radius2;
      var sy = y + sin(i) * radius2;

      vertex(sx, sy);
      sx = x + cos(i+this.halfAngle) * radius1;
      sy = y + sin(i+this.halfAngle) * radius1;

      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}


