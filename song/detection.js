let detections = {};
let count = 0;
/*count=> 
1: 사랑해요, 2: 이 한마디, 3: 참, 4: 좋은, 5: 말,


*/
const videoElement = document.getElementById("video");
const content = document.getElementById("content");

const button = document.querySelector(".button");
const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.3.1632795355/${file}`;
  }
});

hands.setOptions({
  maxNumHands: 2,
  minDetectionConfidence: 0.8,
  minTrackingConfidence: 0.5
});
function abc(count) {
  if (count === 3 || count === 14) {
    console.log(count);
    console.log("참");
    document.getElementById("content").innerHTML = "참";
  }

  if (count === 2 || count === 13) {
    console.log(count);
    document.getElementById("content").innerHTML = "이 한마디";
    console.log("이 한마디");
  }
  if (count === 17) {
    console.log(count);
    document.getElementById("content").innerHTML = "엄마";
    console.log("엄마");
  }

  if (count === 20) {
    console.log(count);
    document.getElementById("content").innerHTML = "갈";
    console.log("갈");
  }

  if (count === 18) {
    console.log(count);
    document.getElementById("content").innerHTML = "아빠";
    console.log("아빠");
  }

  if (count === 6) {
    console.log(count);
    console.log("우리");
    document.getElementById("content").innerHTML = "우리";
  }

  if (count === 4 || count === 15) {
    console.log(count);
    console.log("좋은");
    document.getElementById("content").innerHTML = "좋은";
  }

  if (count === 7) {
    console.log(count);
    console.log("식구");
    document.getElementById("content").innerHTML = "식구";
  }

  if (count === 19) {
    console.log(count);
    console.log("일터");
    document.getElementById("content").innerHTML = "일터";
  }

  if (count === 1 || count === 12) {
    console.log(count);
    console.log("사랑해요");
    document.getElementById("content").innerHTML = "사랑해요";
  }

  if (count === 5 || count === 11 || count === 16 || count === 23) {
    console.log(count);
    console.log("말");
    document.getElementById("content").innerHTML = "말";
  }

  if (count === 8) {
    console.log(count);
    console.log("자고");
    document.getElementById("content").innerHTML = "자고";
  }

  if (count === 9) {
    console.log(count);
    console.log("나면");
    document.getElementById("content").innerHTML = "나면";
  }

  if (count === 10 || count === 22) {
    console.log(count);
    console.log("주고받는");
    document.getElementById("content").innerHTML = "주고받는";
  }

  if (count === 21) {
    console.log(count);
    console.log("때");
    document.getElementById("content").innerHTML = "때";
  }
}
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 1920,
  height: 1080
});
camera.start();

function flipVideo() {
  videoElement.classList.toggle("flipped");
}

//------- Condortable p5 world :))))) -------//
let capture;
let img = [];
let images = [];
let start = 0;

let song;
let fft;
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

  song.play();
  fft = new p5.FFT();
  sg[0] = new SoundGraph(width, height, 5, 50);
  sg[1] = new SoundGraph(-width, -height, 3, 50);
  sg[2] = new SoundGraph(width / 2, height / 2, 0, 0);
}

function draw() {
  imageMode(CORNER);
  tint(0); // 영상 틴트
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
      //images[i].reduce(); //(크기) 이미지 크기 변화 함수 추가
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
      //images[i].reduce(); //(크기) 이미지 크기 변화 함수 추가
    }
  }
  console.log(count);
  if (count <= 23) abc(count);
  else {
    //background(0);
    content.id = "none";
  }
}

function keyPressed() {
  content.id = "none";
  html2canvas(document.body)
    //document에서 body 부분을 스크린샷을 함.
    .then(function (canvas) {
      //canvas 결과값을 drawImg 함수를 통해서
      //결과를 canvas 넘어줌.
      //png의 결과 값
      downImage = canvas.toDataURL();
      image = canvas.toDataURL("image/png");
      console.log(image);
      localStorage.img = image;
      localStorage.downImg = downImage;
      location.replace("../result.html");
    })
    .catch(function (err) {
      console.log(err);
    });
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

class SoundGraph {
  ///////////////////////////////// 140~177
  constructor(x, y, size, al) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.al = al;
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
    stroke(255, this.al);
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
