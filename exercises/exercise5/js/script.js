// Basic OO Pong
// by Pippin Barr
// edited by Yann-Maurice McNiven
//
// A primitive implementation of Pong with no scoring system
// just the ability to play the game with the keyboard.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Variable to contain the objects representing our ball and paddles
var ball;
var leftPaddle;
var rightPaddle;
var visuals;

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  // Create a ball
  // Ball (x,y,vx,vy,size,speed)
  ball = new Ball(width/2,height/2,5,5,10,5);
  //======================NEW CODE==========================================//
  // Create the right paddle with UP and DOWN as controls
  // paddle(x,y,w,h,speed,downKey,upKey,score,latestPoint)
  rightPaddle = new Paddle(width-10,height/2,10,60,10,DOWN_ARROW,UP_ARROW,0,false);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  // paddle(x,y,w,h,speed,downKey,upKey,score,latestPoint)
  leftPaddle = new Paddle(0,height/2,10,60,10,83,87,0,false);
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  // Activates Visuals
  // Visuals effect the visuals and graphics of the game
  // it also tracks and displays the score of the game.
  visuals = new Visuals(leftPaddle.score, rightPaddle.score, leftPaddle.score + rightPaddle.score, rightPaddle.latestPoint, leftPaddle.latestPoint);
  background(0);
  visuals.colorManager();



  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();

  if (ball.isOffScreen()) {
    ball.reset();
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  ball.display();
  leftPaddle.display();
  rightPaddle.display();

  visuals.scoreBoard();
}
