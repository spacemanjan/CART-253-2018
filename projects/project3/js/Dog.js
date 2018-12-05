// Dog
//
// A class that defines how the dog behaves including changing his image if he is flipped
// by the paddle.

//Dog constructor
//
//Sets the properties with the provided arguments or defaults
function Dog( x, y, size, speed ) {
	this.x = x;
	this.y = y;
	this.vx = 0;
	this.w = size;
	this.h = size / 2;
	this.size = size;
	this.speed = speed;
	this.acceleration = 0.05;
	this.flip = false;
}

// update()
// Update x position based on velocity & y position randomly after going off screen Also
// when to begin motion.
Dog.prototype.update = function() {
	// if player presses SPACE, begin motion
	this.speed = constrain( this.speed + this.acceleration, -15, 15 );
	this.vx = this.speed;
	this.x = this.x + this.vx;
	if ( this.x > 720 ) {
		//spawn him at a random height
		this.y = random( 395, height );
		//spawn him offscreen to the left
		this.x = 0;
	} else if ( this.x < 0 - 200 ) {
		this.y = random( 395, height );
		this.x = 720;
	}
}


// handleCollision()
//
// Handles collision with paddle, should send the dog going in the opposite direction.
Dog.prototype.handleCollision = function() {
	if ( this.x > player.x - player.w && this.x < player.x + player.w * 2 ) {
		if ( this.y > player.y - player.h && this.y < player.y + player.h ) {
			// If so, move dog back to previous position (by subtracting current velocity)
			this.x -= this.size / 2;
			this.size = -this.size;
			// Reverse x velocity to send the dog running & flip the image
			this.speed = -this.speed;
			this.acceleration = -this.acceleration;
			this.flip = !this.flip;
		}
	}
}



// display()
//
// Draw the dog with image preloaded on the screen & checks if flipped: use other image.
Dog.prototype.display = function() {
	imageMode( CENTER );
	if ( this.flip === true ) {
		image( flipImage, this.x, this.y, this.size, this.size );
	}
	if ( this.flip === false ) {
		image( targetImage, this.x, this.y, this.size, this.size );
	}
}
