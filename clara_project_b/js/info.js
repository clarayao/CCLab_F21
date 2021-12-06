function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  bigIceberg = new Iceberg(width*2/3, height, width/3, 0);
}

function draw() {
  background(214, 234, 248);
  // water
  drawBackground( 1 );

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

  // display text
  //fill(0, 0, 255);
  //text(meltAmount, 10, 20);
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

    //Bright side changes
    this.brightPos1_1 = createVector((this.w * 5) / 9, (this.h * 1) / 5);
    this.brightPos1_2 = createVector(this.w / 2, (this.h * 3) / 7);
    this.brightPos1_3 = createVector((this.w * 6) / 15, (this.h * 8) / 15);

    this.brightPos2_1 = createVector((this.w * 5) / 9, (this.h * 1) / 5);
    this.brightPos2_2 = createVector(this.w *181/ 270, (this.h * 16) / 45);
    this.brightPos2_3 = createVector((this.w * 9) / 10, (this.h * 2) / 3);
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
