// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Ball constructor
//
// Sets the properties with the provided arguments
function Ball(x, y, vx, vy, size, speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball.prototype.update = function() {
  // Update position with velocity
  this.x += this.vx;
  this.y += this.vy;

  // Constrain y position to be on screen
  this.y = constrain(this.y, 0, height - this.size);

  // Check for touching upper or lower edge and reverse velocity if so
  if (this.y === 0 || this.y + this.size === height) {
    this.vy = -this.vy;
  }
}

// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Ball.prototype.isOffScreen = function() {
  // Check for going off screen and reset if so
  if (this.x + this.size < 0 || this.x > width) {
    //=======================================NEW CODE============================//
    if (this.x >= width) {
      leftPaddle.score += 1;
      leftPaddle.latestPoint = true;
      rightPaddle.latestPoint = false;
    }
    if (this.x <= 0) {
      rightPaddle.score += 1;
      rightPaddle.latestPoint = true;
      leftPaddle.latestPoint = false;
    }
    //=======================================END CODE============================//
    return true;
  } else {
    return false;
  }
}

// display()
//
// Draw the ball as a rectangle on the screen
Ball.prototype.display = function() {
  fill(255);
  rect(this.x, this.y, this.size, this.size);
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleCollision = function(paddle) {
  // Check if the ball overlaps the paddle on x axis
  if (this.x + this.size > paddle.x && this.x < paddle.x + paddle.w) {
    // Check if the ball overlaps the paddle on y axis
    if (this.y + this.size > paddle.y && this.y < paddle.y + paddle.h) {
      // If so, move ball back to previous position (by subtracting current velocity)
      this.x -= this.vx;
      this.y -= this.vy;
      // Reverse x velocity to bounce
      this.vx = -this.vx;
      this.vy = map(paddle.y - this.y, -paddle.h / 2, paddle.h, this.speed, -this.speed);
      console.log(leftPaddle.latestPoint);
    }
  }
}

// reset()
//
// Set position back to the middle of the screen
// Send the ball towards the winning paddle
Ball.prototype.reset = function() {
  //=====================NEW CODE=====================================//
  // reset the vy back to 5
  this.vy = 5;
  // if ball x goes off the right side
  if (this.x > width) {
    // reverse the velocity the ball was going at to send it to the left paddle
    this.vx = -this.vx;
    this.vy = -this.vy;
    this.vy = random(-this.vy, this.vy);
  }
  // if ball x goes off the left side
  if (this.x < 0) {
    // reverse the velocity to send the ball to the right side
    this.vx = -this.vx;
    this.vy = -this.vy;
    this.vy = random(-this.vy, this.vy);
  }
  //=====================END CODE=====================================//
  this.x = width / 2;
  this.y = height / 2;
}
