// Shooter
//
// A class that defines how a paddle's shooting mechanism works, including the ability
// to specify the input keys to make the gun fire the bullet, and the bullets velocity.

// Shooter constructor
//
// Sets the properties with the provided arguments or defaults
function Shooter(x, y, vx, w, h, speed, shootKey, ammo, fire) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = 0;
  this.w = w;
  this.h = h;
  this.speed = speed;
  this.shootKey = shootKey;
  this.ammo = ammo;
  this.fire = fire;
}

// handleInput()
//
// Check if the up or down keys are pressed and update the bullet velocity
// appropriately
Shooter.prototype.handleInput = function() {
  if (keyIsDown(this.shootKey)) {
    this.fire = true;
  } else {
    this.vy = 0;
  }
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Shooter.prototype.update = function(paddle) {
  if (this.fire === true) {
    this.x += this.speed;
  } else {
  this.y += paddle.vy;
}
}

// display()
//
// Draw the paddle as a rectangle on the screen
Shooter.prototype.display = function() {
  fill(244, 217, 66);
  rect(this.x, this.y, this.w, this.h);
}

Shooter.prototype.handleCollision = function() {

}

Shooter.prototype.isOffScreen = function(){
    if (this.x < 0 || this.x > width+20){
      return true;
  } else {
    return false;
  }
}

//reset()
//
// Resets the paddles and score to zero when game resets after a game over.
Shooter.prototype.reset = function(paddle) {
  this.fire = false;
  this.x = paddle.x;
  this.y = paddle.y;
}
