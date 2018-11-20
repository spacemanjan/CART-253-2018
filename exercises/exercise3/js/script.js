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

// GAME OVER VISUALS //
// Speed, Acceleration, Growth rate, Size //
var targetAcc = 0.15;
var targetSpeed = 2;
var targetSize = 120;
var targetGrowth = 0;

// POSTER VARIABLES //
// Position, Font and image of POSTER
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

//declare doggos array
var doggos = [];

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
var numDecoys = 200;

// Keep track of whether they've won
var gameOver = false;

// sound variable
var flightMp3;
var wagner = false;

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  //TARGET IMAGE//
  targetImage = loadImage("assets/images/animals-target.png");
  //POSTER IMAGE//
  posterImage = loadImage("assets/images/animals-target.png");
  //DECOY IMAGES//
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
  //POSTER FONT//
  posterFont = loadFont("assets/fonts/Raleway-Black.ttf");
  //MUSIC//
  flightMp3 = new Audio('assets/sounds/flight.mp3');
}

// setup()

// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth, windowHeight);
  background("#ffff00");
  imageMode(CENTER);
  //
  //set up doggos array & doggos properties
  // there are 40 doggos each with a x,y,acceleration
  for (var i = 0; i < 40; i++) {
    doggos[i] = {
      x: random(-width, -10),
      y: random(20, height),
      acc: 5
    }
  }
  console.log(doggos)

  // Use a for loop to draw as many decoys as we need
  for (var i = 0; i < numDecoys; i++) {
    // Choose a random location for this decoy
    var x = random(0, width);
    var y = random(0, height);
    // Generate a random number we can use for probability
    var r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    if (r < 0.1) {
      image(decoyImage1, x, y, 120, 120);
    } else if (r < 0.2) {
      image(decoyImage2, x, y, 120, 120);
    } else if (r < 0.3) {
      image(decoyImage3, x, y, 100, 100);
    } else if (r < 0.4) {
      image(decoyImage4, x, y, 160, 160);
    } else if (r < 0.5) {
      image(decoyImage5, x, y, 200, 200);
    } else if (r < 0.6) {
      image(decoyImage6, x, y, 90, 90);
    } else if (r < 0.7) {
      image(decoyImage7, x, y, 110, 110);
    } else if (r < 0.8) {
      image(decoyImage8, x, y, 120, 120);
    } else if (r < 0.9) {
      image(decoyImage9, x, y, 150, 150);
    } else if (r < 1.0) {
      image(decoyImage10, x, y, 180, 180);
    }
  }

  //* DOG LOCATION *//
  //
  // Once we've displayed all decoys, we choose a location for the target
  // we declare targetX and targetY
  targetX = random(0, width);
  targetY = random(0, height);

  //Dog won't spawn beneath poster
  //while loop saying "if target(x,y) is in the poster(x,y) then re-randomize target(x,y)"
  while (targetX >= posterX && targetY <= 200) {
    targetX = random(0, width-70);
    targetY = random(64, height);
  }

  //* DRAW DOG *//
  //(this means it will always be on top)
  image(targetImage, targetX, targetY, targetSize, targetSize);

  //* setup the POSTER *//
  //
  //Poster location
  posterX = width - 200;
  posterY = 0;
  // Draw poster so all dogs appear underneath the poster
  fill(255);
  noStroke();
  rect(posterX, posterY, 200, 200);
  //Dog picture location (x,y)
  image(posterImage, (windowWidth / 2 * 1.87), 110);
  fill(0);
  //* TEXT IN THE POSTER *//
  //
  //LOST DOG Text in both english and the universal Esperanto
  textSize(20);
  textFont(posterFont);
  text("LOST DOG", (windowWidth / 2 * 1.78), 50);
  text("PERDITA HUNDO", (windowWidth / 2 * 1.75), 185);
}

function draw() {
  if (gameOver) {
    // make the wagner variable true
    wagner = true;
    //* GAME OVER *//
    //
    //whipe background to be blank when you win
    background("#ffff00");
    // Prepare our typography
    textFont("Helvetica");
    textSize(128);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(random(255));
    // Tell them they won!
    text("YOU WINNED!", width / 2, height / 2);

    //* The Shrink/Grow effect *//
    //
    //Defines the TargetGrowth var that fluctuates the size of the dog
    targetGrowth += random(-2, 1);
    //Constrains the TargetSize var that controles the final size of the dog
    targetSize = Math.max(targetSize, 200);
    //makes the dog grow and shrink
    targetSize = targetSize + targetGrowth;

    //* Running dogs effect *//
    //
    //call the image of the dog
    image(targetImage, targetX, targetY, targetSize, targetSize);

    //spawns multiple dogs to run around on the end screen
    //as long as i is less then the number of doggos(40) then keep making dogs
    for (var i = 2; i < doggos.length; i++) {
      let dogs = doggos[i]
      image(targetImage, dogs.x, dogs.y, targetSize, targetSize);
      dogs.x += dogs.acc

    //* Wraper for doggos *//
    //makes a simple wrapper for the many doggos//
      if (dogs.x > width + 40) {
        dogs.x = -200
      }
    }

    //constrian the speed at which they can accelerate(2+0.15=1-50)
    targetSpeed = constrain(targetSpeed + targetAcc, 1, 50);
    //sets the dogs in motion (dogX+targetSpeed[1-50])
    targetX = targetX + targetSpeed;

    //* Wrapper *//
    //
    //creates wrapper (if dog passes the right of the screen)
    if (targetX > width + 600) {
      //spawn him at a random height
      targetY = random(0, height);
      //spawn him offscreen to the left
      targetX = 0 - 100;
    }

  }
  //* MUSIC *//
  //
  //play music when game is over.
  if (wagner == true) {
    flightMp3.play();
  }
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // Check if the mouse is in the x range of the target
  if (mouseX > targetX - targetImage.width / 2 && mouseX < targetX + targetImage.width / 2) {
    // Check if the mouse is also in the y range of the target
    if (mouseY > targetY - targetImage.height / 2 && mouseY < targetY + targetImage.height / 2) {
      gameOver = true;
    }
  }
}
