// Pong
// by Pippin Barr
// Remixed by Yann-Maurice McNiven
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.

// Game colors
var bgColor = 0;
var fgColor = 255;

// BALL

// Basic definition of a ball object with its key properties of
// position, size, velocity, and speed
var ball = {
  x: 0,
  y: 0,
  size: 20,
  vx: 0,
  vy: 0,
  speed: 5
}

// PADDLES

// How far in from the walls the paddles should be drawn on x
var paddleInset = 50;

//---NEW CODE---//
var scoreKeeper;
var gameOver = false;
//---END CODE---//

// LEFT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
var leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vx: 0,
  vy: 0,
  speed: 5,
  upKeyCode: 87, // The key code for W
  downKeyCode: 83, // The key code for S
  //---NEW CODE---//
  scoreKeeper: 0,
  point: false
  //---END CODE---//
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
var rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vx: 0,
  vy: 0,
  speed: 5,
  upKeyCode: 38, // The key code for the UP ARROW
  downKeyCode: 40, // The key code for the DOWN ARROW
  //---NEW CODE---//
  scoreKeeper: 0,
  point: false
}
// SOUNDS

// A variable to hold the beep sound we will play on bouncing

var bongRightSFX;
var bongLeftSFX;
var bingSFX;
var soundTrack;

//---END CODE---//
// preload()
//
// Loads the beep audio for the sound of bouncing
function preload() {
  bongRightSFX = new Audio("assets/sounds/bong_right.mp3");
  bongLeftSFX = new Audio("assets/sounds/bong_left.mp3");
  bingSFX = new Audio("assets/sounds/ding.mp3");
  soundTrack = new Audio("assets/sounds/lofi.mp3");
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(640, 480);
  rectMode(CENTER);
  noStroke();

  setupPaddles();
  setupBall();
}

// setupPaddles()
//
// Sets the positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle
  leftPaddle.x = paddleInset;
  leftPaddle.y = height / 2;

  // Initialise the right paddle
  rightPaddle.x = width - paddleInset;
  rightPaddle.y = height / 2;
}

// setupBall()
//
// Sets the position and velocity of the ball
function setupBall() {
  ball.x = width / 2;
  ball.y = height / 2;
  ball.vx = ball.speed;
  ball.vy = ball.speed;
}

// draw()
//
// Calls the appropriate functions to run the game
function draw() {
  // Fill the background
  background(bgColor);
  soundTrack.play();

  if (!gameOver) {
    // Handle input
    // Notice how we're using the SAME FUNCTION to handle the input
    // for the two paddles!
    handleInput(leftPaddle);
    handleInput(rightPaddle);

    // Handle score
    // Updates the paddle with the corresponding effects based on score
    handleScore(leftPaddle);
    handleScore(rightPaddle);


    // Update positions of all objects
    // Notice how we're using the SAME FUNCTION to handle the input
    // for all three objects!
    updatePosition(leftPaddle);
    updatePosition(rightPaddle);
    updatePosition(ball);

    // Handle collisions
    handleBallWallCollision();
    handleBallPaddleCollision(leftPaddle);
    handleBallPaddleCollision(rightPaddle);

    // Handle the ball going off screen
    handleBallOffScreen();

    // Display the paddles and ball
    displayPaddle(leftPaddle);
    displayPaddle(rightPaddle);
    displayBall();

    // Resets the ball and launches it
    reset();
  } else {
    endGame();
  }
}


