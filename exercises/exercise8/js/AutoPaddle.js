// AutoPaddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down
//Paddle constructor

//Sets the properties with the provided arguments or defaults
function AutoPaddle(x,y,w,h,speed) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
AutoPaddle.prototype.controler = function(ball) {
this.vy = ball.vy;
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
AutoPaddle.prototype.update = function() {
  this.y += this.vy;
  this.x += this.vx;
  this.y = constrain(this.y, 0, canvas1Height - this.h);
}


// display()
//
// Draw the paddle as a rectangle on the screen
AutoPaddle.prototype.display = function() {
  rect(this.x, this.y, this.w, this.h);
}
