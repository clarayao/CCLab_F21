let chars = ["/", "0", "1"];

let img;
let cam;

function setup() {
  createCanvas(640, 480);

  cam = createCapture(VIDEO);
  //cam.hide();
  img = createImage(width, height);
}

function draw() {
  background(0);

  cam.loadPixels();
  img.loadPixels();

  let gridSize = 10;

  for (let y = 0; y < img.height; y+= gridSize) {
    for (let x = 0; x < img.width; x+= gridSize) {
      let index = (x + y * img.width) * 4;

      let r = cam.pixels[index + 0];
      let g = cam.pixels[index + 1];
      let b = cam.pixels[index + 2];

      let distance = dist(mouseX, mouseY, x, y);
      let maxDistance = 150;

      if (distance <= maxDistance) {
        fill(r,g,b);
        ellipse(x ,y ,gridSize, gridSize);
      } else {
        let avg = (r + g + b) / 3;

        let cIndex = floor(
          constrain(map(avg, 0, 255, 0, chars.length), 0, chars.length - 1)
        );
        fill(0, 255, 0);
        text(chars[cIndex], x, y);
      }
    }
  }

  img.updatePixels();
  image(img, 0, 0);
}
