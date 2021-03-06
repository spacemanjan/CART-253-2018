/******************************************************

Game - Chaser
Pippin Barr

A simple game of cat and mouse.

Physics-based movement, keyboard controls, health/stamina,
sprinting, random movement, screen wrap.

******************************************************/

// Track whether the game is over
var gameOver = false;

// Player position, size, velocity, images
var playerX;
var playerY;
var playerRadius = 25;
var playerVX = 0;
var playerVY = 0;
var playerMaxSpeed;
var playerImgHappy;
var playerImgSad;
// Player health
var playerHealth;
var playerMaxHealth = 255;
// Player fill color
var playerFill = 50;

// Player sprint
var playerSprint = false;

// crazy effects
// images that appear when you "overdose"
//tv
var tvImg;
var tvX;
var tvY;
//burger
var burgerImg;
var burgerX;
var burgerY;
//happyface
var joyImg;
var joyX;
var joyY;

// Prey position, size, velocity, image
var preyX;
var preyY;
var preyRadius = 25;
var preyVX;
var preyVY;
var preyMaxSpeed = 5;
var preyImg;
// Prey perlin noise time variable
var preyTX;
var preyTY;

// Prey health
var preyHealth;
var preyMaxHealth = 255;
// Prey fill color
var preyFill = 200;

// Amount of health obtained per frame of "eating" the prey
var eatHealth = 25.5;
// Number of prey eaten during the game
var preyEaten = 0;
// Sound effects & Music
var soundtrack;
var gulpSound;
var whiteNoise;
// color variables
var r;
var g;
var b;
//preload function
//-------NEW CODE--------//
function preload() {
  soundtrack = new Audio("assets/sounds/requiem.mp3");
  gulpSound = new Audio("assets/sounds/gulp.mp3");
  whiteNoise = new Audio("assets/sounds/whitenoise.mp3");
}
//------END NEW---------//
// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500, 500);

  noStroke();

  setupPrey();
  setupPlayer();
  setupDecoy();
  sounds();
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width / 5;
  preyY = height / 2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
  //Set up prey
  preyTX = random(0, 1000);
  preyTY = random(0, 1000);
  preyImg = loadImage("assets/images/pill.png");
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
  playerImgHappy = loadImage("assets/images/smileyface.png");
  playerImgSad = loadImage("assets/images/sadface.png");
}
//------------NEW CODE-------------------//
function setupDecoy() {
  tvX = 100;
  tvY = 100;
  tvImg = loadImage("assets/images/tv.png");
  joyX = 250;
  joyY = 500;
  joyImg = loadImage("assets/images/joy.png");
  burgerX = 40;
  burgerY = 420;
  burgerImg = loadImage("assets/images/burger.png");
}
//------------END NEW------------------//
// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background(r, g, b);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

//---NEW----//
    changeGame();
//---END----//
    drawPrey();
    drawPlayer();
//---NEW----//
    drawDecoy();

    sprintPlayer();
//---END----//
  } else {
    showGameOver();
    handleInput();
    soundCheck();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  } else {
    playerVX = 0;
  }
//--------NEW CODE---------//
  if (keyIsDown(32)) {
    playerSprint = true;
  } else {
    playerSprint = false;
  }
  if (keyIsDown(13)){
    resetAll();
  }
//-------END NEW---------//
  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  } else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  } else {
    playerVY = 0;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX += playerVX;
  playerY += playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    playerX += width;
  } else if (playerX > width) {
    playerX -= width;
  }

  if (playerY < 0) {
    playerY += height;
  } else if (playerY > height) {
    playerY -= height;
  }
}
//------------NEW CODE-----------------//
// Sets playerMaxSpeed at 4 when sprinting
// resets playerMaxSpeed at 2 when not sprinting
function sprintPlayer() {
  if (playerSprint == true) {
    playerMaxSpeed = 5;
  } else if (playerSprint == false) {
    playerMaxSpeed = 2;
  }
}
//-----------END NEW-----------------//
// updateHealth()

