
let playing = false;
let fingers;
let buttonVid; 


let carrier; // this is the oscillator we will hear
let modulator;
let song;
let song2;
let button; 

let time=0; 

function preload() {
  // Load a sound file
  song = loadSound('whereandwhen.mp3');
  song2 = loadSound('whereandwhen.mp3');
}


function setup() {
  createCanvas(windowWidth, windowHeight);


  fingers =createVideo(['totals.mov']);
  buttonVid =createButton('play');
  buttonVid.position(width/2,10);
 buttonVid.mousePressed(toggleVid);
fingers.size(width/2,height);
  
  button = createButton('start interaction');
  button.position(width/3,10);
  button.mousePressed(playsounds);

  carrier = new p5.Oscillator(); // connects to master output by default
  carrier.freq(240);//340
  carrier.amp(0);
  // carrier's amp is 0 by default, giving our modulator total control

  carrier.start();

  modulator = new p5.Oscillator('triangle');
  modulator.disconnect(); // disconnect the modulator from master output
  modulator.freq(5);
  modulator.amp(1);
  modulator.start();

  // Modulate the carrier's amplitude with the modulator
  // Optionally, we can scale the signal.

  carrier.amp(modulator.scale(-1, 1, 1, -1));
  // song.loop();
  // song2.loop();

 
}


function toggleVid(){
  if (playing){
    fingers.pause();
    buttonVid.html('play');
  }else{
    fingers.loop();
    buttonVid.html('pause');
  
  }
  playing =!playing;
  
}

function draw() {
background(250);
 let newWidth; 
 newWidth= width/2; 
 push();
  
    // fingers.time(time);
    image(fingers,0,0,width/2,height);
  
  pop();
  push()
    translate(width/2,0);
    blendMode(BLEND);
    // background(250);
    blendMode(MULTIPLY);
    noStroke();
    push();
      //care
      translate(newWidth/3,height/3);
      fill(255,173,189);
      mynoisycir(200,15,20,300);
    pop();
      //stress
    push();
      translate(2*newWidth/3,height/3);
      fill(228,122,71);
      mynoisycir(200,40,40,20);
    pop();
      //explore
    push();
      translate(newWidth/2,2*height/3);
      fill(141,237,109);
      mynoisycir(400,200,10,500);
    pop();
    
    // // Set the volume to a range between 0 and 1.0
    // let volume = map(mouseX, 0, width, 0, 1);
    // volume = constrain(volume, 0, 1);
    // song.amp(volume);

    // Set the rate to a range between 0.1 and 4
    // Changing the rate alters the pitch
    let speed = map(mouseY, height-10,10, -1.5, 1.5);
    // // speed = constrain(speed, 0.01, 4);
    song.rate(speed);
    let speed2 = map(mouseX, newWidth,width, -2.5, 2);
    // speed = constrain(speed, 0.01, 4);
    song2.rate(speed2);
    
    let modFreq = map(mouseX, height,0,20,0);
    modulator.freq(modFreq);
  pop();
  // let modAmp = map(mouseX, 0, width, 0, 1);
  // modulator.amp(modAmp, 0.01); // fade time of 0.1 for smooth fading
 
  
  
}

function mynoisycir(fcm,vNnum,sm,nm){ 
  push();
	rotate(frameCount/fcm);
	let dr = TWO_PI/vNnum;
	beginShape();
	for(let i = 0; i  < vNnum + 3; i++){
		let ind = i%vNnum;
		let rad = dr *ind;
      
		let r = height*0.2 + noise(frameCount/nm + ind) *       height*0.1 + sin(frameCount/sm + ind)*height*0.02;
		curveVertex(cos(rad)*r, sin(rad)*r);
	}
	endShape();
	pop();
} 

function mouseDragged() {
  // Send the mouse data to the server
  
}

function mousePressed(){

   if (mouseX<width/2 && mouseY<height/2){
    time =random(0,90);
   }
   else if (mouseX>width/2 && mouseY< height/2){
   
   time= random(90,180);
   }
   else if (mouseY>height/2) {
    time = random(180,fingers.duration()); //(180, total.duration());
   }
   fingers.time(time);
    // total.jump(time);
}

function playsounds(){
  song.loop();
  song2.loop();
}


