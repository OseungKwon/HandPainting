let img = [];
let images = [];
let off = 300;
let area;
let spring = 0.05;
let r = 700; //r값을 조절하면 화면 중심으로부터 튕기는 거리 조절
function preload() {
  for (let i = 0; i < 11; i++) {
    img[i] = loadImage("img/" + i + ".png");
  }
}

function setup() {
  createCanvas(1920, 1080);
  for (let i = 0; i < 6; i++) {
    images[i] = new Img(
      i,
      random(0, width / 4),
      random(0, height),
      random(-1, 1),
      random(-0.05, 0.05),
      random(-1, 1),
      random(-1, 1)
    );
  }
  for (let i = 6; i < img.length; i++) {
    images[i] = new Img(
      i,
      random((width / 4) * 3, width),
      random(0, height),
      random(-1, 1),
      random(-0.05, 0.05),
      random(-2, 2),
      random(-2, 2)
    );
  }
  area = new Area(width / 2, height / 2, r, r);
}

function draw() {
  imageMode(CORNER);
  background(0);

  for (let i = 0; i < img.length; i++) {
    images[i].draw();
    images[i].rotate();
    images[i].move();
    images[i].collide(area);
  }
  //area.draw(); //이 줄 없애면 가운데 원은 안 보이게 됩니다.
  background(0, 100);
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
    this.w = img[this.i].width;
    this.h = img[this.i].height;
  }

  draw() {
    imageMode(CENTER);
    push();
    fill(255);
    translate(this.x, this.y);
    rotate(this.angle);
    image(img[this.i], 0, 0, this.w, this.h);
    pop();
  }
  rotate() {
    this.angle += this.inc;
  }
  reduce() {
    this.w = lerp(this.w, img[this.i].width * 0.5, 0.01);
    this.h = lerp(this.h, img[this.i].height * 0.5, 0.01);
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < this.w / 2) {
      this.x = this.w / 2;
      this.xSpeed = this.xSpeed * -1;
    }
    if (this.x > width - this.w / 2) {
      this.x = width - this.w / 2;
      this.xSpeed = this.xSpeed * -1;
    }
    if (this.y < this.h / 2) {
      this.y = this.h / 2;
      this.ySpeed = this.ySpeed * -1;
    }
    if (this.y > height - this.h / 2) {
      this.y = height - this.h / 2;
      this.ySpeed = this.ySpeed * -1;
    }
    //     let d=dist(width/2,height/2,this.x,this.y);
    //     if(d<off){
    //       this.xSpeed=this.xSpeed*-1;
    //       this.ySpeed=this.ySpeed*-1;
    //     }
  }

  collide(other) {
    let dx = other.x - this.x;
    let dy = other.y - this.y;
    let distance = sqrt(dx * dx + dy * dy);
    let minDist;
    if (this.w > this.h) {
      minDist = other.r / 2 + this.w / 2;
    } else {
      minDist = other.r / 2 + this.h / 2;
    }
    if (distance < minDist) {
      let angle = atan2(dy, dx);
      let targetX = this.x + cos(angle) * minDist;
      let targetY = this.y + sin(angle) * minDist;
      let ax = (targetX - other.x) * spring;
      let ay = (targetY - other.y) * spring;

      this.xSpeed -= ax;
      this.ySpeed -= ay;
    }
  }
}

class Area {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
  draw() {
    circle(this.x, this.y, this.r);
  }
}
