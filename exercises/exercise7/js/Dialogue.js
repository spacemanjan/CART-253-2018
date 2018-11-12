// Dialogue
//
// A class to define how the dialogue behaves
// this class will manage dialogue choices and dialogue options as well as using arrays
// to give the dialogue

// Dialogue constructor
//
// Sets the properties with the provided arguments
var speech = ["hey hows your back", "hows the family", "your rather rude", "if I didn't know any better I'd say you were trying to kill me"];
var speechIndex;
var speechtime;
function Dialogue (x,y,size,talking) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.talking = talking;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Dialogue.prototype.update = function (Paddle) {
  if (leftPaddle.score >= 1 || rightPaddle.score >= 1){
    this.talking = true;
  }
    if (leftPaddle.score >= 3 || rightPaddle.score >= 3){
  }
}

// isOffScreen()
//
// Checks if the player has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Dialogue.prototype.isOffScreen = function (Paddle) {
  // Check for going off screen and ends the scene if so.
  if (Paddle.x + Paddle.size < 0 || Paddle.x > width) {
  return true;
  }
  else {
  return false;
  }
}

// display()
//
// Draw the ball as a rectangle on the screen
Dialogue.prototype.display = function () {
    if (this.talking === true){
      push();
      fill(255, 237, 178);
      rect(this.x, this.y, this.size, this.size/3);
      fill(0);
      text(speechtime, 100, this.y+100);
      pop();
 }
}
