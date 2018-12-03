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
var glitchImage;
var glitchSprite;
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
var canvas2Width = 720;
var canvas2Height = 395

//Sausage
var doggo;

var s1a1;
var s1a2;
var s1a3;
var talkBox;

//preload()
//
// Preload function for images, sounds, and maybe JSON (if I feel like killing myself)
function preload() {
	shipImage = loadImage( "assets/images/face.png" );
	bulletImage = loadImage( "assets/images/heart.png" );
	targetImage = loadImage( "assets/images/animals-target.png" );
	flipImage = loadImage( "assets/images/flip.png" );
	s1a1 = loadAnimation("assets/images/s1a1_0.png", "assets/images/s1a1_5.png");
	s1a2 = loadAnimation("assets/images/s1a20.png", "assets/images/s1a25.png");
	s1a3= loadAnimation("assets/images/s1a30.png", "assets/images/s1a35.png");
	glitchImage = loadAnimation("assets/images/Glitch0.png", "assets/images/Glitch6.png");
}

// setup()
//
// Creates the ball and paddles
function setup() {
	//Creates Full Game Canvas
	createCanvas( 1440, 790 );
	noStroke();

	// Universal setup
	//
	// Create the player with WASD as controls
	// Keycodes 83,87,68,65 respectively
	// Paddle(x,y,w,h,speed,downKey,upKey,rightKey,leftKey,score)
	player = new Paddle( 0, canvas1Height / 2, 10, 60, 10, 83, 87, 68, 65 );
	// Glitch(x,y,vx,vy,size,speed)
	glitch = new Glitch( 10, 10, 0, 0, 10, 10, 0 );
	// Create a ball
	//Ball( x, y, vx, vy, size, speed )
	ball = new Ball( canvas1Width / 2, canvas1Height / 2, 5, 5, 10, 10 );
	// Create the right paddle
	// AutoPaddle(x,y,w,h,speed)
	paddle = new AutoPaddle( canvas1Width - 10, canvas1Height / 2, 10, 60, 10 );
	// Create Ships
// Ship(x,y,angle,acceleration,maxSpeed,turningSpeed,shipImage,bulletImage,shootplayer,shootstyle)
	ship1 = new Ship( 5 * width / 8, canvas2Height / 2, 0, 5, 5, 0.1, shipImage, bulletImage, true, false );
	ship2 = new Ship( 7 * width / 8, canvas2Height / 2, PI, 5, 5, 0.1, shipImage, bulletImage, false, true );
	//Create dodgers
	//Dodgers( x, y, size, speed, canvasBleed )
	car1 = new Dodgers( 864, 592, 50, 5, 100 );
	car2 = new Dodgers( 1008, 592, 50, 5, 300 );
	car3 = new Dodgers( 1152, 592, 50, 5, 40 );
	car4 = new Dodgers( 1296, 592, 50, 5, 150 );
	// Create doggo
	// Dog(x,y,size,speed)
	doggo = new Dog( width / 4, 3 * height / 4, 120, 2 );
	// Create dialogue box reffered to as TalkBox
	// TalkBox(x, y, size, talking, str)
	talkBox = new TalkBox(300,400,200,0);

	// GLITCH Setup
	//
	// Set up Glitch arrays for each level
	for ( var i = 0; i < 5; i++ ) {
		glitchesLV1.push( new Glitch( random( 100, canvas1Width - 100 ), random( 100, canvas1Height - 100 ), 0, 0, 10, 0 ) );
	}
	for ( x = 0; x < 12; x++ ) {
		glitchesLV2.push( new Glitch( random( 740, width - 20 ), random( 20, 375 ), 0, 0, 10, 0 ) );
	}
	for ( j = 0; j < 14; j++ ) {
		glitchesLV3.push( new Glitch( random( 740, width - 20 ), random( 385, 770 ), 0, 0, 10, 0 ) );
	}
	for ( var f = 0; f < 14; f++ ) {
		glitchesLV4.push( new Glitch( random( 20, canvas1Width - 20 ), random( 385, 770 ), 0, 0, 10, 0 ) );
	}
}


// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
	background( 0 );
	//Universal draw
	player.handleInput();
	player.update();
	player.display();
	glitch.handleLevels();
	talkBox.update();
	talkBox.display();
	// dialogue.mousePressed();
	// dialogue.changeStage();
	// dialogue.changeString();
	// dialogue.display();


	//Pong draw
	paddle.controler( ball );
	ball.update();
	paddle.update();
	for ( var i = 0; i < 5; i++ ) {
		glitchesLV1[ i ].display();
		glitchesLV1[ i ].handleCollision( ball );
	}

	if ( ball.isOffScreen( true ) ) {
		ball.reset();
	}
	ball.handleCollision();
	ball.display();
	paddle.display();

	//Lovers draw
	if ( glitch.level1 === true ) {
		ship1.controller();
		ship2.controller();

		ship1.update();
		ship2.update();

		ship1.updateBullets( player );
		ship2.updateBullets( player );

		ship1.display();
		ship2.display();
		if ( glitch.level2 === false ) {
			for ( x = 0; x < glitchLV2counter; x++ ) {
				glitchesLV2[ x ].display();
				glitchesLV2[ x ].handleCollision( player );
			}
		}
	}
	// Dodgers draw
	if ( glitch.level2 === true ) {
		car1.update();
		car1.reset();
		car1.display();
		car2.update();
		car2.reset();
		car2.display();
		car3.update();
		car3.reset();
		car3.display();
		car4.update();
		car4.reset();
		car4.display();
		if ( glitch.level3 === false ) {
			for ( j = 0; j < glitchLV3counter; j++ ) {
				glitchesLV3[ j ].display();
				glitchesLV3[ j ].handleCollision( player );
			}
		}
	}


	//Sausage Draw
	if ( glitch.level3 === true ) {
		doggo.update();
		doggo.display();
		if ( glitch.level4 === false ) {
			for ( var f = 0; f < 12; f++ ) {
				glitchesLV4[ f ].display();
				glitchesLV4[ f ].handleCollision( player );
			}
		}
	}
}
