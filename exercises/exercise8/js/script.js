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
var leftPaddle;
var rightPaddle;
var dialogue;
var strings;

//preload()
//
// Preloads JSON
function preload() {
 	strings = loadJSON("js/strings.json");
}

// setup()
//
// Creates the ball and paddles
function setup() {
  createCanvas(640,480);
  noStroke();
  // Create a ball
  ball = new Ball(width/2,height/2,5,5,10,10);
  // Create the right paddle with UP and DOWN as controls
  // Paddle(x,y,w,h,speed,downKey,upKey,score)
  rightPaddle = new Paddle(width-10,height/2,10,60,1,DOWN_ARROW,UP_ARROW,0);
  // Create the left paddle with W and S as controls
  // Keycodes 83 and 87 are W and S respectively
  // Paddle(x,y,w,h,speed,downKey,upKey,score)
  leftPaddle = new Paddle(0,height/2,10,60,1,83,87,0);
  // Create the dialogue box
  // function Dialogue (x,y,size,talking)
  dialogue = new Dialogue(0,250,width,false, strings);
}

// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
  background(0);

  leftPaddle.handleInput();
  rightPaddle.handleInput();

  ball.update();
  leftPaddle.update();
  rightPaddle.update();
  dialogue.update();


  if (ball.isOffScreen(true)){
    ball.reset();
  }

  ball.handleCollision(leftPaddle);
  ball.handleCollision(rightPaddle);

  dialogue.display();
  ball.display();
  leftPaddle.display();
  rightPaddle.display();

}

function mousePressed () {
	dialogue.setStage('introstage')
    dialogue.changeString('intro4')
}
