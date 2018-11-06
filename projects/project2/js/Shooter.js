// Shooter
//
// A class that defines how a paddle's shooting mechanism works, including the ability
// to specify the input keys to make the gun fire the bullet, and the bullets velocity.

// Shooter constructor
//
// Sets the properties with the provided arguments or defaults
//leftShot = (leftPaddle.x, leftPaddle.y, 10, 30, 10, 10, 32, leftPaddle.score, false);
//rightShot = (rightPaddle.x-10, rightPaddle.y, 10, 30, 10, -10, 16, rightPaddle.score, false);
function Shooter(x, y, speed, shootKey, fire) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.vy = 0;
  this.w = 5;
  this.h = 5;
  this.speed = speed;
  this.shootKey = shootKey;
  this.fire = fire;
}

// handleInput()
//
// Check if the up or down keys are pressed and update the bullet velocity
// appropriately
Shooter.prototype.handleInput = function(paddle) {
  if (keyIsDown(this.shootKey)) {
    if (paddle.score >= 1){
    this.fire = true;
  } else {
    this.fire = false
  }
}
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the height of the paddles
Shooter.prototype.update = function(paddle) {
  if (this.fire === true) {
    this.x += this.speed;
  } else {
  this.y += paddle.vy;
  this.y = constrain(this.y, paddle.y+27.7, paddle.y+27.8);
}
}


// display()
//
// Draw the paddle as a rectangle on the screen
Shooter.prototype.display = function() {
  fill(244, 217, 66);
  rect(this.x, this.y, this.w*2, this.h*2);
  rect(this.x, this.y+2.5, this.w*5, this.h);
}

// Shooter.prototype.handleCollision = function(Aliens) {
// // does the bullet overlap the alien
// if (this.x + this.w > aliens.x && this.x < aliens.x + aliens.size){
//
//     if (this.y + this.h> aliens.y && this.y < aliens.y + aliens.size) {
//   aliens.destroyed = true;
// }
// }
// }


//handleCollision(left or right)
//if for example the left paddle shot hits the right paddle, then trigger the paddle.hit boolean
// triggers the paddle.timer to begin.
Shooter.prototype.handleCollision = function(paddle) {
if (this.fire === true) {
  if (this.x >= paddle.x && this.x < paddle.x + paddle.w){
    if (this.y >= paddle.y && this.y < paddle.y + paddle.h){
      paddle.timer.startTime = millis();
      paddle.timer.running = true;
      paddle.timer.finished = false;
      paddle.hit = true;
    }
  }
}
}

//shot.isOffScreen()
//
// if bullet passes the limits of the screen it triggers the reset.
Shooter.prototype.isOffScreen = function(){
    if (this.x < 0 || this.x > width+20){
      return true;
  } else {
    return false;
  }
}

//reset()
//
// Resets the bullet and subtract 1 from paddle score.
Shooter.prototype.reset = function(paddle) {
  this.fire = false;
  paddle.score -=1;
  this.x = paddle.x;
  this.y = paddle.y+27.7;
}