//-------- UPGRADED CODE---------------//
// Reduce the player's health (every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health, constrain to reasonable range
  if (playerSprint == false) {
    playerHealth = constrain(playerHealth - 0.5, 0, playerMaxHealth);
  }
  // If player is sprinting lose more health
  else if (playerSprint == true) {
    playerHealth = constrain(playerHealth - 1, 0, playerMaxHealth);
  }
//---------- END --------------------//
  // Check if the player is dead
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}
//----------NEW CODE----------------//
function sounds() {
  // play sounds
  soundtrack.currentTime = 0;
  soundtrack.play();
}
function soundCheck() {
  whiteNoise.pause();
}
//-----------END NEW----------------//

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  var d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = constrain(playerHealth + eatHealth / 2, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = constrain(preyHealth - eatHealth, 0, preyMaxHealth);

    // Check if the prey died
    if (preyHealth === 0) {
      gulpSound.play();
      // Move the "new" prey to a random position
      preyX = random(0, width);
      preyY = random(0, height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten++;
    }
  }
}
function resetAll(){
  setupPrey();
  setupPlayer();
  sounds();
  preyEaten = 0;
  preyMaxSpeed = 5;
  gameOver = false;
}

//---------NEW CODE-------------------------------------//
// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // change the prey's movement to be dictated by perlin noise
  // Use map() to convert from the 0-1 range of the noise() function
  // to the appropriate range of velocities for the prey
  preyVX = map(noise(preyTX), 0, 1, -preyMaxSpeed, preyMaxSpeed);
  preyVY = map(noise(preyTY), 0, 1, -preyMaxSpeed, preyMaxSpeed);
  preyTX += 0.01;
  preyTY += 0.01;

  // Update prey position based on velocity
  preyX += preyVX;
  preyY += preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX += width;
  } else if (preyX > width) {
    preyX -= width;
  }

  if (preyY < 0) {
    preyY += height;
  } else if (preyY > height) {
    preyY -= height;
  }
}

