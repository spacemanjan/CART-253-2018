// aliens
//
//  An Alien class, Aliens will swoop down from above the game canvas to abduct the ball
// if an alien sucessfully abducts the ball then a bad ball will spawn and begin to wreak havoc.

// aliens constructor
//
// sets up the aliens properties, tracks how many balls the alien has captured
// as well as the speed it will chase the ball at and wether it has caught a ball.
function Aliens(x, y, vy, size, speed, capture, destroyed, score) {
  this.x = x;
  this.y = y;
  this.vy = vy;
  this.size = size;
  this.speed = speed;
  this.capture = capture;
  this.destroyed = destroyed;
  this.score = score;
  this.timer = {
    startTime: 0,
    running: false,
    duration: 5000,
    finished: false
  }
}

//display()
//
// displays the alien as a large white square for now.
Aliens.prototype.display = function() {
  push();
  imageMode(CENTER);
  fill(255);
  image(extraT, this.x, this.y, this.size, this.size);
  pop();
}

Aliens.prototype.stun = function() {
  if (this.destroyed === true) {
    if (this.timer.running) {
      this.capture = false;
      this.y -= 25;
      if (millis() - this.timer.startTime >= this.timer.duration) {
        this.timer.finished = true;
      }
      if (this.timer.finished) {
        this.timer.running = false;
        this.destroyed = false;
      }
    }
  } else {
    this.destroyed = false;
  }
}

// hunt()
//
// The main controller of the alien, mesures the distance between the alien and ball
// checks to see if it's caught the ball or not, if not keeps chasing if yes begins to ascend
Aliens.prototype.hunt = function(Ball) {
  if (this.destroyed === false) {
    var d = dist(this.x, this.y, ball.x, ball.y);
    var dx = (this.x - ball.x) * 1.20;
    var dy = (this.y - ball.y) * 1.20;
    // if the distance between the alien and the ball is  30
    if (d > ball.size * 4) {
      this.x -= (dx * this.speed);
      this.y -= (dy * this.speed);
      // if the distance between the alien and the ball is < 30
    } else {
      this.capture = true;
      this.y += this.vy;
    }
  }
}

Aliens.prototype.reset = function() {
  aliens.score = 0;
}
