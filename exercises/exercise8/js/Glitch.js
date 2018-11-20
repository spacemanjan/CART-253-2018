// Glitch
//
// A class which defines how many glitches will appear on each level, also tracks glitch
// collection and triggers booleans that are used by other objects and the game overall.

// Glitch Variables
var glitchesLV1 = [];
var glitchesLV2 = [];
var glitchLV2counter = 7;
var x;
// Glitch constructor
//
// Sets the glitch properties
function Glitch(x,y,vx,vy,size,speed) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.level1 = false;
  this.level2 = false;
  this.level3 = false;
  this.level4 = false;
}

// update()
//
// Generates glitches based on glitches collected and varries method of generating
// Level 1 is a mass array where the glitches are collected with the pong ball (5 Glitches)
// Level 2 generates glitches one after the other (7 Glitches)
// Level 3 generates glitches in groups of 3 (9 Glitches)
// Level 4 generates glitches randomly (12 Glitches)
// To beat the game must collect a total of (33 Glitches)
// off left or right side.
Glitch.prototype.update = function () {
	for (var i = 0; i < 5; i++) {
  		glitchesLV1.push(new Glitch(random(100,canvas1Width-100),random(100,canvas1Height-100),0,0,10,0));
	}
	for (x = 0; x < 1; x++) {
		glitchesLV2.push(new Glitch(random(740,width-20),random(20,375),0,0,10,0));
	}
}
// display()
//
// Draw the glitch on screen
Glitch.prototype.display = function () {
	push();
	fill(255,0,0);
  	rect(this.x, this.y,this.size,this.size);
	pop();
}

// handleCollision(paddle)
//
// Check if the ball overlaps the glitch passed as an argument
// and if so make the glitch disappear
// Q:how can I have this work through all the Glitches without repeating
// Q:how would I make these Glitches disappear (make their fills black?)
Glitch.prototype.handleCollision = function() {
  // PONG GLITCH
  // Check if the ball overlaps the paddle on x axis
  if (ball.x + ball.size > glitchesLV1[0].x && ball.x < glitchesLV1[0].x + 20) {
    // Check if the ball overlaps the paddle on y axis
    if (ball.y + ball.size > glitchesLV1[0].y && ball.y < glitchesLV1[0].y + 20) {
	   glitchesLV1[0].x = 100;
	   glitchesLV1[0].y = 100;
	   this.level1 = true;
    }
  }
  //LOVERS Glitch
  if (player.x + player.w > glitchesLV2[0].x && player.x < glitchesLV2[0].x +20){
	  if (player.y + player.h > glitchesLV2[0].y && player.y < glitchesLV2[0].y + 20){
		  console.log("you got me");
		  x -= 1;
		  glitchLV2counter -= 1;
	  }
  }
  if (glitchLV2counter === 0) {
	  this.level2 = true;
  }
}
