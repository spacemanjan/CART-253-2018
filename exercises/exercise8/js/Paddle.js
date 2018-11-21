// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down
//Paddle constructor

//Sets the properties with the provided arguments or defaults
function Paddle( x, y, w, h, speed, downKey, upKey, rightKey, leftKey ) {
	this.x = x;
	this.y = y;
	this.vx = 0;
	this.vy = 0;
	this.w = w;
	this.h = h;
	this.speed = speed;
	this.downKey = downKey;
	this.upKey = upKey;
	this.rightKey = rightKey;
	this.leftKey = leftKey;
	this.contained = false;
	this.barrier = false;
	this.hold = false;
}

// handleInput()
//
// Check if the up or down keys are pressed and update velocity
// appropriately
Paddle.prototype.handleInput = function() {
	if ( keyIsDown( this.upKey ) ) {
		this.vy = -this.speed;
	} else if ( keyIsDown( this.downKey ) ) {
		this.vy = this.speed;
	} else {
		this.vy = 0;
	}
	if ( glitch.level1 === true ) {
		if ( keyIsDown( this.rightKey ) ) {
			this.vx = this.speed;
		} else if ( keyIsDown( this.leftKey ) ) {
			this.vx = -this.speed;
		} else {
			this.vx = 0;
		}
	}
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas depending on what level
// they've completed and whether they've crossed the threshold into that stage.
Paddle.prototype.update = function() {
	this.y += this.vy;
	this.x += this.vx;
	// CONSTRAIN TO LEVEL (alot of this is hard coded will be changing that in next update)
	if ( glitch.level1 === false || glitch.level2 === false ) {
		this.y = constrain( this.y, 0, canvas1Height - this.h );
	}
	if ( this.barrier === true ) {
		if ( glitch.level3 === false || glitch.level4 === false ) {
			this.y = constrain( this.y, 395, 790 );
		}
	}
	if ( this.x >= 720 ) {
		this.contained = true;
	}
	if ( this.y >= 395 ) {
		this.barrier = true;
	}
	if ( this.x <= 720 && glitch.level3 === true ) {
		this.hold = true;
	}
	if ( glitch.level3 === true ) {
		this.contained = false;
	}
	if ( glitch.level4 === true ) {
		this.hold = false;
	}
	if ( this.contained === true ) {
		this.x = constrain( this.x, 720, 1440 );
	}
	if ( this.hold === true ) {
		this.x = constrain( this.x, 0, 720 );
	}
}



// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
	rect( this.x, this.y, this.w, this.h );
}
