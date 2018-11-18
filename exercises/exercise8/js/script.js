// Talking 'bout my Generative Art
// by Yann-Maurice McNiven
//
//This is the demo of my final project, my idea for my "carte blanche" final is that, it starts
//as a traditional game, but during gameplay dialogue begins to occur, eventually the gameplay
//becomes navigating through diffrent settings and conversations that lead to little minigames with
//not so obvious ways of winning. I hope to make at least 4 couched minigames inside of this larger game.
//Exercise7 will be a demo of the dialogue while standard pong gameplay is happening.
//
// Arrow keys control the right hand paddle, W and S control
// the left hand paddle.
//
// Written with JavaScript OOP.
var ball;
var player;
var paddle;
var glitch;
var canvas1Width = 640;
var canvas1Height = 480;

//preload()
//
// Preload function for images, sounds, and maybe JSON (if I feel like killing myself)
function preload() {

}

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(1400,760);
  noStroke();
  // Create a ball
  ball = new Ball(canvas1Width/2,canvas1Height/2,5,5,10,10);
  // Create the right paddle
  // AutoPaddle(x,y,w,h,speed)
  paddle = new AutoPaddle(canvas1Width-10,canvas1Height/2,10,60,10);
  // Create the player with WASD as controls
  // Keycodes 83,87,68,65 respectively
 // Paddle(x,y,w,h,speed,downKey,upKey,rightKey,leftKey,score)
  player = new Paddle(0,canvas1Height/2,10,60,10,83,87,68,65);
  //
  // Glitch(x,y,vx,vy,size,speed)
  glitch = new Glitch(10,10,0,0,10,10,0);
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);
  console.log(screen.height);

  player.handleInput();
  paddle.controler(ball);

  ball.update();
  player.update();
  paddle.update();
  glitch.update();
  for (var i = 0; i < 5; i++) {
	  glitchesLV1[i].display();
  }


  if (ball.isOffScreen(true)){
    ball.reset();
  }

  ball.handleCollision();
  glitch.handleCollision(ball);

  ball.display();
  player.display();
  paddle.display();
  glitch.display();
}
