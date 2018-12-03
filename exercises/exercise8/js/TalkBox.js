


function TalkBox( x, y, size, talking, str ) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.talking = talking;
	this.strings = str;
}


TalkBox.prototype.update = function() {
if (keyIsDown(32)){
	talking = true;
}
}


TalkBox.prototype.display = function() {
if (talking = true){
animation(s1a1,this.x,this.y);
text("Whats good homie",100,100);
}
}
