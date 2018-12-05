// Paddle
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down
//Paddle constructor

//Sets the properties with the provided arguments or defaults
function Paddle( x, y, w, h, speed, downKey, upKey, rightKey, leftKey ) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.speed = speed;
	this.downKey = downKey;
	this.upKey = upKey;
	this.rightKey = rightKey;
	this.leftKey = leftKey;
	//hard coded props
	this.vx = 0;
	this.vy = 0;
	this.editableSpeed = 10;
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
	this.editableSpeed = constrain(this.editableSpeed, 1,10);
	if (glitch.game === false){
	//speed constrainer
	if (glitch.level1 === true && glitch.level2 === false){
		this.speed = this.editableSpeed;
	}
	if (glitch.level2 === true){
		this.speed = 10;
	}
	//level1 constraints
	if ( glitch.level1 === false || glitch.level2 === false ) {
		this.y = constrain( this.y, 0, windowHeight/2 - this.h );
	}
	//level2 constraints
	if (glitch.level1 === true || glitch.level2 === false) {
		this.x = constrain(this.x, 0, windowWidth);
	}
	//level3 & 4 constraints
	if ( this.barrier === true ) {
		if ( glitch.level3 === false || glitch.level4 === false ) {
			this.y = constrain( this.y, windowHeight/2, windowHeight - this.h);
		}
	}
	//level 2
	if ( this.x >= windowWidth/2 ) {
		this.contained = true;
	}
	//level 3 & 4
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
		this.y = constrain(this.y, 0, windowHeight);
		this.x = constrain(this.x, -100,windowWidth);
	}
	//level 2 & 3
	if ( this.contained === true ) {
		this.x = constrain( this.x, windowWidth/2, windowWidth - this.w );
	}
	if ( this.hold === true ) {
		this.x = constrain( this.x, windowWidth/2 - 200 , windowWidth/2 );
	}
}
	this.x = constrain (this.x, -100,windowWidth-this.w);
	this.y = constrain (this.y, 0, windowHeight-this.h);
}



// display()
//
// Draw the paddle as a rectangle on the screen
Paddle.prototype.display = function() {
	rect( this.x, this.y, this.w, this.h );
}
