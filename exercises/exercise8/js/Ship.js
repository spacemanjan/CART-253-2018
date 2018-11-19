/************************************************************************

Ship

A class to represent a spaceship that can be controlled with the keyboard.
Movement is based on turning and acceleration model. The ship can also shoot
bullets and can be hit by bullets.

************************************************************************/

// Ship()
//
// The constructor takes the many parameters and stores them in properties
// These refer to
// - movement
// - images for the ship and bullets
// - what kind of shooting style they use
function Ship(x,y,angle,acceleration,maxSpeed,turningSpeed,shipImage,bulletImage,shootplayer,shootstyle) {
  this.x = x;
  this.y = y;
  this.angle = angle;
  this.speed = 0;
  this.size = shipImage.width;
  this.minSize = 1;
  this.maxSize = shipImage.width;
  this.acceleration = acceleration;
  this.maxSpeed = maxSpeed;
  this.turningSpeed = turningSpeed;
  this.bullets = [];
  this.shipImage = shipImage;
  this.bulletImage = bulletImage;
  this.shootplayer = shootplayer;
  this.shootstyle = shootstyle;
  this.playtime = false;

  // Here are some properties that are hard coded
  // There is no special reason for this
  this.maxBullets = 10;
  this.bulletCoolDown = 0;
  this.bulletCoolDownMax = 15 ;
  this.alive = true;
}

// controller()
//
// controles the two ships based on the position of the player and each ships priority
Ship.prototype.controller  = function () {
//=========NEED TO UPDATE=============//
// maybe the ships should move more interestingly
// Also I have a glitch when the player's speed is brought to the absolute lowest
// limit, sometimes the controls will reverse and the hearts will begin making him faster
// cool bug, switches the game up but still not per my designs. 
if (keyIsDown(32)){
	this.playtime = true;
}
// if ship is shootstyle and player.x is beyond half width turn to the left
if (this.shootstyle === true && this.playtime === true){
  if (player.x > canvas2Width/2) {
    this.angle -= this.turningSpeed;
	this.angle = constrain(this.angle,-2.6,2.6);
	// reverse the turningspeed if the ship reaches maximum angle
	// creates wobbled shooting
	if(this.angle === -2.6){
		this.turningSpeed = -this.turningSpeed;
	} else if (this.angle === 2.6 ){
		this.turningSpeed = -this.turningSpeed;
	}
  }
  // if player.x is less then half width turn to the right
  else if (player.x < canvas2Width/2) {
    this.angle += this.turningSpeed;
	this.angle = constrain(this.angle,2,5);
	// wobble effect
	if (this.angle === 2){
		this.turningSpeed = -this.turningSpeed;
	} else if (this.angle === 5){
		this.turningSpeed = -this.turningSpeed;
	}
  }
}
// if ship is shootplayer and player position is above or below half height
// ship will turn facing up or down and move left and right across the screen
if (this.shootplayer === true && this.playtime === true){
this.x += this.acceleration;
  if (player.y > canvas2Height/2) {
	this.angle += this.turningSpeed;
	this.angle = constrain(this.angle,0,1.6);
  }
  else if (player.y < canvas2Height/2) {
	this.angle -= this.turningSpeed;
	this.angle = constrain(this.angle,-1.6 ,0);
  }
  // if ship goes all the way to one side then reverse acceleration
  // creates back and forth across screen
  if (this.x === width || this.x === 720){
	  this.acceleration = -this.acceleration;
  }
}
  // This controles the intensity of the firing rate
  // The bullet cooldown determines when you can fire again (when it's at 0)
  this.bulletCoolDown -= 0.2;
  // Constrain the bullet cooldown to avoid weird numbers (Thank you Pippin)
  this.bulletCoolDown = constrain(this.bulletCoolDown - 1,0,this.bulletCoolDownMax)
  //==========NEEDS UPDATING====================//
  // bullets will begin being shot after dialogue
  if (this.bulletCoolDown === 0 && this.playtime === true) {
    // Create a bullet as an object with position and velocity
    var newBullet = {
      // Bullets should start at the location of the ship firing
      x: this.x,
      y: this.y,
      // And they should have a velocity matching the ships' angle
      // but should travel at maximum speed (thank you pippin)
      vx: this.maxSpeed * cos(this.angle),
      vy: this.maxSpeed * sin(this.angle)
    }
    // Add the bullet to the bullets array of the ship
    this.bullets.push(newBullet);
    // Set the cooldown to max so it can start counting down
    this.bulletCoolDown = this.bulletCoolDownMax;
  }
}

// update()
//
// Updates the ship's position based on velocity.
Ship.prototype.update = function () {
  // Calculate velocity based on speed and trig (e.g. polar coordinates)
  var vx = this.speed * cos(this.angle);
  var vy = this.speed * sin(this.angle);

  // Update position
  this.x += vx;
  this.y += vy;
}

// updateBullets()
//
// Move all the bullets fired by this ship
// Check if they hit the other ship and update its size
Ship.prototype.updateBullets = function (paddle) {
  // Go through all the bullets of this ship
  // (Note this is hugely inefficient since it still looks at bullets that were fired long ago,
  // we should really remove those from the array!)
  for (var i = 0; i < this.bullets.length; i++) {
    // Get the bullet based on its index
    var bullet = this.bullets[i];

    // Update its position based on velocity
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;

    // Check if this bullet touches the paddle
    if (bullet.x > paddle.x - paddle.w && bullet.x < paddle.x + paddle.w) {
      if (bullet.y > paddle.y - paddle.h/2 && bullet.y < paddle.y + paddle.h/2) {
        // If so make the bullets drop to the floor & slow down the paddle
		bullet.vx = 0;
		bullet.vy = 0;
		bullet.y = canvas2Height - 10;
		paddle.speed -= 1;
      }
    }
	//=========NEED TO UPDATE=====================//
	//need to get rid of bullets fired after they leave the playing area
	// this will allow us to limit the number of bullets on screen at any time
	// as well maybe play with special bullets that kill you and reset game
	if (bullet.x > width || bullet.x < 720 || bullet.y < 0 || bullet.y > canvas2Height) {
		bullet.vx = 0;
		bullet.vy = 0;
		bullet.x = 10;
		bullet.y = 10;
	// 	this.bullets.pop();
	// 	console.log(this.bullets.length)
	}
  }
}

// display()
//
// Display the ship and its bullets on the screen
Ship.prototype.display = function () {
  // Translate and rotate based on position and angle
  // draw the ship image
  push();
  imageMode(CENTER);
  translate(this.x,this.y);
  rotate(this.angle);
  image(this.shipImage,0,0,this.size,this.size);
  pop();

  // Go through all the bullets and display the image for each one
  for (var i = 0; i < this.bullets.length; i++) {
    push();
    image(bulletImage,this.bullets[i].x,this.bullets[i].y,10,10);
    pop();
  }
}