// drawPrey()
//
// Draw the prey as an image with tint based on health
function drawPrey() {
  fill(preyFill, preyHealth);
  imageMode(CENTER);
  tint(255, preyHealth);
  image(preyImg, preyX, preyY, 75, 75);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha based on health
function drawPlayer() {
  fill(playerFill, playerHealth);
  imageMode(CENTER);
  tint(255, 255);
  // sadface which appears if you can't eat enough pills
  image(playerImgSad, playerX, playerY, 100, 100);
  tint(255, playerHealth);
  image(playerImgHappy, playerX, playerY, 100, 100);
}
//----------NEW CODE--------------//
function drawDecoy() {
if (preyEaten >= 12 && preyEaten < 20) {
  tint(255,255);
  tvX += 20;
  tvY += 20;
  image(tvImg, tvX, tvY, 100, 100);
  if (tvX < 0) {
    tvX += width;
  } else if (tvX > width) {
    tvX -= width;
  }

  if (tvY < 0) {
    tvY += height;
  } else if (tvY > height) {
    tvY -= height;
  }
}
if (preyEaten >= 17 && preyEaten < 20) {
  tint(255,255);
  joyX -= 12;
  joyY -= 2;
  image(joyImg, joyX, joyY, 100, 75);
  if (joyX < 0) {
    joyX += width;
  } else if (joyX > width) {
    joyX -= width;
  }

  if (joyY < 0) {
    joyY += height;
  } else if (joyY > height) {
    joyY -= height;
  }
}
if (preyEaten >= 27 && preyEaten < 30) {
  tint(255,255);
  burgerX += 12;
  burgerY -= 38;
  image(burgerImg, burgerX, burgerY, 100, 75);
  if (burgerX < 0) {
  burgerX += width;
} else if (burgerX > width) {
    burgerX -= width;
  }
  if (burgerY < 0) {
    burgerY += height;
  } else if (burgerY > height) {
    burgerY -= height;
  }
}
}
//----------END NEW---------------//
//
//
//
//-----------NEW CODE-------------//
// game changer function
function changeGame() {
  // Declare R G B which controls the background color
  r = 119;
  g = 137;
  b = 165;
  // epilectic background colors & text & music
  if (preyEaten >= 0 && preyEaten < 1) {
  textSize(40);
  textAlign(CENTER, CENTER);
  fill(255);
  var titleText = "REQUIEM\n";
  titleText += "SIMULATOR";
  text(titleText, width/2, 0+50);
  soundtrack.play();
  } else if (preyEaten >= 1 && preyEaten < 3){
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(0);
    text("I'm somebody now", width/2, height-50);
  } else if (preyEaten >= 3 && preyEaten < 7){
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(0);
    text("Everybody likes me", width/2, height-50);
  } else if (preyEaten >= 7 && preyEaten < 12) {
    r = 249;
    g = 249;
    b = 149;
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(0);
    text("It's a reason to get up", width/2, height-50);
  } else if (preyEaten >= 12 && preyEaten < 20) {
    // Creat epileptic fever dream
    // Increase prey preyMaxSpeed
    // play white noise
    r = random(0, 255);
    g = random(0, 255);
    b = random(0, 255);
    preyMaxSpeed = 6;
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(0);
    text("It's a reason to smile", width/2, height-50);
    whiteNoise.play();
  } else if (preyEaten >= 17 && preyEaten < 20){
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(0);
    text("I like the way I feel", width/2, height-50);
  } else if (preyEaten >= 20 && preyEaten < 27) {
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(0);
    text("Why should I make my bed", width/2, height-50);
    r = 147;
    g = 10;
    b = 2;
    preyMaxSpeed = 11;
    whiteNoise.pause();
  } else if (preyEaten >= 27 && preyEaten < 30) {
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(0);
    text("They'll all like me", width/2, height-50);
    r = random(0, 255);
    g = random(0, 255);
    b = random(0, 255);
    preyMaxSpeed = 17;
    whiteNoise.play();
  } else if (preyEaten >= 30 && preyEaten < 37) {
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(255);
    text("It's a reason to smile", width/2, height-50);
    r = 80;
    g = 81;
    b = 79;
  } else if (preyEaten >= 37 && preyEaten < 45) {
    r = random(0, 255);
    g = random(0, 255);
    b = random(0, 255);
    preyMaxSpeed = 28;
    whiteNoise.play();
  }
}
//----------END NEW---------------//
// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  var gameOverText = "GAME OVER\n";
//---------NEW CODE-------------------//
  if (preyEaten >= 0 && preyEaten <= 7){
  gameOverText += "You ate " + preyEaten + " pills\n";
  gameOverText += "before you died\n";
  gameOverText += "alone.\n";
  gameOverText += "\n";
  gameOverText += "press ENTER to restart";
  text(gameOverText, width / 2, height / 2);
} else if (preyEaten >= 7 && preyEaten <=12){
  gameOverText += "You ate " + preyEaten + " pills\n";
  gameOverText += "before you died of sadness.\n";
  gameOverText += "\n";
  gameOverText += "\n";
  gameOverText += "press ENTER to restart";
  text(gameOverText, width / 2, height / 2);
} else if (preyEaten >= 12 && preyEaten <=23) {
  gameOverText += "You ate " + preyEaten + " pills\n";
  gameOverText += "before you lost your mind.\n";
  gameOverText += "\n";
  gameOverText += "\n";
  gameOverText += "press ENTER to restart";
  text(gameOverText, width / 2, height / 2);
} else if (preyEaten >= 20 && preyEaten <=27) {
  gameOverText += "You ate " + preyEaten + " pills\n";
  gameOverText += "before you wandered off.\n";
  gameOverText += "\n";
  gameOverText += "\n";
  gameOverText += "press ENTER to restart";
  text(gameOverText, width / 2, height / 2);
} else if (preyEaten >= 27) {
  gameOverText += "You ate " + preyEaten + " pills\n";
  gameOverText += "before you died by\n";
  gameOverText += "overdose.\n";
  gameOverText += "\n";
  gameOverText += "press ENTER to restart";
  text(gameOverText, width / 2, height / 2);
}
//------END NEW------------//
}
