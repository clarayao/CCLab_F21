const MAX_MELT_AMOUNT = 650;
const MAX_EMISSION_AMOUT = 391435;
let bigIceberg;

let emission = 0;

let meltTarget = MAX_MELT_AMOUNT;
let meltAmount = 0;
let isMelting = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  bigIceberg = new Iceberg(width*2/3, height, 0, 0);
}

function draw() {
  background(214, 234, 248);
  // display text
  // fill(0, 0, 255);
  // text(meltAmount, 10, 20);
  // meltAmount based on emission
  if (isMelting == true) {
    if (meltAmount < meltTarget) {
      // make it melted down
      bigIceberg.melt1();
      if (meltAmount > 225) {
        bigIceberg.melt2();
      }
      meltAmount++;
    } else {
      // limit
      meltAmount = meltTarget
    }
  }

  // water
  let waterlevel = map(meltAmount, 0, MAX_MELT_AMOUNT, 1.0, 0.05);
  drawBackground( waterlevel );

  // iceberg
  bigIceberg.a = 255;
  bigIceberg.display();
  // reflection
  push();
  translate(0, height * 4/3);
  scale(1.0, -1.0);
  bigIceberg.a = 100;
  bigIceberg.display();
  pop();

}

function generateIceberg() {
  isMelting = true;
  // set the melting value
  meltTarget = map(emission, 0, MAX_EMISSION_AMOUT, 0, MAX_MELT_AMOUNT);
  // reset
  bigIceberg = new Iceberg(width*2/3, height, 0, 0, 255);
  meltAmount = 0;
  emission = 0;
}


class Iceberg {
  constructor(w, h, x, y, a) {
    this.w = w;
    this.h = h;
    this.x = x;
    this.y = y;
    this.a = 255;

    //Dark side changes
    this.darkPos1_1 = createVector((this.w * 5) / 9, (this.h * 1) / 5);
    this.darkPos1_2 = createVector((this.w * 4) / 9, this.h / 3);
    this.darkPos1_3 = createVector(this.w / 3, (this.h * 3) / 8);
    this.darkPos1_4 = createVector(this.w / 4, this.h / 2);
    this.darkPos1_5 = createVector(this.w / 7, (this.h * 4) / 7);
    this.darkPos2_1 = createVector((this.w * 5) / 9, (this.h * 1) / 5);
    this.darkPos2_2 = createVector(this.w / 2, (this.h * 3) / 7);
    this.darkPos2_3 = createVector((this.w * 6) / 15, (this.h * 8) / 15);

    this.darkV1_1 = p5.Vector.sub(this.darkPos1_2, this.darkPos1_1);
    this.darkV1_1.normalize();
    this.darkV1_1.mult(1.1);
    this.darkV1_2 = p5.Vector.sub(this.darkPos1_3, this.darkPos1_2);
    this.darkV1_2.normalize();
    this.darkV1_2.mult(1.1);
    this.darkV1_3 = p5.Vector.sub(this.darkPos1_4, this.darkPos1_3);
    this.darkV1_3.normalize();
    this.darkV1_4 = p5.Vector.sub(this.darkPos1_5, this.darkPos1_4);
    this.darkV1_4.normalize();

    this.darkV2 = p5.Vector.sub(this.darkPos2_2, this.darkPos2_1);
    this.darkV2.normalize();
    this.darkV2.mult(0.9);
    this.darkV3 = p5.Vector.sub(this.darkPos2_3, this.darkPos2_2);
    this.darkV3.normalize();

    //Bright side changes
    this.brightPos1_1 = createVector((this.w * 5) / 9, (this.h * 1) / 5);
    this.brightPos1_2 = createVector(this.w / 2, (this.h * 3) / 7);
    this.brightPos1_3 = createVector((this.w * 6) / 15, (this.h * 8) / 15);

    this.brightPos2_1 = createVector((this.w * 5) / 9, (this.h * 1) / 5);
    this.brightPos2_2 = createVector(this.w *181/ 270, (this.h * 16) / 45);
    this.brightPos2_3 = createVector((this.w * 9) / 10, (this.h * 2) / 3);

    this.brightV1 = p5.Vector.sub(this.brightPos1_2, this.brightPos1_1);
    this.brightV1.normalize();
    this.brightV1.mult(0.9);
    this.brightV1_2 = p5.Vector.sub(this.brightPos1_3, this.brightPos1_2);
    this.brightV1_2.normalize();

    this.brightV2 = p5.Vector.sub(this.brightPos2_2, this.brightPos2_1);
    this.brightV2.normalize();
    this.brightV2_2 = p5.Vector.sub(this.brightPos2_3, this.brightPos2_2);
    this.brightV2_2.normalize();
  }

  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(174, 214, 241, this.a);
    beginShape();
    vertex(this.w / 10, (this.h * 2) / 3);
    vertex(this.darkPos1_5.x, this.darkPos1_5.y);
    vertex(this.darkPos1_4.x, this.darkPos1_4.y);
    vertex(this.darkPos1_3.x, this.darkPos1_3.y);
    vertex(this.darkPos1_2.x, this.darkPos1_2.y);
    vertex(this.darkPos1_1.x, this.darkPos1_1.y);
    vertex(this.darkPos2_1.x, this.darkPos2_1.y);
    vertex(this.darkPos2_2.x, this.darkPos2_2.y);
    vertex(this.darkPos2_3.x, this.darkPos2_3.y);
    vertex(this.w / 3, (this.h * 2) / 3);
    endShape(CLOSE);

