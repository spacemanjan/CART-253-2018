// Visuals
//
// A class which defines how the game displays score &
// alters the game visuals depending on the score.

// Visual Constructor
//
// tracks each paddles score and total score as well as if they were the last to score
function Visuals(leftScore,rightScore,totalScore,rightWinning,leftWinning) {
  this.leftScore = leftScore;
  this.rightScore = rightScore;
  this.totalScore = totalScore;
  this.rightWinning = rightWinning;
  this.leftWinning = leftWinning;
}
// scoreBoard();
//
// this method is displaying the score of whoever scored last
// it also manages size and placement of the text
Visuals.prototype.scoreBoard = function() {
  if (this.leftWinning == true) {
    if (this.leftScore< 10) {
    fill(0,0,random(100,255),50);
    textSize(400);
    text(this.leftScore,40,height - 90);
    }
    if (this.leftScore >= 10) {
    fill(0,0,random(100,255),50);
    textSize(300);
    text(this.leftScore,-10,height - 130);
    }
  }
  if (this.rightWinning == true) {
    if (this.rightScore < 10) {
    fill(random(100,255),0,0,50);
    textSize(400);
    text(this.rightScore,360,height - 90);
    }
    if (this.rightScore >= 10) {
    fill(random(100,255),0,0,50);
    textSize(300);
    text(this.rightScore,310,height - 130);
    }
  }
}
// colorManager();
//
// if a player scores their side become active with color
Visuals.prototype.colorManager = function() {
  if (this.leftWinning == true) {
    fill(random(100,255),0,0);
    rect(width/2,0,-width/2,height);
  }
  if (this.rightWinning == true) {
    fill(0,0,random(100,255));
    rect(width/2,0,width/2,height);
 }
}
// effectsManager();
//
// makes rgb paddles appear and move when activated with a point
Visuals.prototype.effectsManager = function(paddle) {

  if (paddle.latestPoint == true) {
    noStroke();
    if (paddle.score >= 1) {
      fill(random(0,255),0,0,100);
      rect(paddle.x + random(-10,10), paddle.y + random(-10,10), paddle.w, paddle.h);
      fill(0,random(0,255),0,100);
      rect(paddle.x + random(-10,10), paddle.y + random(-10,10), paddle.w, paddle.h);
      fill(0,0,random(0,255),100);
      rect(paddle.x + random(-10,10), paddle.y + random(-10,10), paddle.w, paddle.h);
    }
  }
}
