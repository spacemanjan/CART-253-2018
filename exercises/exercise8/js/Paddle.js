// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down
//Paddle constructor

//Sets the properties with the provided arguments or defaults
function Paddle(x,y,w,h,speed,downKey,upKey,rightKey,leftKey) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  this.rightKey = rightKey;
  this.leftKey = leftKey;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  }
  else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  }
  else {
    this.vy = 0;
  }
  if (glitch.level1 === true) {
	  if (keyIsDown(this.rightKey)) {
		  this.vx = this.speed;
	  }
	  else if (keyIsDown(this.leftKey)) {
		  this.vx = -this.speed;
	  }
	  else {
		  this.vx = 0;
	  }
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.x += this.vx;
  if (glitch.level1 === false || glitch.level2 === false){
  this.y = constrain(this.y, 0, canvas1Height - this.h);
}
//=============NEED TO UPDATE===================//
// for some reason this isn't constraining the players x 
if (glitch.level2 === false && this.x > 720){
	this.x = constrain(this.x, 720, 1440);
	console.log("ASSHASIDOS")
}
}


// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  rect(this.x, this.y, this.w, this.h);
}
