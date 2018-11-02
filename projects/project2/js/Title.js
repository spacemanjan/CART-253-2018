// Title
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Ball constructor
//
// Sets the properties with the provided arguments
function Title(start, end) {
this.start = start;
this.end = end;
}

// display()
//
// Draw the title screen for the respective situation.
Title.prototype.display = function () {
  if (this.start === true) {
  text("HELP ME",150,150);
    if (keyIsDown(UP_ARROW)) {
      this.start = false;
    }
} if (this.end === true) {
  text("GAME OVER",150,150);
    if (keyIsDown(UP_ARROW)) {
        this.start = true;
      }
}
}
