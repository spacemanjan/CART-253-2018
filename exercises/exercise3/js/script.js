/******************************************************************************
Where's Sausage Dog?
by Pippin Barr
Edited by Yann-Maurice McNiven

An algorithmic version of a Where's Waldo searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
var targetX;
var targetY;
var targetImage;
var targetAcc = 0.15;
var targetSpeed = 2;
var targetSize = 120;

// Position and image of the sausage Dog poster
var posterImage;
var posterX;
var posterY;
var posterFont;

// The ten decoy images
var decoyImage1;
var decoyImage2;
var decoyImage3;
var decoyImage4;
var decoyImage5;
var decoyImage6;
var decoyImage7;
var decoyImage8;
var decoyImage9;
var decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
var numDecoys = 100;

// Keep track of whether they've won
var gameOver = false;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");
  posterImage = loadImage("assets/images/animals-target.png");
  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");

  posterFont = loadFont("assets/fonts/Raleway-Black.ttf");
}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#ffff00");
  imageMode(CENTER);

  // Use a for loop to draw as many decoys as we need
  for (var i = 0; i < numDecoys; i++) {
    // Choose a random location for this decoy
    var x = random(0,width);
    var y = random(0,height);
    // Generate a random number we can use for probability
    var r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough
    if (r < 0.1) {
      image(decoyImage1,x,y);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y);
    }
  }
  //Poster location
  posterX = width-200;
  posterY = 0;

  fill(255);
  noStroke();
  rect(posterX,posterY,200,200);
  //Dog picture location
  image(posterImage,(windowWidth/2*1.85),110);
  fill(0);
  //LOST DOG Text in both english and the universal Esperanto
  textSize(20);
  textFont(posterFont);
  text("PERDITA HUNDO",(windowWidth/2*1.73),190);
  text("LOST DOG",(windowWidth/2*1.78),50);
  // Once we've displayed all decoys, we choose a location for the target
  // we declare targeX and targetY
  targetX = random(0,width);
  targetY = random(0,height);
  // make while loop saying "if target(x,y) is in the poster(x,y) then re-randomize target(x,y)"
  while(targetX >= posterX && targetY <= 200){
  targetX = random(0,width);
  targetY = random(0,height);
}
  // targetSize = 120;
  // And draw it (this means it will always be on top)
  image(targetImage,targetX,targetY,targetSize,targetSize);
  // Draw poster so ALL dogs (go to heaven...no) appear underneath the poster
  fill(255);
  noStroke();
  rect(posterX,posterY,200,200);
  //Dog picture location
  image(posterImage,(windowWidth/2*1.85),110);
  fill(0);
  //LOST DOG Text in both english and the universal Esperanto
  textSize(20);
  textFont(posterFont);
  text("PERDITA HUNDO",(windowWidth/2*1.73),190);
  text("LOST DOG",(windowWidth/2*1.78),50);
  console.log(targetX,targetY);
}

function draw() {
  if (gameOver) {
    // Prepare our typography
    textFont("Helvetica");
    textSize(128);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(255));
    // Tell them they won!
    text("YOU WINNED!",width/2,height/2);
    // Flashing circle
    // noFill();
    // stroke(random(255));
    // strokeWeight(10);
    // ellipse(targetX,targetY,targetImage.width,targetImage.height);

    //Create a limited variable that randomly fluctuates the size of the dog
    var targetGrowth = random(-100,100);
    //makes the dog run around the screen when they win
    image(targetImage,targetX,targetY,targetSize,targetSize);
    targetSpeed = targetSpeed + targetAcc;
    targetX = targetX + targetSpeed;
    //what makes the size of doggo grow
    targetSize = targetSize + targetGrowth;
    //creates wrapper
    if (targetX > width) {
      targetY = random(0,height);
      targetX = 0 - 100;
    }
  }
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // Check if the mouse is in the x range of the target
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the mouse is also in the y range of the target
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}
