
let dialogue;
let strings;
var

function preload() {
	strings = loadJSON("js/strings.json")
}

// Creates the ball and paddles
function setup() {
	//Creates Full Game Canvas
	createCanvas( 1440, 790 );
	dialogue = new Dialogue(30, 30, 400, true, strings);
}


// draw()
//
// Handles input, updates all the elements, checks for collisions
// and displays everything.
function draw() {
	dialogue.display();
}

function keyPressed () {
	switch (key) {
		case 'i': dialogue.setStage('introstage'); break;
		case 'n': dialogue.setStage('nice'); break;
		default: dialogue.setStage('final'); break;
	}
}

function mousePressed () {
	dialogue.findNextString();
}
