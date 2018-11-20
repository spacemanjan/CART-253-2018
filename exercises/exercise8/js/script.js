// Talking 'bout my Generative Art
// by Yann-Maurice McNiven
//
//This is the demo of my final project, my idea for my "carte blanche" final is that, it starts
//as a traditional game, but during gameplay dialogue begins to occur, eventually the gameplay
//becomes navigating through diffrent settings and conversations that lead to little minigames with
//not so obvious ways of winning. I hope to make at least 4 couched minigames inside of this larger game.
//Exercise8 will be a demo of transitioning from 1 game to another game.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.

// Universal Variables
var player;
var glitch;

// Pong Variables
var ball;
var paddle;
var canvas1Width = 720;
var canvas1Height = 395;

// Lovers Variables
var ship1;
var ship2;
var shipImage;
var bulletImage;
var canvas2X = 720;
var canvas2Width =720;
var canvas2Height =395

//Sausage
var doggo;
//preload()
//
// Preload function for images, sounds, and maybe JSON (if I feel like killing myself)
function preload() {
	shipImage = loadImage("assets/images/face.png");
    bulletImage = loadImage("assets/images/heart.png");
	targetImage = loadImage("assets/images/animals-target.png");
    flipImage = loadImage("assets/images/flip.png");
}

// setup()
//
// Creates the ball and paddles
function setup() {
//Creates Full Game Canvas
  createCanvas(1440,790);
  noStroke();

  // Universal setup
  //
  // Create the player with WASD as controls
  // Keycodes 83,87,68,65 respectively
 // Paddle(x,y,w,h,speed,downKey,upKey,rightKey,leftKey,score)
  player = new Paddle(0,canvas1Height/2,10,60,10,83,87,68,65);
  // Glitch(x,y,vx,vy,size,speed)
  glitch = new Glitch(10,10,0,0,10,10,0);

  // Pong Setup
  //
  // Create a ball
  ball = new Ball(canvas1Width/2,canvas1Height/2,5,5,10,10);
  // Create the right paddle
  // AutoPaddle(x,y,w,h,speed)
  paddle = new AutoPaddle(canvas1Width-10,canvas1Height/2,10,60,10);

  // Lovers Setup
  //
  // Create Ships
  // Ship(x,y,angle,acceleration,maxSpeed,turningSpeed,shipImage,bulletImage,shootplayer,shootstyle)
  ship1 = new Ship(5*width/8,canvas2Height/2,0,5,5,0.1,shipImage,bulletImage,true,false);
  ship2 = new Ship(7*width/8,canvas2Height/2,PI,5,5,0.1,shipImage,bulletImage,false,true);

  // Sausage setup
  //
  // Create doggo
    doggo = new Dog (width/4,3*height/4,120,2);
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);
  //Universal draw
	glitch.update();
	player.handleInput();
	player.update();
	player.display();

  //Pong draw
  paddle.controler(ball);
  ball.update();
  paddle.update();
  for (var i = 0; i < 5; i++) {
	glitchesLV1[i].display();
  }

  if (ball.isOffScreen(true)){
    ball.reset();
  }
  ball.handleCollision();
  glitch.handleCollision();
  ball.display();
  paddle.display();

  //Lovers draw
  if (glitch.level1 === true){
  ship1.controller();
  ship2.controller();

  ship1.update();
  ship2.update();

  ship1.updateBullets(player);
  ship2.updateBullets(player);

  ship1.display();
  ship2.display();
  for (x = 0; x < 1; x++) {
	  glitchesLV2[x].display();
  }
}

  //Sausage Draw
 if (glitch.level2 === true){
  doggo.update();
  doggo.display();
  doggo.handleCollision();
}
}
