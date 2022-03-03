let width = 800;
let height = 500;
let highScore;
let lastscore;

function setup() {
  createCanvas(width, height);
  highScore = localStorage.getItem(`birdScore`);
  lastScore = localStorage.getItem(`birdLastScore`);
}

const massHeight = 200;
const massWidth = 10;

let x = 0;
let y = 100;
let gravity = 0.2;
let yV = 0;

let mass = [randomInteger(30, 500 - 70 - massHeight)];
let massX = [0];
let gameInProgress = 1;

let score = 0;
let maxNumber = 0;

function draw() {
  if (gameInProgress == 1) {
    checkScreen();
    checkBird();
    background(140, 245, 201);
    drawBird();
    if (x % 100 == 0) {
      massX.push(x - 100 * massX.length);
      mass.push(randomInteger(30, 500 - 70 - massHeight));
    }
    for (let i = 0; i < massX.length; i += 1) {
      drawRect(massX[i], mass[i]);
    }
    drawScore(score, lastScore);
  }
  if (gameInProgress == 0) {
    stroke(250, 250, 250);
    strokeWeight(2);
    fill(20, 20, 20);
    text("Game end, press R to restart.", width / 2, height / 2);
    text(`Your score: ${score}`, width / 2, height / 1.8);
    if (highScore == null) {
      highScore = score;
    }
    if (score > highScore) {
      highScore = score;
    }
    lastScore = score;
    localStorage.setItem(`birdLastScore`, lastScore);
    localStorage.setItem(`birdScore`, highScore);
  }
}

function drawScore() {
  stroke(250, 250, 250);
  strokeWeight(2);
  fill(20, 20, 20);
  text(`Your score: ${score}`, 20, 30);
  text(`Last score: ${lastScore}`, 20, 50);
  text(`High score: ${highScore}`, 20, 70);
}

function drawRect(xi, yi) {
  rectMode(CORNERS);
  stroke(138, 137, 240);
  strokeWeight(4);
  fill(138, 137, 240);
  rect(800 - massWidth - xi, 0, 800 - xi, yi);
  rect(800 - massWidth - xi, yi + massHeight, 800 - xi, 500);
}

function drawBird() {
  stroke(255, 209, 176);
  strokeWeight(6);
  fill(255, 149, 74);
  ellipse(400, y, 10 * 2);

  x += 1;
  for (let i = 0; i < massX.length; i += 1) {
    massX[i] += 1;
  }

  x += 1;
  if (yV < 0) {
    yV += gravity * 10;
  }
  if (yV >= 0) {
    yV += gravity;
  }

  y += yV;
}

function checkScreen() {
  if (y >= 500) {
    gameInProgress = 0;
  }
  if (y < 0) {
    gameInProgress = 0;
  }
}

function checkBird() {
  for (let i = 0; i < massX.length; i += 1) {
    if (massX[i] >= 410) {
      maxNumber = i + 1;
    }
    if (massX[i] <= 410 && massX[i] >= 380) {
      if (y + 10 < mass[i]) {
        gameInProgress = 0;
      }
      if (y - 10 > mass[i] + massHeight) {
        gameInProgress = 0;
      }
    }
  }
  score = maxNumber;
}

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function keyPressed() {
  if (keyCode == 32) {
    yV = -17;
  }
  if (keyCode == 82) {
    window.location.reload();
  }
}
