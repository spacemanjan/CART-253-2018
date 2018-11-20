// Dog
//
// A class that defines how a paddle behaves, including the ability
// to specify the input keys to move it up and down
//Paddle constructor

//Sets the properties with the provided arguments or defaults
function Dog(x,y,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = 0;
  this.size = size;
  this.speed = speed;
  this.acceleration = 0.05;
  this.flip = false;
}

// update()
// Update y position based on velocity
// Constrain the resulting position to be within the canvas
Dog.prototype.update = function() {
	this.speed = constrain(this.speed + this.acceleration, -15, 15);
	this.vx = this.speed;
	this.x = this.x + this.vx;
	if (this.x > 720) {
      //spawn him at a random height
    	this.y = random(395,height);
      //spawn him offscreen to the left
    this.x = 0;
} else if (this.x < 0 - 200){
		this.y = random(395,height);
		this.x = 720;
}
}
//======NEED TO UPDATE===============//
// it can be much improved, the dog still goes through the paddle at times I want to know if there's a trick to fix this
Dog.prototype.handleCollision = function() {
if (this.x > player.x && this.x <= player.x + player.w) {
   // Check if the dog hits the paddle
   if (this.y > player.y  && this.y <= player.y + player.h) {
	 // If so, move ball back to previous position (by subtracting current velocity)
	 this.x -= this.size/2;
	 this.size = -this.size;
	 // Reverse x velocity to bounceds
	 this.speed = -this.speed;
	 this.acceleration = -this.acceleration;
	 this.flip = !this.flip;
	 console.log(this.flip);
   }
 }
 }



// display()
//
// Draw the paddle as a rectangle on the screen
Dog.prototype.display = function() {
	imageMode(CENTER);
	if (this.flip === true){
	image(flipImage,this.x,this.y,this.size,this.size);
	}
	if (this.flip === false){
	image(targetImage, this.x, this.y, this.size, this.size);
}
}
