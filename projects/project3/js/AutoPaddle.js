// AutoPaddle
//
// A class that controles the Non player Paddle

//AutoPaddle constructor
//
//Sets the properties with the provided arguments or defaults
function AutoPaddle( x, y, w, h, speed ) {
	this.x = x;
	this.y = y;
	this.vx = 0;
	this.vy = 0;
	this.w = w;
	this.h = h;
	this.speed = speed;
}

// controler()
//
// Very rudimentary auto pilot, tracks the y of the ball so it always catches it
//==========NEEDS WORK (FUTURE)==================//
AutoPaddle.prototype.controler = function( ball ) {
	this.vy = ball.vy;
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
AutoPaddle.prototype.update = function() {
	this.y += this.vy;
	this.x += this.vx;
	this.y = constrain( this.y, 0, canvas1Height - this.h );
}


// display()
//
// Draw the AutoPaddle as a rectangle on the screen
AutoPaddle.prototype.display = function() {
	rect( this.x, this.y, this.w, this.h );
}
