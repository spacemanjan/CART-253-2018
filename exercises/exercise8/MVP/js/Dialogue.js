
// Sets the properties with the provided arguments
function Dialogue( x, y, size, talking, str ) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.talking = talking;
	this.strings = str;
	this.stage = "introstage";
	this.currentString = "default";
	this.stringIndex = -1;
	this.currentChoice = null;
}

Dialogue.prototype.findNextString = function () {
	this.stringIndex += 1;
	if (typeof this.stage == 'string' ) this.setStage(this.stage); // set initial stage to an object
	console.groupCollapsed('%cFind Next String 😇', 'color: #bada55');
	console.log('stage: ', this.stage);

	let stageLength = this.stage.strings.length; // how many lines of dialogue total?
	console.log('stage length: ', stageLength);

	if (this.stringIndex < stageLength) {
		let stringname = this.stage.strings[this.stringIndex].ID;
		this.changeString(stringname);
	} else {
		// manual override
		this.currentChoice = 'A'; // remove hardcode
		switch (this.stage.stageID) {
			case 'introstage': this.setStage('nice'); break;
			default: this.setStage('introstage'); break;
		}
		// let goto = this.strings.stages.filter( obj => {
		// 	return obj.leadsTo === this.currentChoice;
		// })
		// this.setStage(goto[0]);
		this.stringIndex = -1;
		console.log('changing stage to ', this.stage.stageID);
	}
	console.groupEnd();
}

Dialogue.prototype.setStage = function( stageID ) {
	var stage = this.strings.stages.filter( obj => {
		return obj.stageID === stageID;
	} );
	console.groupCollapsed('%csetStage', 'color: orange')
	console.log('filtered array: ', stage);

	if (stage.length > 1) {
		console.log('more than one stage with that name');
		let branch = stage.filter(s => {
			return s.branch === this.currentChoice;
		})
		this.stage = branch[ 0 ];
	} else {
		console.log('only one stage with that name');
		this.stage = stage[ 0 ];
	}
	console.log('stage now set to', this.stage);
	console.groupEnd();
}

Dialogue.prototype.setString = function( stringID ) {
	var currentS = this.stage.strings.filter( obj => {
		return obj.ID === stringID;
	} );

	// if no stringID supplied
	if ( !stringID ) {
		console.log( "Ain't nuthin' 'ere, boy. 🤠" )
		return;
	} else {
		console.log( currentS[ 0 ] )
		this.currentString = currentS[ 0 ].string; // should be 'test'
		console.log(this.currentString);
		if ( !currentS[ 0 ] ) {
			console.log( 'no string found by the ID of ' + stringID );
		}
	}
}

Dialogue.prototype.display = function( id ) {
	var speech = this.currentString;

	if ( this.getStringObj().choices) {
		speech +=  this.getStringObj().choices[1].string
		// implement something that shows both choices + sends the selected choices
		// to this.currentChoice
	}
	push();
	fill( 255, 237, 178 );
	rect( this.x, this.y, this.size, this.size / 3 );
	fill( 0 );
	text( speech, 150, this.y + 100 );
	pop();
}

// UTILITY
Dialogue.prototype.getStringObj = function () {
	if (this.stringIndex === -1) { // just solves the zero index problem
		return 'noot'
	} else {
		return this.stage.strings[this.stringIndex]
	}
}
