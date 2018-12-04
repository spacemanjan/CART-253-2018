

function TalkBox( x, y, size, str ) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.talking = 1;
	this.strings = str;
	this.active = true;
}


TalkBox.prototype.update = function() {
if (glitch.level1 === false){
if (millis()>= 2000){
	this.string = 1;
}
if (this.active === false){
	this.talking = 1;
}
}
if (keyWentDown(32)) {
	this.talking += 1;
}
if (this.string === 1 && this.talking === 8 ) {
	this.active = false;
}
if (this.string === 2) {
	this.active = true;
}
if (this.string === 2 && this.talking === 4){
	this.active = false;
}
}


TalkBox.prototype.display = function() {
if (this.active === true){
if (this.string === 1){
if (this.talking === 1) {
animation(scene1,this.x,this.y);
} else if (this.talking === 2){
animation(scene2,this.x,this.y);
} else if (this.talking === 3){
animation(scene3,this.x,this.y);
} else if (this.talking === 4){
animation(scene4,this.x,this.y);
} else if (this.talking === 5){
animation(scene5,this.x,this.y);
} else if (this.talking === 6){
animation(scene6,this.x,this.y);
} else if (this.talking === 7){
animation(scene7,this.x,this.y);
} else if (this.talking === 8){
}
} if (this.string === 2){
if (this.talking === 1) {
animation(oldman1,this.x,this.y);
} else if (this.talking === 2){
animation(oldman2,this.x,this.y);
} else if (this.talking === 3){
animation(oldman3,this.x,this.y);
}
} if (this.string === 3){

} if (this.string === 4){

}
}
}
