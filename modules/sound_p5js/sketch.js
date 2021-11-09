let capture;
let img = [];
let count = 0;
let images = [];
let start = 0;

let song; //////////////////////// 7~13
let fft;
let button;
let noiseMax = 2;
let phase = 0;
let offset = 0;
let sg = [];

function preload() {
  for (let i = 0; i < 23; i++) {
    img[i] = loadImage("img/" + i + ".png");
  }
  song = loadSound("song.mp3"); ////////////////////////////// 19
}

function toggleSong() {
  ////////////////////////// 22~28
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}

function setup() {
  createCanvas(1920, 1080);
  capture = createCapture(VIDEO);
  capture.hide();
  for (let i = 0; i < img.length; i++) {
    ///////////////// 36, 이미지 x,y random(-width/2,width/2),random(-height/2,height/2)로 수정
    images[i] = new Img(
      i,
      random(-width / 2, width / 2),
      random(-height / 2, height / 2),
      random(-1, 1),
      random(-0.05, 0.05),
      random(-2, 2),
      random(-2, 2)
    );
  }

  button = createButton("toggle"); ///////////////////////// 39~46
  button.mousePressed(toggleSong);
  song.play();
  fft = new p5.FFT();
  sg[0] = new SoundGraph(width, height, 5);
  sg[1] = new SoundGraph(-width, -height, 3);
  sg[2] = new SoundGraph(width / 2, height / 2, 0);
}

function draw() {
  imageMode(CORNER);
  tint(100); // 영상 틴트
  image(capture, 0, 0, width, (width * capture.height) / capture.width);
  noTint(); // 이미지에는 틴트 안 씌워진다

  for (let i = 0; i < sg.length; i++) {
    //////////////////////// 54~56
    sg[i].draw();
  }

  if (count > img.length + 1) {
    count = 0;
    start = 0;
  }

  if (count < img.length + 1) {
    for (let i = start; i < count; i++) {
      images[i].draw();
      images[i].rotate();
      images[i].move();
      if (i === 2) start = 2;
      if (i === 5) start = 5;
      if (i === 9) start = 9;
      if (i === 11) start = 11;
      if (i === 13) start = 13;
      if (i === 16) start = 16;
      if (i === 21) start = 21;
      if (i === 23) start = 23;
    }
  }
  if (count == img.length + 1) {
    for (let i = 0; i < img.length; i++) {
      images[i].draw();
      images[i].rotate();
      images[i].move();
    }
  }
  console.log(count);
}

function mousePressed() {
  count++;
}

class Img {
  constructor(i, x, y, angle, inc, xSpeed, ySpeed) {
    this.i = i;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.inc = inc;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.w = img[this.i].width; //(크기) 이미지 너비
    this.h = img[this.i].height; //(크기) 이미지 높이
  }

  draw() {
    imageMode(CENTER);
    push();
    fill(255);
    translate(this.x, this.y);
    rotate(this.angle);
    image(img[this.i], 0, 0, this.w, this.h); //(크기) 이미지 크기 변수 수정
    pop();
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x > width / 2 - img[this.i].width / 2) {
      ////////////////////// 수정. 원래 있던 코드 삭제하고 밑에 네 개 추가, 123~138
      this.x = width / 2 - img[this.i].width / 2;
      this.xSpeed = this.xSpeed * -1;
    }
    if (this.x < -width / 2 + img[this.i].width / 2) {
      //////////////////////
      this.x = -width / 2 + img[this.i].width / 2;
      this.xSpeed = this.xSpeed * -1;
    }
    if (this.y > height / 2 - img[this.i].height / 2) {
      ///////////////////////////
      this.y = height / 2 - img[this.i].height / 2;
      this.ySpeed = this.ySpeed * -1;
    }
    if (this.y < -height / 2 + img[this.i].height / 2) {
      ////////////////////////////
      this.y = -height / 2 + img[this.i].height / 2;
      this.ySpeed = this.ySpeed * -1;
    }
  }
  rotate() {
    this.angle += this.inc;
  }
}

class SoundGraph {
  ///////////////////////////////// 140~177
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  draw() {
    fft.analyze();
    let bass = fft.getEnergy("bass");
    let treble = fft.getEnergy("treble");
    let mid = fft.getEnergy("mid");

    let t = 0;
    phase += 0.01;

    translate(this.x, this.y);
    beginShape();
    noFill();
    stroke(255, 50);
    strokeWeight(22);

    let n = noise(offset);
    offset += 0.01;
    for (let a = 0; a < TWO_PI; a += 0.01) {
      let xoff = map(cos(a + phase), -1, 1, 0, noiseMax);
      let yoff = map(sin(a), -1, 1, 0, noiseMax);

      let r = map(noise(xoff, yoff), 0, 1, 0, 1);
      let x = r * cos(a) * bass * this.size;
      let y = r * sin(a) * bass * this.size;
      vertex(x, y);
      t += 0.1;
    }
    endShape(CLOSE);
  }
}
