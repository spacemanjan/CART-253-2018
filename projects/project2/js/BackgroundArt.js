// BackgroundArt
//
// Class which picks from an array which starry background will be used.
// Impoves the visuals of the game.
// declare our 2 variables.
var starryIndex;
var starrySky;

// BackgroundArt constructor
//
// sets the properties for our background.
function BackgroundArt(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}

//starBackg.selection();
//
//picks at random from the array stars declared in the script.js
//sets the starrySky variable as the randomly chosen background.
BackgroundArt.prototype.selection = function() {
  starryIndex = floor(random(0, stars.length));
  starrySky = stars[starryIndex];
}

// BackgroundArt.display()
//
// Displays starry space background.
BackgroundArt.prototype.display = function() {
  image(starrySky, this.x, this.y, this.w, this.h);
}
