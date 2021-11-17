let mainStem = [];
let branches = [];

let diaN;
// let diaM;
// let darknessN;
let opacity = 2;

function setup() {
  let canvas = createCanvas(1300, 870);
  canvas.parent("canvasContainer");
  background(0);

  diaN = document.getElementById("stroke");
  // diaM = document.getElementById("strokeN");
  // darknessN = document.getElementById("darkness");
}

function draw() {
  //change MainStem Stroke
  let dia = diaN.value;
  // let dian = diaM.value;
  // dian = dia;
  // //changebackground darkness
  // let darkness = darknessN.value;
  // if (darkness != 100) {
  //   changebackgroundDarkness();
  //   darkness = 100;
  // }
  // Main Stem: update & display
  for (let i = 0; i < mainStem.length; i++) {
    this.Mcolor = 255;
    let m = mainStem[i];
    if (i != 0) {
      let pm = mainStem[i - 1];
      m.displayLine(pm);
    }
    m.display();
  }

  //Branches: update & display
  for (let i = 0; i < branches.length; i++) {
    let b = branches[i];
    b.move();
    b.display();
  }

  //Branches: limit & remove
  while (branches.length > 10) {
    branches.splice(0, 1);
  }

  for (let i = branches.length - 1; i >= 0; i--) {
    let b = branches[i];
    if (b.isDone == true) {
      branches.splice(i);
    }
  }
}

function mousePressed() {
  dia = diaN.value;
  //Main Stem: generate
  if (mouseX<1300 & mouseY<870) {
      mainStem.push(new MainStem(mouseX, mouseY, dia, opacity));
  }

}

function keyPressed() {

  //darker screen
  if (keyCode == BACKSPACE) {
    background(0, 30);
    //displayText();
    mainStem = [];
    branches = [];
  }
}

//Branches: Generate
function generateBranches() {
  for (let i = 0; i < mainStem.length; i++) {
    if (i != 0) {
      let p1 = createVector(mainStem[i - 1].x, mainStem[i - 1].y);
      let p2 = createVector(mainStem[i].x, mainStem[i].y);
      let vector = p5.Vector.sub(p2, p1);
      let v1 = vector.copy();
      let v2 = vector.copy();
      let angle = radians(30); // *****
      branches.push(new Branch(p2.x, p2.y, v1.rotate(angle)));
      branches.push(new Branch(p2.x, p2.y, v2.rotate(-angle)));
    }
  }
}

//draw new line
function stopBranches() {
  mainStem = [];
  branches = [];
}

// function changebackgroundDarkness() {
//   background(0,darkness);
//   mainStem = [];
//   branches = [];
// }

class MainStem {
  constructor(x, y, dia, opacity) {
    this.x = x;
    this.y = y;
    this.dia = dia;
    this.opacity = opacity;
    this.Mcolor = 255;
  }
  display() {
    push();
    blendMode(ADD);
    noFill();
    stroke(112, 39, 160, this.opacity);
    circle(this.x, this.y, this.dia);
    pop();
  }
  displayLine(prev) {
    push();
    blendMode(ADD);
    noFill();
    stroke(29, 185, 195, this.opacity);
    strokeWeight(this.dia / 2);
    line(this.x, this.y, prev.x, prev.y);
    pop();
  }
}

class Branch {
  constructor(x, y, vector) {
    this.x = x;
    this.y = y;

    this.rad = random(2, 3);

    //move
    this.direction = vector.copy();
    this.direction.setMag(1);

    //limit & remove
    this.isDone = false;
  }

  checkRemove() {
    if (
      this.x < 0 ||
      this.x > windowWidth ||
      this.y < 0 ||
      this.y > windowHeight
    ) {
      this.isDone = true;
    }
  }

  move() {
    this.x += this.direction.x;
    this.y += this.direction.y;
    if (random() < 0.02) {
      this.direction.rotate(radians(60));
    }
  }

  display() {
    push();
    blendMode(ADD);
    noStroke();
    fill(29, 185, 255, 15);
    circle(this.x, this.y, this.rad * 2);
    pop();
  }
}
