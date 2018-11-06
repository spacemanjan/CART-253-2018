// ScoreManager
//
// ScoreManager is the class which displays the players score using a while loop
// if a point is used to shoot something it will disappear.

// ScoreManager constructor
//
// sets the properties for the starting x & y, the size of the point and the spacing
function ScoreManager(x, y, size, spacing) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.spacing = spacing;
}

// left or right paddleScore.Update()
//
// declares a variable of drawn points used in the while loop
ScoreManager.prototype.update = function(paddle) {
  var pointsDrawn = 0;
  var x = this.x;
  var y = this.y;
  while (pointsDrawn < paddle.score) {
    fill(66, 244, 232);
    rect(x, y, this.size, this.size);
    x += this.spacing
    pointsDrawn++;
  }
}
