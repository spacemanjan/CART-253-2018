// Dodgers
//
// A class that defines how a dodgers behave, as well as manages how far they can go OffScreen
// as well as when they start moving.

// Dodgers constructor
//
//Sets the properties with the provided arguments or defaults
function Dodgers( x, y, size, speed, canvasBleed ) {
	this.x = x;
	this.y = y;
	this.vy = 5;
	this.size = 50;
	this.speed = speed;
	this.canvasBleed = canvasBleed;
	this.speedIncrease = 0.5;
	this.smash = false;
}


// update()
// Update y position based on speed & speedIncrease
// also starts their movements after player presses space.
Dodgers.prototype.update = function() {
	// if player presses SPACE then begin motion
	if ( keyIsDown( 32 ) ) {
		this.smash = true;
	}
	if ( this.smash === true ) {
		this.y += this.speed;
		this.speed = constrain( this.speed, 1, 11 );
		// Wrapper based on canvasBleed of each individual dodger
		if ( this.y > height + this.canvasBleed ) {
			this.y = 395;
			this.speed += this.speedIncrease;
		}
	}
}

//reset()
//
// reset's the player to the left side if they touche a dodger
Dodgers.prototype.reset = function() {

	if ( dist( this.x, this.y, player.x, player.y ) < this.size / 2 + player.w * 2 ) {
		player.x = 750;
		player.y = 3 * height / 4;
	}
}

// display()
//
// Draw the dodgers as a white ball
Dodgers.prototype.display = function() {
	fill( 255 );
	ellipse( this.x, this.y, this.size, this.size );
}
