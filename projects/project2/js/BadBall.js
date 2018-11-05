// BadBall
//
//  A class which defines how the corrupted balls will behave. Bad balls appear once
// the aliens score a point, if a bad ball touches a paddle they will be

// BadBall constructor
//
// Sets the properties with the provided arguments
function BadBall(x, y, vx, vy, size, speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
}

// update()
//
// Moves according to velocity, check for bounce off of sides.
//check if ball has gone off the bottom screen.
BadBall.prototype.update = function() {
  // Update position with velocity
  this.x += this.vx;
  // when ball reaches one side of the reverse x velocity and move down one row.
  if (this.x + this.size < 0 || this.x > width) {
    this.vx = -this.vx;
    this.y += this.vy;
  }
  // Constrain y position to be on screen
  this.y = constrain(this.y, 0, height - this.size);
  // Check for touching upper or lower edge and neutralize bad ball if so.
  if (this.y + this.size === height) {
    this.x = 250;
    this.y = 250;
    this.vx = 0;
    this.vy = 0;
  }
}

// display()
//
// Draw the bad ball as a  red rectangle on the screen
BadBall.prototype.display = function() {
  fill(255, 0, 0);
  rect(this.x, this.y, this.size, this.size);
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so shrink the paddle by 10.
BadBall.prototype.handleCollision = function(paddle) {
  // Check if the bad ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the bad ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      paddle.h -= 10;
    }
  }
}
