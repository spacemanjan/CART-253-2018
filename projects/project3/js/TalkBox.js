function TalkBox( x, y, size, str ) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.talking = 1;
	this.strings = str;
	this.active = true;
	this.resetTalk = 1;
}


TalkBox.prototype.update = function() {
console.log(this.string, this.talking);
	if ( this.active === true ) {
		if ( keyWentDown( 32 ) ) {
			this.talking += 1;
		}
	}
	if ( glitch.level1 === false ) {
		if ( millis() >= 2000 ) {
			this.string = 1;
		}
	}
	if ( this.string === 1 && this.talking === 8 ) {
		this.active = false;
	}
	if ( this.string === 3 ) {
		this.active = true;
	}
	if ( this.string === 3 && this.talking === 10 ) {
		this.active = false;
	}
	if ( this.string === 5 ) {
		this.active = true;
	}
	if ( this.string === 5 && this.talking === 9 ) {
		this.active = false;
	}
	if ( this.string === 7 ) {
		this.active = true;
	}
	if (this.string === 7 && this.talking === 7){
		this.active = false;
	}
	if (this.string === 9) {
		this.active = true;
	}
	if (this.string === 9 && this.talking === 2){
		this.active = false;
	}
}


TalkBox.prototype.display = function() {
	if (this.string === 2){
		this.talking = 1;
	}
	if (this.string === 4){
		this.talking = 1;
	}
	if (this.string === 6){
		this.talking = 1;
	}
	if (this.string === 8){
		this.talking = 1;
	}
	if ( this.active === true ) {
		if ( this.string === 1 ) {
			if ( this.talking === 1 ) {
				animation( scene1, this.x, this.y );
			} else if ( this.talking === 2 ) {
				animation( scene2, this.x, this.y );
			} else if ( this.talking === 3 ) {
				animation( scene3, this.x, this.y );
			} else if ( this.talking === 4 ) {
				animation( scene4, this.x, this.y );
			} else if ( this.talking === 5 ) {
				animation( scene5, this.x, this.y );
			} else if ( this.talking === 6 ) {
				animation( scene6, this.x, this.y );
			} else if ( this.talking === 7 ) {
				animation( scene7, this.x, this.y );
			}
		}
		if ( this.string === 3 ) {
			if ( this.talking === 1 ) {
				animation( oldman1, this.x, this.y );
			} else if ( this.talking === 2 ) {
				animation( oldman2, this.x, this.y );
			} else if ( this.talking === 3 ) {
				animation( oldman3, this.x, this.y );
			} else if ( this.talking === 4 ) {
				animation( loveruno1, this.x * 4-80, this.y );
			} else if ( this.talking === 5 ) {
				animation( loverduo1, this.x * 4-80, this.y );
			} else if ( this.talking === 6 ) {
				animation( loveruno2, this.x * 4-80, this.y );
			} else if ( this.talking === 7 ) {
				animation( loverduo2, this.x * 4-80, this.y );
			} else if ( this.talking === 8 ) {
				animation( couple1, this.x * 4-80, this.y );
			} else if ( this.talking === 9 ) {
				animation( couple2, this.x * 4-80, this.y );
			}
		}
		if ( this.string === 5 ) {
			if ( this.talking === 1 ) {
				animation( couple3, this.x * 4-80, this.y );
			} else if ( this.talking === 2 ) {
				animation(loverunohappy, this.x * 4-80, this.y );
			} else if ( this.talking === 3 ) {
				animation( balllead1, this.x * 4-80, this.y+290 );
			} else if ( this.talking === 4 ) {
				animation( brothers, this.x * 4-80, this.y+290 );
			} else if ( this.talking === 5 ) {
				animation( balllead2, this.x * 4-80, this.y+290 );
			} else if ( this.talking === 6 ) {
				animation( brothers2, this.x * 4-80, this.y+290 );
			} else if ( this.talking === 7 ) {
				animation( balllead3, this.x * 4-80, this.y+290 );
			} else if ( this.talking === 8 ) {
				animation( balllead4, this.x * 4-80, this.y+290 );
			}
		}
		if (this.string === 7){
			if ( this.talking === 1 ) {
 			   animation( balllead5, this.x * 4-80, this.y+290 );
 		   } else if ( this.talking === 2 ) {
 			   animation( ballbro1, this.x * 4-80, this.y+290 );
 		   } else if ( this.talking === 3 ) {
 			   animation( ballbro2, this.x * 4-80, this.y+290 );
 		   } else if ( this.talking === 4 ) {
 			   animation( ballbro3, this.x * 4-80, this.y+290 );
 		   } else if ( this.talking === 5 ) {
 			   animation( balllead6, this.x * 4-80, this.y+290 );
 		   } else if ( this.talking === 6 ) {
 			   animation( pup, this.x, this.y+290 );
 		   }
		}
		if ( this.string === 9 ) {
			if ( this.talking === 1 ) {
			   animation( happypup, this.x , this.y+290 );
		   }
		}
	}
}
