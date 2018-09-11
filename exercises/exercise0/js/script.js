/*****************

Spiritual Self-portrait
Yann-Maurice McNiven

This is a spiritual self-portrait of myself.
Assignment 0 for CART 253-Pippin Barr

******************/

// setup()
//
// Description of setup

function setup() {
  //frame
  createCanvas(500,500);
  background(0,0,0);
    //background
    fill(226,255,231);
    noStroke();
    rect(75,75,350,350);

  //body
  //triangle (left,right,top)
  fill(134,78,84);
  triangle(150,425,350,425,250,125);
    //shading
    fill(178,105,112);
    triangle(165,425,335,425,250,125);
  //tie
  fill(40,40,45);
  triangle(200,275,300,275,250,365);
  stroke(0);
  strokeWeight(2.5);


  //head
  fill(191,131,137);
  noStroke(0);
  ellipse(250,230,200,175);
    // shading
    fill(255,175,183);
    ellipse(250,230,188,175);
  //hair bun 1
  fill(191,131,137);
  ellipse(250,160,100,100);
    // shading
    fill(255,175,183);
    ellipse(250,165,95,100);
  //hair bun 2
  fill(191,131,137);
  ellipse(250,110,50,50);
    // shading
    fill(255,175,183);
    ellipse(250,115,45,50);

  //face
  //curve (x1,y1,x2,y2,x3,y3,x4,y4)
  fill(255,255,255);
  stroke(0);
  strokeWeight(3.5);
  curve(205,230,235,220,265,220,295,230);
  ellipse(205,230,60,60);
  ellipse(295,230,60,60);
    //eyes
  strokeWeight(10);
  line(205,225,205,235);
  line(295,225,295,235);
    //smile
  curve(205,230,235,260,265,260,295,230);

}


// draw()
//
// Description of draw()

function draw() {

}
