// Glitch
//
// A class which defines how many glitches you need to collect on each level,
//  also tracks glitch collection, handles the collecting of glitches and manages which
// level you have access to based on booleans.

// Glitch Variables
var glitchesLV1 = [];
var glitchesLV2 = [];
var glitchesLV3 = [];
var glitchesLV4 = [];
var glitchcounter = 0;
var glitchLV2counter = 1;
var glitchLV3counter = 3;
var x;
var j;
// Glitch constructor
//
// Sets the glitch properties
function Glitch( x, y, vx, vy, size, speed ) {
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.size = size;
	this.alive = true;
	this.level1 = false;
	this.level2 = false;
	this.level3 = false;
	this.level4 = false;
}

// update()
//
// Generates glitches based on glitches collected and varries method of generating
// Level 1 is a mass array where the glitches are collected with the pong ball (5 Glitches)
// Level 2 generates glitches one after the other (7 Glitches)
// Level 3 generates glitches in groups of 3 (9 Glitches)
// Level 4 generates glitches randomly (12 Glitches)
// To beat the game must collect a total of (33 Glitches)
// off left or right side.
// display()
//
// Draw the glitch on screen if the glitch is dead don't display
Glitch.prototype.display = function() {
	if ( !this.alive ) {
		return;
	}
	push();
	fill( 255, 0, 0 );
	rect( this.x, this.y, this.size, this.size );
	pop();
}

// handleCollision(paddle)
//
// Check if anything overlaps the glitch passed as an argument
// and if so make the glitch disappear and count it.
Glitch.prototype.handleCollision = function( other ) {
	if ( !this.alive ) {
		return;
	}
	// Check if the ball overlaps the paddle on x axis
	if ( other.x + other.w > this.x && other.x < this.x + 20 ) {
		// Check if the ball overlaps the paddle on y axis
		if ( other.y + other.h > this.y && other.y < this.y + 20 ) {
			this.alive = false;
			glitchcounter += 1;
			// Lovers glitch manager
			// adds a single glitch to the visual so long as the glitchs collect are between 6 & 12
			if ( glitchcounter >= 6 && glitchcounter <= 12 ) {
				glitchLV2counter++;
			}
			// Dodgers glitch manager
			// adds 3 glitches when you've collected 15 glitches
			if ( glitchcounter === 15 ) {
				glitchLV3counter += 3;
			}
			// adds 3 glitches when you've collected 18 glitches
			if ( glitchcounter === 18 ) {
				glitchLV3counter += 3;
			}
		}
	}
}

//handleLevels();
//
// manages which levels have been completed also triggers winning sign if level4 is true
Glitch.prototype.handleLevels = function() {
	if ( glitchcounter === 5 ) {
		this.level1 = true;
		push();
		fill( 255, 0, 0 );
		textSize( 20 );
		text( "press space to play game", 800, 100 );
		console.log( "SSRPESS TO SLAPE" )
		pop();
	}
	if ( glitchcounter === 12 ) {
		this.level2 = true;
		textSize( 20 );
		text( "press space to play game", 800, 400 );
	}
	if ( glitchcounter === 21 ) {
		this.level3 = true;
		textSize( 20 );
		text( "press space to play game", 100, 400 );
	}
	if ( glitchcounter === 33 ) {
		this.level4 = true;
	}
	if ( this.level4 === true ) {
		textSize( 50 );
		text( "YOU'RE A WINNER!", 640, 395 );

	}
}
