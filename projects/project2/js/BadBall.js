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
  if (this.x < 0 || this.x + this.size/2 > width) {
    this.vx = -this.vx;
    this.y += this.vy;
  }
  // Check for touching lower edge and neutralize bad ball if so.
  if (this.y + this.size/2 === height) {
    this.x = 0;
    this.y = -100;
    this.vx = 0;
    this.vy = 0;
  }
}

// display()
//
// Draw the bad ball as a  red rectangle on the screen
BadBall.prototype.display = function() {
  fill(255, 0, 0);
  image(evilBall, this.x, this.y, this.size, this.size);
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so paddle loses points by a factor of 1
BadBall.prototype.handleCollision = function(paddle) {
  // Check if the bad ball overlaps the paddle on x axis
  if (this.x + this.size/1.5 > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the bad ball overlaps the paddle on y axis
    if (this.y + this.size/1.5> paddle.y && this.y < paddle.y + paddle.h) {
      paddle.score -= 1;
    }
  }
}
