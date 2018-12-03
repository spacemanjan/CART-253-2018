

function TalkBox( x, y, size, str ) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.talking = 0;
	this.strings = str;
}


TalkBox.prototype.update = function() {
if (paddle.score === 5) {
	this.talking = 1;
	}
if (keyDown(32)){
	this.talking += 1;
}
}


TalkBox.prototype.display = function() {
if (this.talking === 1) {
animation(s1a1,this.x,this.y);
} else if (this.talking === 2){
animation(s1a2,this.x,this.y);
} else if (this.talking === 3){
animation(s1a3,this.x,this.y);
} else if (this.talking === 4){

} else if (this.talking === 5){

} else if (this.talking === 6){

} else if (this.talking === 7){

}
}
