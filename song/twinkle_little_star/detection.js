let detections = {};
let count = 0;
/*count=> 
1: 사랑해요, 2: 이 한마디, 3: 참, 4: 좋은, 5: 말,


*/
const videoElement = document.getElementById("video");
const content = document.getElementById("content");
const loading = document.getElementById("loading");

const button = document.querySelector(".button");
const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.3.1632795355/${file}`;
  },
});

hands.setOptions({
  maxNumHands: 2,
  minDetectionConfidence: 0.8,
  minTrackingConfidence: 0.5,
});

hands.onResults(gotHands);
function gotHands(results) {
  detections = results;
}
function motion(count) {
  if (count === 1 || count === 2 || count === 8 || count === 9) {
    console.log(count);
    console.log("반짝");
    document.getElementById("content").innerHTML = "반짝";
  }
  if (count === 3 || count === 10) {
    console.log(count);
    console.log("작은별");
    document.getElementById("content").innerHTML = "작은별";
  }
  if (count === 4 || count === 11) {
    console.log(count);
    console.log("아름답게");
    document.getElementById("content").innerHTML = "아름답게";
  }
  if (count === 5 || count === 12) {
    console.log(count);
    console.log("비치네");
    document.getElementById("content").innerHTML = "비치네";
  }
  if (count === 6) {
    console.log(count);
    console.log("동쪽하늘 에서도");
    document.getElementById("content").innerHTML = "동쪽하늘 에서도";
  }
  if (count === 7) {
    console.log(count);
    console.log("서쪽하늘 에서도");
    document.getElementById("content").innerHTML = "서쪽하늘 에서도";
  }
}
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 1920,
  height: 1080,
});
camera.start();

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
  for (let i = 0; i < 12; i++) {
    img[i] = loadImage("./img/" + i + ".png");
  }
  song = loadSound("song.mp3"); ////////////////////////////// 19
}

function setup() {
  createCanvas(1920, 1080);
  capture = createCapture(VIDEO);
  capture.hide();
  for (let i = 0; i < img.length; i++) {
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

  setTimeout(loading1, 500);
  function loading1() {
    loading.innerHTML = "loading.";
    setTimeout(loading2, 500);
  }
  function loading2() {
    loading.innerHTML = "loading..";
    setTimeout(loading3, 500);
  }
  function loading3() {
    loading.innerHTML = "loading...";
    setTimeout(songplay, 400);
  }
  function songplay() {
    loading.id = "none";
    song.play();
  }

  fft = new p5.FFT();
  sg[0] = new SoundGraph(width, height, 5, 50);
  sg[1] = new SoundGraph(-width, -height, 3, 50);
  sg[2] = new SoundGraph(width / 2, height / 2, 0, 0);
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
      //images[i].reduce(); //(크기) 이미지 크기 변화 함수 추가
      if (i === 3) start = 3;
      if (i === 5) start = 5;
      if (i === 6) start = 6;
      if (i === 7) start = 7;
      if (i === 10) start = 10;
      if (i === 12) start = 12;
    }
  }
  if (count == img.length + 1) {
    background(0);
    for (let i = 0; i < img.length; i++) {
      images[i].draw();
      images[i].rotate();
      images[i].move();
    }
  }
  console.log(count);
  if (count <= 12) motion(count);
  else content.id = "none";
}

function keyPressed() {
  if (keyCode === ENTER) {
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
        location.replace("../../song_output.html");
      })
      .catch(function (err) {
        console.log(err);
      });
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
    this.w = img[this.i].width / 2; //(크기) 이미지 너비
    this.h = img[this.i].height / 2; //(크기) 이미지 높이
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

    if (this.x > width - img[this.i].width) {
      ////////////////////// 수정. 원래 있던 코드 삭제하고 밑에 네 개 추가, 123~138
      this.x = width - img[this.i].width;
      this.xSpeed = this.xSpeed * -1;
    }
    if (this.x < -width + img[this.i].width) {
      //////////////////////
      this.x = -width + img[this.i].width;
      this.xSpeed = this.xSpeed * -1;
    }
    if (this.y > height - img[this.i].height) {
      ///////////////////////////
      this.y = height - img[this.i].height;
      this.ySpeed = this.ySpeed * -1;
    }
    if (this.y < -height + img[this.i].height) {
      ////////////////////////////
      this.y = -height + img[this.i].height;
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
