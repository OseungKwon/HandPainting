let capture;
let img = [];
let count = 0;
let images = [];
let start = 0;

function preload() {
  for (let i = 0; i < 23; i++) {
    img[i] = loadImage("img/" + i + ".png");
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

  function draw() {
    imageMode(CORNER);
    tint(100); // 영상 틴트
    image(capture, 0, 0, width, (width * capture.height) / capture.width);
    noTint(); // 이미지에는 틴트 안 씌워진다

    for (let i = 0; i < sg.length; i++) {
      sg[i].draw();
    }

    if (count < img.length + 1) {
      for (let i = start; i < count; i++) {
        images[i].draw();
        images[i].rotate();
        images[i].move();
        images[i].reduce(); //(크기) 이미지 크기 변화 함수 추가
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
        images[i].reduce(); //(크기) 이미지 크기 변화 함수 추가
      }
    }
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
    reduce() {
      //(크기) 이미지 크기 변화 함수
      this.w = lerp(this.w, img[this.i].width * 0.5, 0.01);
      this.h = lerp(this.h, img[this.i].height * 0.5, 0.01);
    }
  }
}
