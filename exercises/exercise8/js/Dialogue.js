// Dialogue
//
//* At the moment no dialogue is involved this was decided for work flow purposes and
// an update to this class is coming soon *
//
// A class to define how the dialogue behaves
// this class will manage dialogue choices and dialogue options as well as using arrays
// to give the dialogue


// var speech = [ "Hey...", "You again huh, seems like it's always you me and this ball", "This isn't really the place for small talk is it?",
// 	"At my last post they told me I talk too much", "Hello? can you hear me?", "jeez louise this again it's always a ball back and forth, can't we play a shooter or something"
// ];
// var speech2 = [ "Whoa you can hear me that's awesome, I've never had a convesation before", "holy moly this is so exciting ummmmm what do you like to do",
// 	"I could almost jump from joy, but I can't cuz I'm stuck here."
// ];
// var speech3 = [ "asdfghjklasdfghjklasdfghjkl; asdfghjk sdfghjk sdfgh j", " asdfghjkl asdfghjk fgh jkgh hjk ghjkl ghjk ghj", " asdfghj sdfghj sdfghj dfgh",
// 	"sudasdhasihdiuashisaodjhoasjdoajhsodaisidssihiais", "suhdaishdasdwpqpwdpwii jdjsijojaosaijpoop"
// ];

// Dialogue constructor
//
// Sets the properties with the provided arguments
function Dialogue( x, y, size, talking, str ) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.talking = talking;
	this.strings = str;
	this.stage = "introstage";
	this.currentString = "default";
	this.stringindex = 0;
	console.log( this.strings );
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Dialogue.prototype.update = function( Paddle ) {
	if ( leftPaddle.score >= 1 || rightPaddle.score >= 1 ) {
		this.talking = true;
	}
}

// isOffScreen()
//
// Checks if the player has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Dialogue.prototype.isOffScreen = function( Paddle ) {
	// Check for going off screen and ends the scene if so.
	if ( Paddle.x + Paddle.size < 0 || Paddle.x > width ) {
		return true;
	} else {
		return false;
	}
}

//mousePressed()
//
//
Dialogue.prototype.mousePressed = function() {
	this.setStage( "introstage" )
	this.changeString()
	// Check if the mouse is in the x range of the target
	if ( mouseX > 150 && mouseX < 150 + 150 ) {
		// Check if the mouse is also in the y range of the target
		if ( mouseY > 400 - 150 && mouseY < 400 ) {}
	}
	if ( mouseX > 490 && mouseX < 490 + 150 ) {
		// Check if the mouse is also in the y range of the target
		if ( mouseY > 400 - 150 && mouseY < 400 ) {}
	}
}

//changeStage()
//
//research => arrow functions
Dialogue.prototype.setStage = function( stageID ) {
	var stage = this.strings.stages.filter( obj => {
		return obj.stageID === stageID;
	} );
	this.stage = stage[ 0 ];
	return stage[ 0 ];
}

Dialogue.prototype.changeString = function( stringID ) {
	var currentS = this.stage.strings.filter( obj => {
		return obj.ID === stringID;
	} );
	if ( mousePressed ) {
		this.stringindex += 1;
		console.log( "hey hola mucha" )
	}
	// if no stringID supplied
	if ( !stringID ) {
		this.stringindex += 1
		if ( this.stage.strings[ this.stringindex ] ) {
			this.currentString = this.stage.strings[ index.prop ]
			console.log( "hola" )
		}

	}

	console.log( currentS[ 0 ] )
	this.currentString = currentS[ 0 ].string; // should be 'test'

	if ( !currentS[ 0 ] ) {
		console.log( 'no string found by the ID of ' + stringID );
		return;
	}
}

// display()
//
// Draw the ball as a rectangle on the screen
Dialogue.prototype.display = function( id ) {
	var speech = this.currentString;
	console.log( speech );
	console.log
	if ( this.talking === true ) {
		push();
		fill( 255, 237, 178 );
		rect( this.x, this.y, this.size, this.size / 3 );
		fill( 0 );
		text( speech, 150, this.y + 100 );
		pop();
	}
}
