// Exercise 1 - Moving pictures
// Yann-Maurice McNiven
//
// Starter code for exercise 1.
// It moves two pictures around on the canvas.
// One moves linearly down the screen.
// One moves toward the mouse cursor.

// Added code for exercise 1.
// Adds two more moving pictures on the canvas.
// One moves horizontally left to right on the screen.
// One moves wherever the mouse cursor is.

// Pippin wrote dis
// The image of a clown face
var clownImage;
// Yan wrote dis
// The images of soup and shrimp
var soupImage;
var shrimpImage;
// The current position of the clown face
var clownImageX;
var clownImageY;
// Current soup & shrimp position
var soupImageX;
var soupImageY;
var shrimpImageX;
var shrimpImageY;

// The transparent image of "felt" that wipes down the canvas
var feltTextureImage;
// The semi-transparent image of honeycombs that moves horizontally
var combTextureImage;
// The current position of the transparent image of "felt"
var feltTextureImageX;
var feltTextureImageY;
// The current position of the "honeycomb" image
var combTextureImageX;
var combTextureImageY;


// preload()
//
// Load the four images we're using before the program starts

function preload() {
  clownImage = loadImage("assets/images/clown.png");
  soupImage = loadImage("assets/images/soup.png");
  shrimpImage = loadImage("assets/images/shrimp.png");
  feltTextureImage = loadImage("assets/images/black-felt-texture.png");
  combTextureImage = loadImage("assets/images/honey-comb.png");
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the clown image at the centre of the canvas
  clownImageX = width/2;
  clownImageY = height/2;
  // Start the shrimp image wherever the mouse is
  // shrimpImageX = mouseX;
  // shrimpImageY = mouseY;
  // Start the felt image perfectly off screen above the canvas
  feltTextureImageX = width/2;
  feltTextureImageY = 0 - feltTextureImage.height/2;

  // Start the honeycomb image off screen to the left of the createCanvas
  // height/2 means that the image moves along the middle of the screen
  combTextureImageX = 0 - combTextureImage.width/2;
  combTextureImageY = height/2;


  // We'll use imageMode CENTER for this script
  imageMode(CENTER);
}


// draw()
//
// Moves the felt image linearly
// Moves the clown face toward the current mouse location

function draw() {

  // Move the felt image down by increasing its y position
  feltTextureImageY += 1;
  // Move the comb image to the left by increasing the x position
  combTextureImageX ++;

  // Display the felt image
  image(feltTextureImage,feltTextureImageX,feltTextureImageY);
  // Display the comb image
  image(combTextureImage,combTextureImageX,combTextureImageY);

  // Move the clown by moving it 1/10th of its current distance from the mouse

  // Calculate the distance in X and in Y
  var xDistance = mouseX - clownImageX;
  var yDistance = mouseY - clownImageY;
  // Add 1/10th of the x and y distance to the clown's current (x,y) location
  clownImageX = clownImageX + xDistance/10;
  clownImageY = clownImageY + yDistance/10;

  // Display the clown image
  image(clownImage,clownImageX,clownImageY);

  shrimpImageX = mouseX;
  shrimpImageY = mouseY;

  image(shrimpImage,shrimpImageX,shrimpImageY);
}
