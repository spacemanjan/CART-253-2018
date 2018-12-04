// Ball
//
// A class to define how a ball behaves. Including bouncing on the top
// and bottom edges of the canvas, going off the left and right sides,
// and bouncing off paddles.

// Ball constructor
//
// Sets the properties with the provided arguments
function Ball( x, y, vx, vy, size, speed ) {
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.w = size;
	this.h = size;
	this.speed = speed;
}

// update()
//
// Moves according to velocity, constrains y to be on screen,
// checks for bouncing on upper or lower edgs, checks for going
// off left or right side.
Ball.prototype.update = function() {
	// Update position with velocity
	this.x += this.vx;
	this.y += this.vy;

	// Constrain y position to be on screen
	this.y = constrain( this.y, 0, canvas1Height - this.h );

	// Check for touching upper or lower edge and reverse velocity if so
	if ( this.y === 0 || this.y + this.h === canvas1Height ) {
		this.vy = -this.vy;
	}
}

// isOffScreen()
//
// Checks if the ball has moved off the screen and, if so, returns true.
// Otherwise it returns false.
Ball.prototype.isOffScreen = function() {
	// Check for going off screen and reset if so
	if ( this.x + this.w < 0 || this.x > canvas1Width ) {
		if (this.x < 0) {
	  // reverse the velocity to send the ball to the right side
		this.vx = 5;
		this.vy = -this.vy;
		this.vy = random(-this.vy, this.vy);
	}
		return true;
	} else {
		return false;
	}
}

// display()
//
// Draw the ball as a rectangle on the screen
Ball.prototype.display = function() {
	rect( this.x, this.y, this.w, this.h );
}

// handleCollision(paddle)
//
// Check if this ball overlaps the paddle passed as an argument
// and if so reverse x velocity to bounce
Ball.prototype.handleCollision = function() {
	// Check if the ball overlaps the paddle on x axis
	if ( this.x + this.w > paddle.x && this.x < paddle.x + paddle.w ) {
		// Check if the ball overlaps the paddle on y axis
		if ( this.y + this.h > paddle.y && this.y < paddle.y + paddle.h ) {
			// If so, move ball back to previous position (by subtracting current velocity)
			this.x -= this.vx;
			this.y -= this.vy;
			// Reverse x velocity to bounce
			this.vx = -this.vx;
		}
	}
	// Check if the ball overlaps the paddle on x axis
	if ( this.x + this.w > player.x && this.x < player.x + player.w ) {
		// Check if the ball overlaps the paddle on y axis
		if ( this.y + this.h > player.y && this.y < player.y + player.h ) {
			// If so, move ball back to previous position (by subtracting current velocity)
			this.x -= this.vx;
			this.y -= this.vy;
			// Reverse x velocity to bounce
			this.vx = -this.vx;
			this.vy = map(player.y - this.y, -player.h, player.h*2, this.speed/2, -this.speed/2);
		}
	}
}

// reset()
//
// Set position back to the middle of the screen
Ball.prototype.reset = function() {
	this.x = canvas1Width / 2;
	this.y = canvas1Height / 2;
}