    noStroke();
    fill(235, 245, 251, this.a);
    beginShape();
    vertex(this.w / 3, (this.h * 2) / 3);
    vertex(this.brightPos1_3.x, this.brightPos1_3.y);
    vertex(this.brightPos1_2.x, this.brightPos1_2.y);
    vertex(this.brightPos1_1.x,this.brightPos1_1.y);
    vertex(this.brightPos2_1.x, this.brightPos2_1.y);
    vertex(this.brightPos2_3.x, this.brightPos2_3.y);
    endShape(CLOSE);
    pop();
  }

  melt1() {
    //Dark side
    if (this.darkPos1_1.x>(this.w * 4) / 9 && this.darkPos1_1.y<this.h / 3) {
      this.darkPos1_1.add(this.darkV1_1);

    } else if (this.darkPos1_1.x>this.w / 3 && this.darkPos1_1.y<(this.h * 3) / 8) {
      this.darkPos1_1.add(this.darkV1_2);
      this.darkPos1_2.add(this.darkV1_2);
     }

    if (this.darkPos2_1.x>this.w / 2 && this.darkPos2_1.y<(this.h * 3) / 7) {
     this.darkPos2_1.add(this.darkV2);
    }

    //Brightside
    if (this.brightPos1_1.x>this.w / 2 && this.brightPos1_1.y<(this.h * 3) / 7) {
     this.brightPos1_1.add(this.brightV1);
    }

    if (this.brightPos2_1.x<this.w *181/ 270 && this.brightPos2_1.y<(this.h * 16) / 45) {
     this.brightPos2_1.add(this.brightV2);
    }
  }

  melt2() {
    //Dark side
    if (this.darkPos1_1.x>this.w / 4 && this.darkPos1_1.y<this.h / 2) {
      this.darkPos1_1.add(this.darkV1_3);
      this.darkPos1_2.add(this.darkV1_3);
      this.darkPos1_3.add(this.darkV1_3);
    } else if (this.darkPos1_1.x>this.w / 7 && this.darkPos1_1.y<(this.h * 4) / 7) {
      this.darkPos1_1.add(this.darkV1_4);
      this.darkPos1_2.add(this.darkV1_4);
      this.darkPos1_3.add(this.darkV1_4);
    }

    if (this.darkPos2_1.x>(this.w * 6) / 15 && this.darkPos2_1.y<(this.h * 8) / 15) {
     this.darkPos2_1.add(this.darkV3);
      this.darkPos2_2.add(this.darkV3);
    }

    //Bright side
    if (this.brightPos1_1.x>(this.w * 6) / 15 && this.brightPos1_1.y<(this.h * 8) / 15) {
     this.brightPos1_1.add(this.brightV1_2);
      this.brightPos1_2.add(this.brightV1_2);
    }

    if (this.brightPos2_1.x<(this.w * 9) / 10 && this.brightPos2_1.y<(this.h * 2) / 3) {
     this.brightPos2_1.add(this.brightV2_2);
      this.brightPos2_2.add(this.brightV2_2);
    }
  }

}

