let sliderBgR;
let sliderBgG;
let sliderBgB;

function setup() {
  createCanvas(400, 500);
  sliderBgR = document.getElement.getElementById('bg-r');
  sliderBgG = document.getElement.getElementById('bg-g');
  sliderBgB = document.getElement.getElementById('bg-b');
}

/*
let bgG = 100;
let bgB = 100;

function setup() {
  //createCanvas(400, 500);
}
function draw() {
  background(bgR,bgG,bgB);
}

function changeBackground() {
  let bgR = random(255);
  let bgB = random(255);
  let bgG = random(255);
  background(bgR,bgG,bgB);
}

function drawCircle() {

}
*/


console.log("Loaded!");

for (let i=0; i<110; i++) {
  let newBtn = document.createElement('button');

  newBtn.style.width = '50px';
  newBtn.style.height = '50px';
  newBtn.style.margin = '10px';

  //'addEventListener' to trigger an event (on click) by attaching a function to it
  // create a function within the addEventListener
  newBtn.addEventListener('click', function() {
    let body = document.body;
    let r = Math.floor(Math.random()*255);
    let g = Math.floor(Math.random()*255);
    let b = Math.floor(Math.random()*255);
    //random number from 0-0.9999, can multiply to amplify the number
    body.style.backgroundColor =
    "rgb(" + r + "," + g + "," + b + ")";
  });
  document.body.appendChild(newBtn);
}


/*create a function seperately
function change() {
  let body = document.body;
  let r = Math.floor(Math.random()*255);
  let g = Math.floor(Math.random()*255);
  let b = Math.floor(Math.random()*255);
  //random number from 0-0.9999, can multiply to amplify the number
  body.style.backgroundColor =
  "rgb(" + r + "," + g + "," + b + ")";
} */

// for (let i=0; i<10; i++) {
//   let newDiv = document.createElement('div');
//   //change layout
//   newDiv.style.float = 'left';
//
//   newDiv.style.backgroundColor = 'gray';
//   newDiv.style.width = '100px';
//   newDiv.style.height = '100px';
//   newDiv.style.margin = '10px';
//   document.body.appendChild(newDiv);
// }
