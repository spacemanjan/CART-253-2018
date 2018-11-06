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
var extraT;
var ball;
var badBall = [];
var evilBall;
var soundTrack;
var zap;
var titleFont;
var subFont;
var titleBackG;

//preload()
function preload() {
  stars = [loadImage("assets/images/stars1.png"), loadImage("assets/images/stars2.png"),
    loadImage("assets/images/stars3.png"), loadImage("assets/images/stars4.png"),
    loadImage("assets/images/stars5.png"), loadImage("assets/images/stars6.png"),
    loadImage("assets/images/stars7.png")
  ];
  extraT = loadImage("assets/images/alien.png");
  evilBall = loadImage("assets/images/badball.png");
  titleBackG = loadImage("assets/images/stars1.png");
// SOUNDS
  soundTrack = new Audio("assets/sounds/Nocturne.mp3");
  zap = new Audio("assets/sounds/zap.wav");
// FONTS
  titleFont = loadFont("assets/fonts/barcode.ttf");
  subFont = loadFont("assets/fonts/unica.ttf");
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
  //Ball(x, y, vx, vy, size, speed)
  ball = new Ball(width / 2, height / 2, 5, 5, 10, 5);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  leftPaddle = new Paddle(0, height / 2, 10, 60, 10, 83, 87, 0);
  // Create the left Paddle shot with the SPACE key as a trigger
  // Shooter (x, y, vx, speed, shootKey, ammo)
  leftShot = new Shooter(leftPaddle.x, leftPaddle.y, 18, 32, false);
  // Create score board for the left Paddle
  //ScoreManager (x, y, size, score, spacing)
  leftScore = new ScoreManager(30, 25, 15, 20);
  // Create the right paddle with UP and DOWN as controls
  rightPaddle = new Paddle(width - 10, height / 2, 10, 60, 10, DOWN_ARROW, UP_ARROW, 0);
  // Create the right Paddle shot with the SHIFT key as a trigger
  // Shooter (x, y, xv, speed, shootKey, ammo)
  rightShot = new Shooter(rightPaddle.x - 10, rightPaddle.y, -18, 16, false);
  // Create score board for the right Paddle
  // ScoreManager (x, y, size, score, spacing)
  rightScore = new ScoreManager(width - 45, 25, 15, -20);
  // Create aliens with autonomous controls
  //Aliens (x, y, vx, vy, size, speed, capture, score)
  aliens = new Aliens(250, 10, -7, 50, 0.015, false, false, 0);
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
      aliens.reset();
    }
  } else {
    // if it's not a game over and title.start is true display start screen.
    // BackgroundArt selects a new random star background else time to play.
    if (title.start === true) {
      image(titleBackG,0,0);
      title.display();
      starBackg.selection();
      soundTrack.currentTime = 0;
    } else {
      //=========GAME START======================//
      soundTrack.play();
      starBackg.display();
      //=========LEFT PADDLE=====================//
      leftPaddle.handleInput();
      leftShot.handleInput(leftPaddle);
      leftPaddle.update();
      leftShot.update(leftPaddle);
      if (leftShot.isOffScreen()) {
        leftShot.reset(leftPaddle);
      }
      leftShot.handleCollision(rightPaddle);
      leftScore.update(leftPaddle);
      leftShot.display();
      leftPaddle.display();
      leftPaddle.hitCheck();
      //=========RIGHT PADDLE===================//
      rightPaddle.handleInput();
      rightShot.handleInput(rightPaddle);
      rightPaddle.update();
      rightShot.update(rightPaddle);
      if (rightShot.isOffScreen()) {
        rightShot.reset(rightPaddle);
      }
      rightShot.handleCollision(leftPaddle);
      rightScore.update(rightPaddle);
      rightShot.display();
      rightPaddle.display();
      rightPaddle.hitCheck();
      //========ALIENS========================//
      leftShot.handleDestroy();
      rightShot.handleDestroy();
      //=====ASK FOR HELP TO IMPROVE?===========//
      aliens.hunt();
      aliens.stun();
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
      for (var i = 0; i < aliens.score; i++) {
        //BadBall(x, y, vx, vy, size, speed)
        badBall.push(new BadBall(1 + i, 0, 5, 50, 30, 10));
        badBall[i].display();
        badBall[i].update();
        badBall[i].handleCollision(leftPaddle);
        badBall[i].handleCollision(rightPaddle);
      }
      aliens.display();
    }
  }
}
