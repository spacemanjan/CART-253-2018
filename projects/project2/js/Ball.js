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
// Adds points to respective paddle when the ball goes into the goal.
Ball.prototype.isOffScreen = function() {
  // Check for going off screen and reset if so
  if (this.x + this.size < 0 || this.x > width) {
    //=======ADDED CODE============//
    if (this.x + this.size < 0) {
      rightPaddle.score += 1;
      this.vx = -this.vx;
      this.vy = -this.vy;
    }
    if (this.x > width) {
      leftPaddle.score += 1;
      this.vx = -this.vx;
      this.vy = -this.vy;
    }
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
    }
  }
}

//handleCapture()
//
// Check to see if ball has been caught by alien & if it's been beemed up
// if yes then ball is caught and imobile
// if the ball has been beemed up add 1 point for the aliens and reset the ball.
Ball.prototype.handleCapture = function(Aliens) {
  if (aliens.capture === true) {
    this.x = aliens.x;
    this.y = aliens.y;
    if (this.y < 0) {
      aliens.score += 1;
      aliens.capture = false;
      ball.reset();
    }
  } else if (aliens.destroyed === true) {
    this.x = this.x;
    this.y = this.y;
  }

}

// reset()
//
// Set position back to the middle of the screen
Ball.prototype.reset = function() {
  this.vy = 5;
  this.x = width / 2;
  this.y = height / 2;
}