function drawBackground(m) {
  let freq = frameCount * 0.03;
  let amp = 50;
  // line(0, (height * 2) / 3, width, (height * 2) / 3);
  for (let j = 0; j < 300; j++) {
    for (let i = 0; i < 10; i++) {
      let sinValue = sin(freq + radians(i * 2) ) * amp;
      let cosValue = cos(freq + PI / 6 + radians(i * 2)) * amp;
      let mapSin = map(sinValue, -150, 150, (height * 2) / 3*m - i * 1.5+j, (height * 11) / 18+j*10);
      let mapCos = map(cosValue, -150, 150, (height * 2) / 3*m - i * 1.5+j, (height * 11) / 18+j*10);
      let x1 = 0;
      let y1 = mapSin;
      let x2 = width;
      let y2 = mapCos;

      stroke(133, 193, 233);
      line(x1, y1, x2, y2);
    }
  }
}


//box1
const valueQ1_1 = document.querySelector('#q1_1');
const valueQ1_2 = document.querySelector('#q1_2');
const valueQ1_3 = document.querySelector('#q1_3');
const valueQ1_4 = document.querySelector('#q1_4');

//box2
const valueQ2_1 = document.querySelector('#q2_1');
const valueQ2_2 = document.querySelector('#q2_2');
const valueQ2_3 = document.querySelector('#q2_3');
const valueQ2_4 = document.querySelector('#q2_4');

//box3
const valueQ3_1 = document.querySelector('#q3_1');
const valueQ3_2 = document.querySelector('#q3_2');
const valueQ3_3 = document.querySelector('#q3_3');

//box4
const valueQ4_1 = document.querySelector('#q4_1');
const valueQ4_2 = document.querySelector('#q4_2');
const valueQ4_3 = document.querySelector('#q4_3');

//button
const button = document.querySelector('#generate');
button.addEventListener('click', buttonFunction);

function buttonFunction() {
  //addEmission
  //box1
  if (document.getElementById('q1_1').checked == true) {
    emission += int(valueQ1_1.value);
  }
  if (document.getElementById('q1_2').checked == true) {
    emission += int(valueQ1_2.value);
  }
  if (document.getElementById('q1_3').checked == true) {
    emission += int(valueQ1_3.value);
  }
  if (document.getElementById('q1_4').checked == true) {
    emission += int(valueQ1_4.value);
  }

  //box2
  if (document.getElementById('q2_1').checked == true) {
    emission += int(valueQ2_1.value);
  }
  if (document.getElementById('q2_2').checked == true) {
    emission += int(valueQ2_2.value);
  }
  if (document.getElementById('q2_3').checked == true) {
    emission += int(valueQ2_3.value);
  }
  if (document.getElementById('q2_4').checked == true) {
    emission += int(valueQ2_4.value);
  }

  //box3
  if (document.getElementById('q3_1').checked == true) {
    emission += int(valueQ3_1.value);
  }
  if (document.getElementById('q3_2').checked == true) {
    emission += int(valueQ3_2.value);
  }
  if (document.getElementById('q3_3').checked == true) {
    emission += int(valueQ3_3.value);
  }

  //box4
  if (document.getElementById('q4_1').checked == true) {
    emission += int(valueQ4_1.value);
  }
  if (document.getElementById('q4_2').checked == true) {
    emission += int(valueQ4_2.value);
  }
  if (document.getElementById('q4_3').checked == true) {
    emission += int(valueQ4_3.value);
  }
  console.log(emission);

  generateIceberg();
  console.log(emission);
}
