// Visuals
//
// A class which defines how the game displays scoring &
// alters the game visuals depending on the score.
// tracks current winner

// Visual Constructor
//
// tracks each paddles score and total score as well as if they were the last to score
function Visuals(finaleBalls) {
  this.leftScore = 0;
  this.rightScore = 0;
  this.totalScore = 0;
  this.winning = 'neither';
  this.finaleBalls = finaleBalls || 1000;
}
// visual.update();
//
// takes in data from paddles and updates the data, also tracks winner
// also calculates the totalscore
Visuals.prototype.update = function(rightScore, leftScore) {
  this.leftScore = leftScore;
  this.rightScore = rightScore;
  this.totalScore = this.leftScore + this.rightScore;
  if (this.rightScore > this.leftScore) {
    this.winning = 'right';
  } else if (this.rightScore < this.leftScore) {
    this.winning = 'left';
  } else {
    this.winning = 'neither';
  }
}


// scoreBoard();
//
// this method is displaying the score of whoever scored last
// it also manages size and placement of the text
Visuals.prototype.scoreBoard = function() {
  switch (this.winning) {
    case 'left':
      if (this.leftScore < 10) {
        fill(0, 0, random(100, 255), 50);
        textSize(400);
        text(this.leftScore, 40, height - 90);
      }
      if (this.leftScore >= 10) {
        fill(0, 0, random(100, 255), 50);
        textSize(300);
        text(this.leftScore, -10, height - 130);
      }
      break;
    case 'right':
      if (this.rightScore < 10) {
        fill(random(100, 255), 0, 0, 50);
        textSize(400);
        text(this.rightScore, 360, height - 90);
      }
      if (this.rightScore >= 10) {
        fill(random(100, 255), 0, 0, 50);
        textSize(300);
        text(this.rightScore, 310, height - 130);
      }
      break;
    case 'both':
      if (this.totalScore < 20) {
        fill(random(100, 255), 0, 0, 50);
        textSize(400);
        text(this.rightScore, 360, height - 90);
        text(this.leftScore, 40, height - 90);
      }
      if (this.totalScore > 20) {
        fill(random(100, 255), 0, 0, 50);
        textSize(300);
        text(this.rightScore, 310, height - 130);
        text(this.leftScore, -10, height - 130);
      }
      break;
  }
  // GAME OVER PROTOCOL

  if (this.totalScore >= 20) {
    endGame = true;
  }
}
// colorManager();
//
// if a player scores their side become active with color
Visuals.prototype.colorManager = function() {
  if (this.winning === 'left') {
    fill(random(100, 255), 0, 0);
    rect(width / 2, 0, -width / 2, height);
  }
  if (this.winning === 'right') {
    fill(0, 0, random(100, 255));
    rect(width / 2, 0, width / 2, height);
  }
}
// effectsManager();
//
// makes rgb paddles appear and move when activated with a point
Visuals.prototype.effectsManager = function(paddle) {
  if (paddle.latestPoint == true) {
    noStroke();
    switch (paddle.score) {
      case (paddle.score >= 18):
        fill(0, 0, random(0, 255), 175);
        rect(paddle.x + random(-10, 10) * paddle.score, paddle.y + random(-10, 10) * paddle.score, paddle.w * (paddle.score / 3), paddle.h);
      case (paddle.score >= 10):
        fill(0, random(0, 255), 0, 100);
        rect(paddle.x + random(-10, 10), paddle.y + random(-10, 10) * paddle.score, paddle.w, paddle.h);
        break;
      case (paddle.score >= 4):
        fill(random(0, 255), 0, 0, 150);
        rect(paddle.x + random(-10, 10) * paddle.score, paddle.y + random(-10, 10), paddle.w, paddle.h);
        break;
    }
  }
}
// gameOver();
//
// if total score is 50 the game is over, triggers visual effects and displays score.
Visuals.prototype.gameOver = function(ball) {
  this.winning = 'both';
  var gameOverBalls = [];
  for (var x = 0; x < this.finaleBalls; x++) {
    gameOverBalls.push(new Ball(width / 2, height / 2, 5 * random(-10, 10), 5 * random(-10, 10), 10, 5));
  }
  for (var i = 0; i < this.finaleBalls; i++) {
    gameOverBalls[i].update();
    gameOverBalls[i].display();
  }
}
