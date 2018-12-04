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

var scene1;
var scene2;
var scene3;
var scene4;
var scene5;
var scene6;
var scene7;
var oldman1;
var oldman2;
var oldman3;
var talkBox;

//preload()
//
// Preload function for images, sounds, and maybe JSON (if I feel like killing myself)
function preload() {
	shipImage = loadImage( "assets/images/face.png" );
	bulletImage = loadImage( "assets/images/heart.png" );
	targetImage = loadImage( "assets/images/animals-target.png" );
	flipImage = loadImage( "assets/images/flip.png" );
	scene1 = loadAnimation('assets/images/anim000.png', 'assets/images/anim005.png');
	scene2 = loadAnimation('assets/images/secondOldman00.png', 'assets/images/secondOldman05.png');
	scene3 = loadAnimation('assets/images/thirdOldman00.png', 'assets/images/thirdOldman05.png');
	scene4 = loadAnimation('assets/images/fourthOldMan00.png','assets/images/fourthOldMan05.png');
	scene5 = loadAnimation('assets/images/fiveOldMan00.png','assets/images/fiveOldMan05.png');
	scene6 = loadAnimation('assets/images/sixOldMan00.png','assets/images/sixOldMan05.png');
	scene7 = loadAnimation('assets/images/sevenOldMan00.png','assets/images/sevenOldMan05.png');
	glitchImage = loadAnimation("assets/images/Glitch0.png", "assets/images/Glitch6.png");
	oldman1 = loadAnimation('assets/images/oldMan&ball00.png','assets/images/oldMan&ball12.png');
	oldman2 = loadAnimation('assets/images/oldmanhappy_00.png','assets/images/oldmanhappy_12.png');
	oldman3 = loadAnimation('assets/images/Ball_00.png','assets/images/Ball_12.png');

}

// setup()
//
// Creates the ball and paddles
function setup() {
	//Creates Full Game Canvas
	createCanvas( windowWidth, windowHeight );
	noStroke();

	// Universal setup
	//
	// Create the player with WASD as controls
	// Keycodes 83,87,68,65 respectively
	// Paddle(x,y,w,h,speed,downKey,upKey,rightKey,leftKey,score)
	player = new Paddle( 0, windowHeight/4, 10, 60, 10, 83, 87, 68, 65 );
	// Glitch(x,y,vx,vy,size,speed)
	glitch = new Glitch( 10, 10, 0, 0, 10, 10, 0 );
	// Create a ball
	//Ball( x, y, vx, vy, size, speed )
	ball = new Ball( windowWidth/4, windowHeight/4, 5, 5, 10, 10 );
	// Create the right paddle
	// AutoPaddle(x,y,w,h,speed)
	paddle = new AutoPaddle( windowWidth/2 - 10, windowHeight/4, 10, 60, 10 );
	// Create Ships
// Ship(x,y,angle,acceleration,maxSpeed,turningSpeed,shipImage,bulletImage,shootplayer,shootstyle)
	ship1 = new Ship( 5 * windowWidth / 8, windowHeight / 4, 0, 5, 5, 0.1, shipImage, bulletImage, true, false );
	ship2 = new Ship( 7 * windowWidth / 8, windowHeight / 4, PI, 5, 5, 0.1, shipImage, bulletImage, false, true );
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
	level1();

	//Lovers draw
	if ( glitch.level1 === true ) {
		level2();
	}
	// Dodgers draw
	if ( glitch.level2 === true ) {
		level3();
	}
	//Sausage Draw
	if ( glitch.level3 === true ) {
		level4();
	}
}
	function level1() {
		paddle.controler( ball );
		ball.update();
		paddle.update();
		if (talkBox.active === false){
		for ( var i = 0; i < 5; i++ ) {
			glitchesLV1[ i ].display();
			glitchesLV1[ i ].handleCollision( ball );
		}
	}

		if ( ball.isOffScreen( true ) ) {
			ball.reset();
		}
		ball.handleCollision();
		ball.display();
		paddle.display();
	}
	function level2() {
		ship1.display();
		ship2.display();
		if (talkBox.active === false){
		ship1.controller();
		ship2.controller();

		ship1.update();
		ship2.update();

		ship1.updateBullets( player );
		ship2.updateBullets( player );
		if ( glitch.level2 === false ) {
			for ( x = 0; x < glitchLV2counter; x++ ) {
				glitchesLV2[ x ].display();
				glitchesLV2[ x ].handleCollision( player );
			}
		}
	}
}
	function level3() {
		car1.display();
		car2.display();
		car3.display();
		car4.display();
		if (talkBox.active === false){
		car1.update();
		car1.reset();
		car2.update();
		car2.reset();
		car3.update();
		car3.reset();
		car4.update();
		car4.reset();
		if ( glitch.level3 === false ) {
			for ( j = 0; j < glitchLV3counter; j++ ) {
				glitchesLV3[ j ].display();
				glitchesLV3[ j ].handleCollision( player );
			}
		}
	}
}
	function level4(){
		doggo.update();
		doggo.display();
		if ( glitch.level4 === false ) {
			for ( var f = 0; f < 12; f++ ) {
				glitchesLV4[ f ].display();
				glitchesLV4[ f ].handleCollision( player );
			}
		}
	}
