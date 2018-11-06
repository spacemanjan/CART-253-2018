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
Title.prototype.display = function() {
  if (this.start === true) {
    push();
    fill(255);
    textFont(titleFont);
    textSize(54);
    text("SPACE INVADER", 150, 230);
    text("PONG",397,285);
    textFont(subFont);
    textSize(12);
    text("The year is 2X35, mankind has ventured into the stars, what we found was PONG",120,320);
    text("Space is a battle, resources are scarce and paddle fights paddle with lasers",126,340);
    textSize(16);
    text("Score in the classic way and shooting cost score points, reach 11 POINTS to win",50,375);
    text("LEFT:Press Space to shoot, W & S for up and down",150,390);
    text("RIGHT:Press Shift to shoot, UP & DOWN for up and down",135,405);
    textSize(14);
    text("Shoot the Alien to make his retreat, and avoid his green children or they'll take your points",50,420);
    textSize(20);
    text("PRESS THE UP KEY TO BEGIN GAME",200,460);
    pop();
    if (keyIsDown(UP_ARROW)) {
      this.start = false;
    }
  }
  if (this.end === true) {
    background(0);
    textSize(50);
    textFont(titleFont);
    fill(255);
    text("GAME OVER", 200, 250);
    textFont(subFont);
    textSize(32);
    text(leftPaddle.score + "      left score", 75,350);
    text("right score      " + rightPaddle.score, 340,350);
    textSize(20);
    text("PRESS DOWN ARROW TO RESTART GAME", 170, 430);
    if (keyIsDown(DOWN_ARROW)) {
      this.start = true;
    }
  }
}
