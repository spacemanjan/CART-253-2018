// Title
//
// A class to manage the start and end screens
// as well as the inputs to restart the game.

// Title constructor
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
  text("Press UP_ARROW to begin",250,250);
    if (keyIsDown(UP_ARROW)) {
      this.start = false;
    }
} if (this.end === true) {
    background(0);
    textSize(10);
    fill(255);
    text("Press DOWN_ARROW to restart",250,250);
      if (keyIsDown(DOWN_ARROW)) {
        this.start = true;
      }
}
}
