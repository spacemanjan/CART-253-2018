/************************************************************************

  Spacelove!
  by Pippin Barr

  A game of two spaceships that love each other very much. Each one loses
  health over time and can only increase its health by being "shot" by the
  other. Thus they have to "pay attention" to each other all the time to
  "keep their relationship alive". This is easy if they only focus on each
  other, but if they want to fly around and do other things, it becomes
  much harder. Deep.

  Left ship controls: WASD + control
  Right ship controls: ARROWS + shift

************************************************************************/
//player variable
var player;

// The two ships
var ship1;
var ship2;

// Images to display for the ships
var shipImage;
var bulletImage;


// preload()
//
// Loads the images of the ships and bullets
function preload() {
  shipImage = loadImage("assets/images/face.png");
  bulletImage = loadImage("assets/images/heart.png");
}

// setup()
//
// Create the canvas, create the ships
function setup() {
  createCanvas(720,395);
  ship1 = new Ship(width/4,height/2,0,5,5,0.1,shipImage,bulletImage,true,false);
  ship2 = new Ship(3*width/4,height/2,PI,5,5,0.1,shipImage,bulletImage,false,true);
  // Paddle(x,y,w,h,speed,downKey,upKey,rightKey,leftKey,score)
 player = new Paddle(0,height/2,10,60,10,83,87,68,65);
}

// draw()
//
// Set the background and then based on the current state
// display the appropriate information on screen (the title, the game, the game over)
function draw() {
  background(0);
  displayGame();
}

// displayGame()
//
// Handles input, moves the ships, updates the bullets, displays everything,
// and checks if the game is over.
function displayGame() {
  ship1.controller();
  ship2.controller();

  ship1.update();
  ship2.update();

  ship1.updateBullets(player);
  ship2.updateBullets(player);

  ship1.display();
  ship2.display();
  player.handleInput();
  player.update();
  player.display();
}
