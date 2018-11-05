// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down

// Paddle constructor
//
// Sets the properties with the provided arguments or defaults
function Paddle(x, y, w, h, speed, downKey, upKey, score) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.downKey = downKey;
  this.upKey = upKey;
  this.score = score;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {
  if (keyIsDown(this.upKey)) {
    this.vy = -this.speed;
  } else if (keyIsDown(this.downKey)) {
    this.vy = this.speed;
  } else {
    this.vy = 0;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Paddle.prototype.update = function() {
  this.y += this.vy;
  this.y = constrain(this.y, 0, height - this.h);
  this.h = constrain(this.h, 30, 60);
}

// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  fill(255);
  rect(this.x, this.y, this.w, this.h);
}

//reset()
//
// Resets the paddles and score to zero when game resets after a game over.
Paddle.prototype.reset = function() {
  this.x = this.x;
  this.y = this.y;
  this.score = 0;
}


//gameOver()
//
// Checks if the score is at 11, if it's at 11 then triggers game over
Paddle.prototype.gameOver = function() {
  if (this.score === 11) {
    title.end = true;
    return true;
  } else {
    return false;
  }
}
