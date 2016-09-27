var state = 0;
var scrHue = 0;
var turnTimes;
var avgScr;
var currentTurtle;
var shift = false;
var startAngle, turnAngle, turnDelay, density, width, hInit, sInit, bInit, hChange, sChange, bChange;
var turtles = [];

function Turtle(initX, initY) {
  this.oldPosition = new p5.Vector(initX,initY);
  this.position = new p5.Vector(initX, initY);
  this.nextStep = new p5.Vector(0, 0);
  this.step = function() {
    this.oldPosition.set(this.position);
    this.position.add(this.nextStep);
    stroke(currentColor[0], currentColor[1], currentColor[2]);
    line(this.oldPosition.x, this.oldPosition.y, this.position.x, this.position.y);
    
    console.log(this.angle);
    this.nextStep = p5.Vector.fromAngle(currentAngle += turnAngle).normalize().mult(turnDelay);
    currentColor = [currentColor[0] + hChange, currentColor[1] + sChange, currentColor[2] + bChange];
    if(currentColor[0] > 100) {
      currentColor[0] -= 100;
    } if(currentColor[0] < 0) {
      currentColor[0] += 100;
    }
  }
  this.draw = function() {
    currentAngle = startAngle;
    for(var i = 0; i < turnTimes; i++) {
      this.step();
    }
  }
}

function initArt() {
	turtles = [];
	shift = false;
  startAngle = random(360);
  turnAngle = random(-360,360);
  turnDelay = random(avgScr/150,avgScr/25);
  xDensity = random(avgScr/150, avgScr/10);
  yDensity = random(avgScr/150, avgScr/10);
  lineWidth = random(avgScr/500, avgScr/50);
  hInit = random(100);
  sInit = random(100);
  bInit = random(100);
  turnTimes = random(20);
  hChange = random(-10,10);
  sChange = random(-10,10);
  bChange = random(-10,10);
  if(random(2) < 1) {
    background(0,0,0);
  } else {
    background(0,0,100);
  }
	
	for(var x = 0 - xDensity; x < width + xDensity; x += xDensity) {
		if(shift) {
			for(var y = 0 - yDensity; y < height + yDensity; y += yDensity) {
				turtles.push(new Turtle(x,y));
				console.log('new turtle at ' + x + y);
			}
		} else {
			for(var y = 0 - yDensity/2; y < height + yDensity; y += yDensity) {
				turtles.push(new Turtle(x,y));
				console.log('new turtle at ' + x + y);
			}
		}
		shift = !shift;
  }
	
	console.log(turtles.length);
}

function doArt() {
  strokeWeight(lineWidth);
  
	currentColor = [hInit, sInit, bInit];
	console.log('doing art on turtle ' + currentTurtle);
  turtles[currentTurtle].draw();
	
	currentTurtle++;
  
  if(currentTurtle === turtles.length) {
		state = 3;
	}
}

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
	frameRate(144);
  colorMode(HSB, 100);
  avgScr = (width+height)/2;
  textAlign(CENTER);
}

function draw() {
  if(state === 0) {
    background(scrHue,20,100);
    textSize(width/30);
    strokeWeight(0);
    text("PRESS F TO GENERATE RANDOM ART", width/2, height/3);
    scrHue += 0.0125;
    if(scrHue > 100) {
      scrHue -= 100;
    }
  } else if(state === 1) {
    background(scrHue,20,100);
    text("LOADING...", width/2, height/3);
    state = 2;
		currentTurtle = 0;
		initArt();
  } else if(state === 2) {
    doArt();
  }
}

function keyPressed() {
  if(state === 0 && key === "F") {
    state = 1;
  } else if(state === 3 && key === "F") {
    state = 0;
  }
}