// Title
//
// A class to manage the start and end screens

// Title constructor
//
// Sets the properties with the provided arguments
function Title( start, end, middle ) {
	this.start = start;
	this.end = end;
	this.middle = middle;
}

// display()
//
// Draw the title screen for the respective situation.
Title.prototype.display = function() {
	if ( this.start === true ) {
		push();
		fill( 255 );
		textFont( titleFont );
		textSize( 54 );
		text( "PROGRAM", windowWidth / 4, windowHeight / 2 );
		text( "TALE", windowWidth / 4 + 180, windowHeight / 2 + 50 );
		textSize( 20 );
		text( "INSTRUCTIONS:", windowWidth / 2, windowHeight / 2 + 50 );
		text( "press SPACE to go to the next dialogue box", windowWidth / 2, windowHeight / 2 + 100 );
		text( "PRESS THE SPACE KEY TO BEGIN GAME", windowWidth / 4, windowHeight / 2 + 100 );
		pop();
		if ( keyIsDown( 32 ) ) {
			this.start = false;
			this.middle = true;
		}
	}
	if ( this.end === true ) {
		fill( 255 );
		textFont( titleFont );
		textSize( 54 );
		text( "gameOver = true;", windowWidth / 2, windowHeight / 2 );
		animation( ending1, 500, 500 );
		animation( ending2, 550, 600 );
	}
}
