// Space Invader Pong
// by Yann-Maurice McNiven
// base code by Pippin Barr
//
// Pong in space! The most adventurous way to play the classic game.
// but watch out aliens are out to play with you too, defend yourself with your points.
// Defeat your opponent and aliens with lasers and score with balls it's time for space pong.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var stars = [];
var starBackg;
var leftPaddle;
var leftShot;
var leftScore;
var rightPaddle;
var rightShot;
var rightScore;
var aliens;
var ball;
var badBall = [];

//preload()
function preload(){
  stars = [loadImage("assets/images/stars1.png"),loadImage("assets/images/stars2.png"),
  loadImage("assets/images/stars3.png"),loadImage("assets/images/stars4.png"),
  loadImage("assets/images/stars5.png"),loadImage("assets/images/stars6.png"),
  loadImage("assets/images/stars7.png")];
}

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640, 480);
  // Create background stars
  //BackgroundArt (x, y, size, numStar)
  starBackg = new BackgroundArt(0, 0, 640, 480);
  // Create a ball
  ball = new Ball(width / 2, height / 2, 5, 5, 10, 5);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0, height / 2, 10, 60, 10, 83, 87, 0);
  // Create the left Paddle shot with the SPACE key as a trigger
  // Shooter (x, y, vx, w, h, speed, shootKey, ammo)
  leftShot = new Shooter(leftPaddle.x, leftPaddle.y, 10, 30, 10, 10, 32, leftPaddle.score, false);
  // Create score board for the left Paddle
  //ScoreManager (x, y, size, score, spacing)
  leftScore = new ScoreManager(30, 25, 15, 20);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width - 10, height / 2, 10, 60, 10, DOWN_ARROW, UP_ARROW, 0);
  // Create the right Paddle shot with the SHIFT key as a trigger
  // Shooter (x, y, xv, w, h, speed, shootKey, ammo)
  rightShot = new Shooter(rightPaddle.x-10, rightPaddle.y, 10, 30, 10, -10, 16, rightPaddle.score, false);
  // Create score board for the right Paddle
  // ScoreManager (x, y, size, score, spacing)
  rightScore = new ScoreManager(width-45, 25, 15, -20);
  // Create aliens with autonomous controls
  //Aliens (x, y, vx, vy, size, speed, capture, score)
  aliens = new Aliens(250, 10, 1, -1, 50, 0.010, false, false, 0);
  // initiates the title feature
  // UP_ARROW to start DOWN_ARROW to restart after game over.
  title = new Title(true, false);
  //
  //
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  //===========TITLE SCREENS====================//
  // Check if game over is triggered, if not the game plays
  // also checks which title to display depending on the title's properties.
  if (leftPaddle.gameOver() || rightPaddle.gameOver()) {
    background(255);
    title.display();
    // if title.start is true during a game over, reset the paddles position
    // and score making it not gameOver anymore + change title screens.
    if (title.start === true) {
      title.end = false;
      leftPaddle.reset();
      rightPaddle.reset();
    }
  } else {
    // if it's not a game over and title.start is true display start screen.
    // BackgroundArt selects a new random star background, else time to play.
    if (title.start === true) {
      background(100);
      title.display();
      starBackg.selection();
    } else {
      //=========GAME START======================//
      starBackg.display();
      //=========LEFT PADDLE=====================//
      leftPaddle.handleInput();
      leftShot.handleInput(leftPaddle);
      leftPaddle.update();
      leftShot.update(leftPaddle);
        if (leftShot.isOffScreen()){
            leftShot.reset(leftPaddle);
          }
      leftShot.handleCollision();
      leftScore.update(leftPaddle);
      //=========RIGHT PADDLE===================//
      rightPaddle.handleInput();
      rightShot.handleInput(rightPaddle);
      rightPaddle.update();
      rightShot.update(rightPaddle);
        if (rightShot.isOffScreen()) {
            rightShot.reset(rightPaddle);
          }
      rightShot.handleCollision();
      rightScore.update(rightPaddle);
      //========ALIENS========================//
        // aliens.hunt();
        // aliens.stun();
     //=========BALL========================//
      ball.update();
        if (ball.isOffScreen()) {
          ball.reset();
        }
      ball.handleCollision(leftPaddle);
      ball.handleCollision(rightPaddle);
      ball.handleCapture();
      ball.display();
      //========BAD BALL======================//
      //=======ASK IF THIS IS OKAY=============//
      // for (var i = 0; i < aliens.score; i++) {
      //   badBall.push(new BadBall(1 + i, 0, 5, 25, 10, 10));
      //   badBall[i].display();
      //   badBall[i].update();
      //   badBall[i].handleCollision(leftPaddle);
      //   badBall[i].handleCollision(rightPaddle);
      // }
      //=========DISPLAY ORDER===============//
      leftShot.display();
      rightShot.display();
      leftPaddle.display();
      rightPaddle.display();
      // aliens.display();
    }
  }
}
