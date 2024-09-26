let tvOn = false; 
let mouseWasPressed = false; 
let animCounter, rotateTracker, rotateConstant;
let screenX, screenY, screenWidth, screenHeight, screenCenterX, screenCenterY; 


let upr = true;
let upg = true;
let upb = true;
let r = 105;
let g = 55;
let b = 125;

function setup() {
  createCanvas(1000, 800);
  animCounter = 0;
  rotateTracker = 0; 
  rotateConstant = 0.4; 
  
  // tv screen size setup
  screenX = 335;
  screenY = 210;
  screenWidth = 380;
  screenHeight = 280;
  screenCenterX = (screenX + (screenWidth / 2)); 
  screenCenterY = (screenY + (screenHeight / 2));
}

function draw() {
  background('#F2F1EB');
  for (let x = 0; x < width; x+= 40){
    for (let y = 0; y < height; y += 40)
      square(x, y, 5);
  }

  //TV CODE
  
  //left leg
  noStroke();
  fill('#26355D');
  ellipse(350, 525, 25, 150);
  
  //right leg
  fill('#26355D');
  ellipse(700, 525, 25, 150);
  
  //tv shell
  stroke('#e87f58');
  strokeWeight(2);
  fill('#FF9874');
  rect(300, 175, 450, 390, 10);
  
  //tv screen outline
  stroke(220, 118, 51);
  strokeWeight(7);
  fill('#26355D');
  rect(325, 200, 400, 300, 9);

  //tv screen
  noStroke();
  fill('#637A9F');
  rect(335, 210, 380, 280, 10);
  
  //right attenae
  stroke(0);
  strokeWeight(6.5);
  line(555, 150, 710, 45);
  stroke(234, 236, 238);
  strokeWeight(6);
  line(555, 150, 710, 45);
  
  //left attenae
  stroke(0);
  strokeWeight(6.5);
  line(400, 10, 520, 170);
  stroke(234, 236, 238);
  strokeWeight(6);
  line(400, 10, 520, 170);
  
  //attenae mount
  push();
  translate(525, 174);
  rotate(PI);
  fill(235, 237, 239);
  stroke(0);
  strokeWeight(.25)
  arc(0, 0, 80, 80, 0, PI);
  pop();
  
  
  //REMOTE CODE
  
  //remote body
  push();
  noStroke();
  translate(500, 0);
  rotate(QUARTER_PI/2);
  fill('#132043');
  rect(-125, 650, 125, 280, 10);
  pop();
  
  //power button
  noStroke();
  fill('#FF5F00');
  circle(150, 590, 30);
  
  //slow button
  noStroke();
  fill('#FFC55A');
  circle(190, 605, 30);
  
  //idea: have active buttons turn darker on hover to show user which buttons are active and which ones are just for aesthetics
  //idea: press power button and have new rectangle grow to fit tv screen rectangle shape in a lighter color to simulate 'turning on' effect?
  
  
  // if mouse is hovering over power button
  if ((150 - 15 < mouseX) && (mouseX < 150 + 15) && 
      (590 - 15 < mouseY) && (mouseY < 590 + 15)) {

    strokeWeight(4);
    stroke('#d15c17');
    fill('#bd2c08');
    circle(150, 590, 25);
    
    if (mouseIsPressed && 
        (mouseWasPressed == false) // checks if it's a new click
         ){
      if (tvOn) {
        //turn tv off and reset counters
        tvOn = false;
        animCounter = 0;
        rotateTracker = 0; 
        rotateConstant = 1; 
      }
      else {
        //turn tv on
        tvOn = true;
      }
    }
  }
  

  
  // if mouse is hovering over slow button
  if ((190 - 15 < mouseX) && (mouseX < 190 + 15) && 
      (605 - 15 < mouseY) && (mouseY < 605 + 15)){
    
    strokeWeight(4);
    stroke('#e3ab44');
    fill('#c28336');
    circle(190, 605, 25);
    
    //if slow button is clicked
    if (mouseIsPressed && (mouseWasPressed == false)) { // checks if it's a new click
      rotateConstant = rotateConstant*0.8; 
    }
  }
  
  //set r g b of monitors
  if (upr==true) {
    r++;
    if (r>=255) upr = false;
  }
  else if (upr==false) {
    r--;
    if (r<=55) upr = true;
  }
  
  if (upg==true) {
    g++;
    if (g>=155) upg = false;
  }
  else if (upg==false) {
    g--;
    if (g<=155) upg = true;
  }
  
  if (upb==true) {
    b=b*9;
    if (b>=255) upb = false;
  }
  else if (upb==false) {
    b--;
    if (b<=0) upb = true;
  }
  
  //if tv is on, draw yellow screen
  if (tvOn) {
    //tv screen ON
    noStroke();
    fill(r,g,b);
    rect(screenX, screenY, screenWidth, screenHeight, 10);
    
    playAnimation(); 
  }
  
  
  //store information on whether mouse was pressed
  if (mouseIsPressed) {
     mouseWasPressed = true;
  }
  else {
    mouseWasPressed = false;
  }
}


function playAnimation() {
  
  push(); 
  translate(screenCenterX, screenCenterY); 
  rotate(rotateTracker*rotateConstant); 
  fill("white");
  for (let i = 0; i < 10; i++){
    square(0 + i*animCounter*0.04 + mouseX/100, 
           0 + i*animCounter*0.04, 5);
    square(0 + i*animCounter*0.04 + mouseX/100, 
           0 - i*animCounter*0.04, 5);
    square(0 - i*animCounter*0.04 + mouseX/100, 
           0 + i*animCounter*0.04, 5);
    square(0 - i*animCounter*0.04 + mouseX/100, 
           0 - i*animCounter*0.04, 5);
  }
  pop(); 

  
  
  rotateTracker++; 
  if (animCounter < 200) animCounter++;
}