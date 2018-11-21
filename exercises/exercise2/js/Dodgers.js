// Dodgers
//
// A class that defines how a dodgers behave, including the ability

//Sets the properties with the provided arguments or defaults
function Dodgers( x, y, size, speed, canvasBleed ) {
	this.x = x;
	this.y = y;
	this.vy = 5;
	this.size = 50;
	this.speed = speed;
	this.canvasBleed = canvasBleed;
	this.speedIncrease = 0.5;
}


// update()
// Update y position based on velocity
Dodgers.prototype.update = function() {
	this.y += this.speed;
	this.speed = constrain(this.speed, 1, 11);
	console.log(this.speed);
	if ( this.y > height + this.canvasBleed ) {
		this.y = 0;
		this.speed += this.speedIncrease;
	}
}

Dodgers.prototype.reset = function() {
	if ( dist( this.x, this.y, player.x, player.y ) < this.size / 2 + player.w * 2 ) {
		player.x = 70;
		player.y = height / 2;
		( console.log( "IOAJSDJOSJDOASJODSIJ" ) )
	}
}

// display()
//
// Draw the paddle as a rectangle on the screen
Dodgers.prototype.display = function() {
	fill(255);
	ellipse( this.x, this.y, this.size, this.size );
	console.log( "HELLO", this.x, this.y, this.size )
}
