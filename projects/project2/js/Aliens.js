// aliens
//
//  An Alien class, Aliens will swoop down from above the game canvas to abduct the ball
// if an alien sucessfully abducts the ball then a bad ball will spawn and begin to wreak havoc.

// aliens constructor
//
// sets up the aliens properties, tracks how many balls the alien has captured
// as well as the speed it will chase the ball at and wether it has caught a ball.
function Aliens(x, y, vx, vy, size, speed, capture, destroyed, score) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  this.capture = capture;
  this.destroyed = destroyed;
  this.score = score;
}

//display()
//
// displays the alien as a large white square for now.
Aliens.prototype.display = function() {
  push();
  rectMode(CENTER);
  fill(255);
  rect(this.x, this.y, this.size, this.size);
  pop();
}

// hunt()
//
// The main controller of the alien, mesures the distance between the alien and ball
// checks to see if it's caught the ball or not, if not keeps chasing if yes begins to ascend
Aliens.prototype.hunt = function(Ball) {
  var d = dist(this.x, this.y, ball.x, ball.y);
  var dx = this.x - ball.x;
  var dy = this.y - ball.y;
  // if the distance between the alien and the ball is not 0
  console.log(this.capture, this.score);
  if (d > ball.size * 2.5) {
    this.x -= (dx * this.speed);
    this.y -= (dy * this.speed);
  } else {
    this.capture = true;
    this.y += this.vy;
  }
}