// handleInput(paddle)
//
// Updates the paddle's velocity based on whether one of its movement
// keys are pressed or not.
// Takes one parameter: the paddle to handle.
function handleInput(paddle) {

  // Set the velocity based on whether one or neither of the keys is pressed

  // NOTE how we can change properties in the object, like .vy and they will
  // actually CHANGE THE OBJECT PASSED IN, this allows us to change the velocity
  // of WHICHEVER paddle is passed as a parameter by changing it's .vy.

  // UNLIKE most variables passed into functions, which just pass their VALUE,
  // when we pass JAVASCRIPT OBJECTS into functions it's the object itself that
  // gets passed, so we can change its properties etc.

  // Check whether the upKeyCode is being pressed
  // NOTE how this relies on the paddle passed as a parameter having the
  // property .upKey
  if (keyIsDown(paddle.upKeyCode)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the .downKeyCode is being pressed
  else if (keyIsDown(paddle.downKeyCode)) {
    // Move down
    paddle.vy = paddle.speed;
  } else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePosition(object)
//
// Sets the position of the object passed in based on its velocity
// Takes one parameter: the object to update, which will be a paddle or a ball
//
// NOTE how this relies on the object passed in have .x, .y, .vx, and .vy
// properties, which is true of both the two paddles and the ball
function updatePosition(object) {
  object.x += object.vx;
  object.y += object.vy;
}

// handleBallWallCollision()
//
// Checks if the ball has overlapped the upper or lower 'wall' (edge of the screen)
// and is so reverses its vy
function handleBallWallCollision() {

  // Calculate edges of ball for clearer if statement below
  var ballTop = ball.y - ball.size / 2;
  var ballBottom = ball.y + ball.size / 2;
  var ballLeft = ball.x - ball.size / 2;
  var ballRight = ball.x + ball.size / 2;

  // Check for ball colliding with top and bottom
  if (ballTop < 0 || ballBottom > height) {
    // If it touched the top or bottom, reverse its vy
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
  }
}

//----------NEW CODE-----------------//
// reset()
//
// resets the ball's location and launch it properly
function reset() {
  ball.vy = constrain(ball.vy, -10, 10);
  if (leftPaddle.point == true) {
    ball.vx = random(-5, -7);
    ball.y = random(10, height);
    ball.vy = random(-5, 5);
  }
  if (rightPaddle.point == true) {
    ball.vx = random(5, 7);
    ball.y = random(10, height);
    ball.vy = random(-5, 5);
  }
}

// handleScore()
//
// Keeps track of score and makes changes
// also manages the changing variables
function handleScore(paddle) {
  // constrain paddle height and speed
  paddle.h = constrain(paddle.h, 20, 70);
  paddle.speed = constrain(paddle.speed, 5, 20);
  // Calculate edges of ball for clearer if statement below
  if (paddle.point == true) {
    // make the paddle smaller & faster by 0.25
    paddle.h -= 1;
    paddle.speed += 0.25;
    paddle.point = false;
    // changing the colors
    fgColor -= 5;
    bgColor += 5;
    bingSFX.currentTime = 0;
    bingSFX.play();
  }
  if (fgColor == 0) {
    gameOver = true;
  }
}

//-------END CODE------------------//


// handleBallPaddleCollision(paddle)
//
// Checks if the ball overlaps the specified paddle and if so
// reverses the ball's vx so it bounces
function handleBallPaddleCollision(paddle) {

  // Calculate edges of ball for clearer if statements below
  var ballTop = ball.y - ball.size / 2;
  var ballBottom = ball.y + ball.size / 2;
  var ballLeft = ball.x - ball.size / 2;
  var ballRight = ball.x + ball.size / 2;

  // Calculate edges of paddle for clearer if statements below
  var paddleTop = paddle.y - paddle.h / 2;
  var paddleBottom = paddle.y + paddle.h / 2;
  var paddleLeft = paddle.x - paddle.w / 2;
  var paddleRight = paddle.x + paddle.w / 2;

  // First check it is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle so reverse its vx
      ball.vx = -ball.vx;
      //
      //----------NEW CODE----------------//
      //
      // mesures the distance between the ball and the center of the paddle and angles the rebound accordingly
      ball.vy = map(paddle.y - ball.y, -paddle.h / 2, paddle.h, ball.speed, -ball.speed);
      // Play our bouncing sound effects by rewinding and then playing them when they get hit
      if (ballRight >= width - 100) {
        bongLeftSFX.currentTime = 0;
        bongLeftSFX.play();
      }
      if (ballLeft <= 0 + 100) {
        bongRightSFX.currentTime = 0;
        bongRightSFX.play();
      }
      //------------END CODE--------------//
    }
  }
}

// handleBallOffScreen()
//
// Checks if the ball has gone off screen to the left or right
// and moves it back to the centre if so.
// Checks the score, and effects the paddles & depending on the score.
function handleBallOffScreen() {

  // Calculate edges of ball for clearer if statement below
  var ballLeft = ball.x - ball.size / 2;
  var ballRight = ball.x + ball.size / 2;

  //----NEW CODE----//
  // Check for ball going off the sides
  if (ballLeft < 0) {
    // If it went off either side, reset it to the centre
    ball.x = width / 2;
    console.log(leftPaddle.scoreKeeper);
    leftPaddle.scoreKeeper += 1;
    // NOTE that we don't change its velocity here so it just
    // carries on moving with the same velocity after its
    // position is reset.
    // This is where we would count points etc!
    rightPaddle.point = true;
    // This marks the paddle as having been scored against
  }
  if (ballRight > width) {
    ball.x = width / 2;
    console.log(rightPaddle.scoreKeeper);
    rightPaddle.scoreKeeper += 1;
    leftPaddle.point = true;
  }
    //----END CODE----//
}

// displayBall()
//
// Draws ball on screen based on its properties
function displayBall() {
  fill(fgColor);
  rect(ball.x, ball.y, ball.size, ball.size);
}

// displayPaddle(paddle)
//
// Draws the specified paddle on screen based on its properties
function displayPaddle(paddle) {
  fill(fgColor);
  rect(paddle.x, paddle.y, paddle.w, paddle.h);
}

function endGame() {
  text("did you want to win?", width / 2 - 50, height / 2);
  text(rightPaddle.scoreKeeper, width / 4, height / 3);
  text(leftPaddle.scoreKeeper, width / 4 * 3, height / 3);
}
