function setup() {
  createCanvas(800, 500);
}
let x = 100;
let y = 100;
let gravity = 0.1;
let yV = 0;
let y1 = randomInteger(30, 400);
let height = 70;
function draw() {
  background(200);
  drawBird();
  drawRect();
}
function drawRect() {
  rectMode(CORNERS);
  stroke(250, 100, 0);
  strokeWeight(2);
  fill(0, 0, 255);
  rect(50, 0, 70, y1);
  rect(50, y1 + 70, 70, 500);
}
function drawBird() {
  stroke(100, 225, 100);
  strokeWeight(3);
  fill(120, 120, 120);
  ellipse(x, y, 10 * 2);
  x += 1;
  if (yV < 0) {
    yV += gravity * 10;
  }
  if (yV >= 0) {
    yV += gravity;
  }

  y += yV;
}

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function keyPressed() {
  yV = -10;
}
