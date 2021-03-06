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
var title;
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

// Animation vars
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
var loveruno1;
var loverduo1;
var loveruno2;
var loverduo2;
var couple1;
var couple2;
var couple3;
var loverunohappy;
var balllead1;
var balllead2;
var balllead3;
var balllead4;
var brothers;
var brothers2;
var balllead5;
var balllead6;
var ballbro1;
var ballbro2;
var ballbro3;
var pup;
var happypup;
var ending1;
var ending2;

var talkBox;

//preload()
//
// Preload function for images, sounds, and maybe JSON (if I feel like killing myself)
function preload() {
	shipImage = loadImage( "assets/images/face.png" );
	bulletImage = loadImage( "assets/images/heart.png" );
	targetImage = loadImage( "assets/images/animals-target.png" );
	flipImage = loadImage( "assets/images/flip.png" );
	scene1 = loadAnimation( 'assets/images/anim000.png', 'assets/images/anim005.png' );
	scene2 = loadAnimation( 'assets/images/secondOldman00.png', 'assets/images/secondOldman05.png' );
	scene3 = loadAnimation( 'assets/images/thirdOldman00.png', 'assets/images/thirdOldman05.png' );
	scene4 = loadAnimation( 'assets/images/fourthOldMan00.png', 'assets/images/fourthOldMan05.png' );
	scene5 = loadAnimation( 'assets/images/fiveOldMan00.png', 'assets/images/fiveOldMan05.png' );
	scene6 = loadAnimation( 'assets/images/sixOldMan00.png', 'assets/images/sixOldMan05.png' );
	scene7 = loadAnimation( 'assets/images/sevenOldMan00.png', 'assets/images/sevenOldMan05.png' );
	glitchImage = loadAnimation( "assets/images/Glitch0.png", "assets/images/Glitch6.png" );
	oldman1 = loadAnimation( 'assets/images/oldMan&ball00.png', 'assets/images/oldMan&ball12.png' );
	oldman2 = loadAnimation( 'assets/images/oldmanhappy_00.png', 'assets/images/oldmanhappy_12.png' );
	oldman3 = loadAnimation( 'assets/images/Ball_00.png', 'assets/images/Ball_12.png' );
	loveruno1 = loadAnimation( 'assets/animations/loveuno/loversad_0.png', 'assets/animations/loveuno/loversad_3.png' );
	loverduo1 = loadAnimation( 'assets/animations/loveduo/loversad_0.png', 'assets/animations/loveduo/loversad_3.png' );
	loveruno2 = loadAnimation( 'assets/animations/loveuno/loversad_4.png', 'assets/animations/loveuno/loversad_7.png' );
	loverduo2 = loadAnimation( 'assets/animations/loveduo/loversad_4.png', 'assets/animations/loveduo/loversad_7.png' );
	couple1 = loadAnimation( 'assets/animations/lovers/lovers_0.png', 'assets/animations/lovers/lovers_5.png' );
	couple2 = loadAnimation( 'assets/animations/lovers/lovers_6.png', 'assets/animations/lovers/lovers_11.png' );
	couple3 = loadAnimation( 'assets/animations/lovers/lovers_12.png', 'assets/animations/lovers/lovers_17.png' );
	loverunohappy = loadAnimation( 'assets/animations/loveunohappy/loverhappy_0.png', 'assets/animations/loveunohappy/loverhappy_3.png' );
	balllead1 = loadAnimation( 'assets/animations/balluno/ball_0.png', 'assets/animations/balluno/ball_3.png' );
	balllead2 = loadAnimation( 'assets/animations/balluno/ball_4.png', 'assets/animations/balluno/ball_7.png' );
	balllead3 = loadAnimation( 'assets/animations/balluno/ball_8.png', 'assets/animations/balluno/ball_11.png' );
	balllead4 = loadAnimation( 'assets/animations/balluno/ball_12.png', 'assets/animations/balluno/ball_15.png' );
	brothers = loadAnimation( 'assets/animations/griskelbrothers/growskybros_0.png', 'assets/animations/griskelbrothers/growskybros_5.png' );
	brothers2 = loadAnimation( 'assets/animations/griskelbrothers/growskybrosagain_0.png', 'assets/animations/griskelbrothers/growskybrosagain_5.png' );
	balllead5 = loadAnimation( 'assets/animations/balluno/ball_16.png', 'assets/animations/balluno/ball_19.png' );
	balllead6 = loadAnimation( 'assets/animations/balluno/ball_20.png', 'assets/animations/balluno/ball_23.png' );
	ballbro1 = loadAnimation( 'assets/animations/balldos/ball_0.png', 'assets/animations/balldos/ball_2.png' );
	ballbro2 = loadAnimation( 'assets/animations/balltre/ball_0.png', 'assets/animations/balltre/ball_4.png' );
	ballbro3 = loadAnimation( 'assets/animations/ballquat/ball_0.png', 'assets/animations/ballquat/ball_3.png' );
	pup = loadAnimation( 'assets/animations/dog/dog_0.png', 'assets/animations/dog/dog_3.png' );
	happypup = loadAnimation( 'assets/animations/dogdancing/doghappy_0.png', 'assets/animations/dogdancing/doghappy_3.png' );
	ending1 = loadAnimation( 'assets/animations/endings/fin_0.png', 'assets/animations/endings/fin_3.png' );
	ending2 = loadAnimation( 'assets/animations/endings/ending_0.png', 'assets/animations/endings/ending_3.png' );
	titleFont = loadFont( "assets/fonts/VT323-Regular.ttf" );
	mainMusic = new Audio( "assets/sounds/main.mp3" );
	growskMusic = new Audio( "assets/sounds/growsk.mp3" );
	endingMusic = new Audio( "assets/sounds/end.mp3" );
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
	player = new Paddle( 0, windowHeight / 4, 10, 60, 10, 83, 87, 68, 65 );
	// Glitch(x,y,vx,vy,size,speed)
	glitch = new Glitch( 10, 10, 0, 0, 10, 10, 0 );
	// Create a ball
	//Ball( x, y, vx, vy, size, speed )
	ball = new Ball( windowWidth / 4, windowHeight / 4, 5, 5, 10, 10 );
	// Create the right paddle
	// AutoPaddle(x,y,w,h,speed)
	paddle = new AutoPaddle( windowWidth / 2 - 10, windowHeight / 4, 10, 60, 10 );
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
	talkBox = new TalkBox( 300, 400, 200, 0 );
	title = new Title( true, false, false );

	// GLITCH Setup
	//
	// Set up Glitch arrays for each level
	for ( var i = 0; i < 5; i++ ) {
		glitchesLV1.push( new Glitch( random( 100, windowWidth / 2 - 100 ), random( 100, windowHeight / 2 - 100 ), 10 ) );
	}
	for ( x = 0; x < 12; x++ ) {
		glitchesLV2.push( new Glitch( random( windowWidth / 2, width - 20 ), random( 20, windowHeight / 2 ), 10 ) );
	}
	for ( j = 0; j < 14; j++ ) {
		glitchesLV3.push( new Glitch( random( windowWidth / 2, width - 20 ), random( windowHeight / 2 + 10, windowHeight ), 10 ) );
	}
	for ( var f = 0; f < 14; f++ ) {
		glitchesLV4.push( new Glitch( random( 20, windowWidth / 2 - 20 ), random( windowHeight / 2 + 30, windowHeight ), 10 ) );
	}
	for ( var i = 0; i < 33; i++ ) {
		glitchesEnd.push( new Glitch( random( 10, windowWidth - 10 ), random( 10, windowHeight - 10 ), random( 10, 50 ) ) );
	}
}


// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
	background( 0 );
	mainMusic.play();
	if ( title.start === true ) {
		title.display();
	}
	if ( title.middle === true ) {
		//Universal draw
		player.handleInput();
		player.update();
		player.display();
		glitch.handleLevels();
		talkBox.display();
		talkBox.update();

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
	if ( title.end === true ) {
		mainMusic.pause();
		endingMusic.play();
		for ( var i = 0; i < 33; i++ ) {
			glitchesEnd[ i ].display();
		}
		title.display();
	}
}



function level1() {
	paddle.controler( ball );
	ball.update();
	paddle.update();
	if ( talkBox.active === false ) {
		talkBox.string = 2;
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
	ship1.controller();
	ship2.controller();

	ship1.update();
	ship2.update();
	ship1.updateBullets( player );
	ship2.updateBullets( player );
	if ( talkBox.active === false ) {
		talkBox.string = 4;
		ship1.playtime = true;
		ship2.playtime = true;
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
	if ( talkBox.active === false ) {
		talkBox.string = 6;
		mainMusic.pause();
		growskMusic.play();
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

function level4() {
	growskMusic.pause();
	mainMusic.play();
	doggo.display();
	if ( talkBox.active === false ) {
		talkBox.string = 8;
		doggo.update();
		doggo.handleCollision();
		if ( glitch.level4 === false ) {
			for ( var f = 0; f < 12; f++ ) {
				glitchesLV4[ f ].display();
				glitchesLV4[ f ].handleCollision( doggo );
			}
		}
	}
}
