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
  this.hit = false;
  this.timer = {
    startTime: 0,
    running: false,
    duration: 2000,
    finished: false
  }
  this.go = this.speed;
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
  this.score = constrain(this.score, 0, 25);
}

// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
  fill(255);
  noStroke();
  rect(this.x, this.y, this.w, this.h);
  //left paddle gun decor
  rect(this.x+9, this.y+12.5, this.w,this.h-25);
  rect(this.x+19, this.y+25,this.w, this.h-50);
  //right paddle gun decore
  rect(this.x-10, this.y+12.5, this.w,this.h-25);
  rect(this.x-19, this.y+25,this.w, this.h-50);
}

// paddle.hitCheck()
//
// Check to see if paddle has been hit & if the timer has begun, if timer is running
// paddle is trapped and unable to move, a red bar indicates when player will regain
// mobility. Once 2 seconds have elapsed paddle regains mobility.
Paddle.prototype.hitCheck = function() {
  if (this.hit === true){
    if (this.timer.running) {
       this.speed = 0;
       push();
       fill(255,0,0);
       rect(this.x, this.y, this.w, this.h-((millis() - this.timer.startTime)/33));
       pop();
      if (millis() - this.timer.startTime >= this.timer.duration) {
        this.timer.finished = true;
      }
      if (this.timer.finished) {
      this.timer.running = false;
      this.hit = false;
    }
  }
} else {
  this.speed = this.go;
}
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
  if (this.score === 25) {
    title.end = true;
    return true;
  } else {
    return false;
  }
}
