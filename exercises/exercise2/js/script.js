/*********************************************************
Exercise 2 - The Artful Dodger
Yann-Maurice
Pippin Barr:
Starter code for exercise 2.
*********************************************************/

// The position and size of our avatar circle
var avatarX;
var avatarY;
var avatarSize = 50;

// The speed and velocity of our avatar circle
var avatarSpeed = 10;
var avatarVX = 0;
var avatarVY = 0;

// The position and size of the enemy circle
var enemyX;
var enemyY;
var enemySize = 50;
// How much bigger the enemy circle gets with each successful dodge
var enemySizeIncrease = 5;

// The speed and velocity of our enemy circle
var enemySpeed = 5;
var enemyVX = 5;
// How much bigger the enemy circle gets with each successful dodge
var enemySpeedIncrease = 0.5;

// How many dodges the player has made
var dodges = 0;

// Here we have our text variables
var scoreFont;
// Default font Size
var fontSize = 15;

// Slow mo power variable
var slowMo = false;
var slowSpeed = 3;
// random colors
var rR;
var rG;
var rB;
//color themes
var playerTheme = 255;
var backgroundTheme = 150;
var enemyTheme = 30;
// Made a preload function
function preload() {
// loading font pulled from google fonts in the assets folder
  scoreFont = loadFont('assets/fonts/LuckiestGuy-Regular.ttf');
}

// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A pink background
  background(playerTheme,backgroundTheme,enemyTheme);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;
  // fetch random number for random rgb
  rR = random(0,255);
  rG = random(0,255);
  rB = random(0,255);
  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed (which increases)
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    console.log("YOU LOSE!");
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the enemy's size and speed
    enemySize = 50;
    enemySpeed = 5;
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the avatar's Size & speed
    avatarSize = 50;
    avatarSpeed = 10;
    // Reset the dodge counter
    dodges = 0;
    // Reset Score size
    fontSize = 15;
    // Reset SlowMo
    slowMo = false;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    enemySize = 50;
    enemySpeed = 5;
    avatarX = width/2;
    avatarY = height/2;
    avatarSize = 50;
    avatarSpeed = 10;
    dodges = 0;
    fontSize = 15;
    slowMo = false;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // increase the size of the score and constrain it to 25
    fontSize = constrain(fontSize + 0.5,15,25);
    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    // Increase the enemy's speed and size to make the game harder
    enemySpeed = enemySpeed + enemySpeedIncrease;
    enemySize = enemySize + enemySizeIncrease;
    // change size of avatar
    avatarSize = random(1,150);
    avatarSpeed = random(5,17);
    // change colors
    playerTheme = random(0,255);
    backgroundTheme = random(0,255);
    enemyTheme = random(0,255);
  }

  // slow motion power
  // every 5 dodges slow motion becomes available
  if (dodges == 5 || dodges == 10 || dodges == 15 || dodges == 20 || dodges == 25 || dodges == 30 || dodges == 35 || dodges == 40 || dodges == 50) {
    slowMo = true;
  }
  // if slow motion is available press the space key to slow enemies
  if ((slowMo == true) && keyIsDown(32)) {
    enemySpeed = (enemySpeed/2.5) + slowSpeed;
    slowMo = false;
  }
  // if slow motion is available show "PRESS SPACE TO SLOW DOWN"
  if (slowMo == true) {
    textSize(15);
    fill(rR,rG,rB);
    text("Press Space to Slow Down",450,60);
  } else if (slowMo == false) {
  }
  // End game Screen
  if (dodges == 50){
    enemySpeed = 0;
    fill(rR,rG,rB);
    textSize(15);
    text("Wow would you look at that you won!",250,250);
  }
  // Display the current number of successful in the console
  console.log(dodges);

  // The player is black
  fill(playerTheme);
  // Draw the player as a circle
  ellipse(avatarX,avatarY,avatarSize,avatarSize);

  // The enemy is red
  fill(enemyTheme,playerTheme,backgroundTheme);
  // Draw the enemy as a circle
  ellipse(enemyX,enemyY,enemySize,enemySize);

  // Decorative Circle at the top right
  fill(255);
  ellipse(500,10,100,100);
  // Text elements
  fill(0);
  textSize(15);
  textAlign(RIGHT);
  text("You've dodged:",450,30);
  // Number of dodges
  textSize(fontSize);
  text(dodges,485,31);
  textFont(scoreFont);


}
