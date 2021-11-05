let detections = {};
let count = 0;
/*count=> 
1: 사랑해요, 2: 이 한마디, 3: 참, 4: 좋은, 5: 말,


*/
let word = "";
const videoElement = document.getElementById("video");
const button = document
  .querySelector(".button")
  .addEventListener("click", flipVideo);
const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.3.1632795355/${file}`;
  },
});

hands.setOptions({
  maxNumHands: 4,
  minDetectionConfidence: 0.8,
  minTrackingConfidence: 0.5,
});

hands.onResults(gotHands);
function gotHands(results) {
  detections = results;
  hand = detections.multiHandLandmarks;
  //console.log(detections);
  //console.log(hand.length);
  if (hand.length === 1) {
    if (
      // z축과 동일(오른손만)
      Math.abs(hand[0][5].z - hand[0][9].z) < 0.1 &&
      Math.abs(hand[0][4].z - hand[0][8].z) < 0.1 &&
      hand[0][16].y < hand[0][13].y
    ) {
      console.log("참");
      document.getElementById("content").innerHTML = "참";
      if (count === 2) {
        count++;
        console.log(count);
      }
    }
    if (
      //검지만 펴져있는 손 모양(오른손만)
      hand[0][12].y > hand[0][9].y &&
      hand[0][16].y > hand[0][13].y &&
      hand[0][20].y > hand[0][17].y &&
      hand[0][8].y < hand[0][5].y
    ) {
      console.log("이 한마디");
      document.getElementById("content").innerHTML = "이 한마디";
      word = "이 한마디";
      if (count === 1) {
        count++;
        console.log(count);
      }
    }
    if (
      hand[0][5].x > hand[0][8].x &&
      hand[0][9].x > hand[0][12].x &&
      hand[0][13].x > hand[0][16].x &&
      hand[0][1].x > hand[0][4].x
    ) {
      document.getElementById("content").innerHTML = "우리";
    }

    // if (
    //   // 주먹 쥔 모양(오른손만)
    //   hand[0][12].y >
    //     hand[0][9].y &&
    //   hand[0][16].y >
    //     hand[0][13].y &&
    //   hand[0][20].y >
    //     hand[0][17].y &&
    //   hand[0][8].y >
    //     hand[0][5].y
    // ) {
    //   console.log("좋은");
    //   document.getElementById("content").innerHTML = "좋은";
    // }
  }
  if (hand.length === 2) {
    if (
      hand[0][0].x < hand[0][12].x &&
      hand[1][0].x > hand[1][12].x &&
      hand[0][5].y > hand[0][8].y &&
      hand[0][13].y > hand[0][16].y
    ) {
      console.log("식구");
      document.getElementById("content").innerHTML = "식구";
    }
    if (
      Math.abs(
        // 바닥과 수평된 손모양(오른손)
        hand[0][4].y - hand[0][20].y
      ) < 0.1 && // 주먹쥐고 있는 손 모양(왼손)
      hand[1][9].x < hand[1][10].x &&
      hand[1][10].x > hand[1][12].x &&
      hand[1][14].x > hand[1][16].x &&
      hand[1][18].x > hand[1][20].x
    ) {
      console.log("사랑해요");
      document.getElementById("content").innerHTML = "사랑해요";
      if (count === 0) {
        count++;
        console.log(count);
      }
      //particle("love");
    } else {
      //console.log("no");
    }
    if (
      //검지만 펴져있는 손 모양(오른손)
      hand[0][5].y > hand[0][8].y &&
      hand[0][12].y > hand[0][9].y &&
      hand[0][16].y > hand[0][13].y &&
      hand[0][20].y > hand[0][17].y &&
      hand[0][4].x < hand[0][3].x
    ) {
      if (
        //검지만 펴져있는 손 모양(왼손)
        hand[1][5].y > hand[1][8].y &&
        hand[1][12].y > hand[1][9].y &&
        hand[1][16].y > hand[1][13].y &&
        hand[1][20].y > hand[1][17].y &&
        hand[1][4].x > hand[1][3].x
      ) {
        console.log("말");
        document.getElementById("content").innerHTML = "말";
      }
    }
    if (
      hand[0][8].x > hand[0][0].x &&
      hand[0][16].x > hand[0][13].x &&
      hand[1][8].x > hand[1][0].x &&
      hand[1][16].x > hand[1][13].x
    ) {
      console.log("자고");
      document.getElementById("content").innerHTML = "자고";
    }
    if (
      //검지만 펴져있는 손 모양(오른손)
      hand[0][5].y > hand[0][8].y &&
      hand[0][12].y > hand[0][9].y &&
      hand[0][16].y > hand[0][13].y &&
      hand[0][20].y > hand[0][17].y &&
      hand[0][4].x > hand[0][3].x
    ) {
      if (
        //검지만 펴져있는 손 모양(왼손)
        hand[1][5].y > hand[1][8].y &&
        hand[1][12].y > hand[1][9].y &&
        hand[1][16].y > hand[1][13].y &&
        hand[1][20].y > hand[1][17].y &&
        hand[1][4].x < hand[1][3].x
      ) {
        console.log("나면");
        document.getElementById("content").innerHTML = "나면";
      }
    }
    if (
      hand[0][4].x < hand[0][17].x &&
      hand[0][0].z > hand[0][12].z &&
      hand[1][0].z > hand[1][12].z &&
      hand[0][2].z > hand[0][4].z &&
      hand[0][5].y > hand[0][8].y &&
      hand[0][13].y > hand[0][16].y
    ) {
      console.log("주고받는");
      document.getElementById("content").innerHTML = "주고받는";
    }
  }
  // if (hand.length === 1) {
  //   // love 손 모양

  //   if (
  //     hand[0][12].y >
  //       hand[0][9].y &&
  //     hand[0][16].y >
  //       hand[0][13].y
  //   ) {
  //     console.log("love");
  //   } else {
  //     console.log("hi");
  //   }
  // }
}

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 640,
  height: 480,
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
let canvas1;
function preload() {
  for (let i = 0; i < 8; i++) {
    img[i] = loadImage("img/" + i + ".png");
  }
}

function setup() {
  canvas1 = createCanvas(640, 480);
  canvas1.id("canvas1");
  capture = createCapture(VIDEO);
  capture.hide();
  for (let i = 0; i < img.length; i++) {
    images[i] = new Img(
      i,
      random(50, width - 50),
      random(50, height - 50),
      random(-1, 1),
      random(-0.1, 0.1),
      random(-1, 1),
      random(-1, 1)
    );
  }
}

function draw() {
  imageMode(CORNER);
  tint(100); // 영상 틴트
  image(capture, 0, 0, width, (width * capture.height) / capture.width);
  noTint(); // 이미지에는 틴트 안 씌워진다
  if (count > img.length + 1) {
    start = 0;
    count = 0;
    start = 0;
  }
  if (count < 9) {
    for (let i = start; i < count; i++) {
      images[i].draw();
      images[i].rotate();
      images[i].move();
      if (i === 2) start = 2;
      if (i === 3) start = 3;
      if (i === 7) start = 7;
      if (i === 8) start = 8;
    }
  }
  if (count === 9) {
    for (let i = 0; i < 8; i++) {
      images[i].draw();
      images[i].rotate();
      images[i].move();
    }
  }
  console.log(count, img.length);
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
  }

  draw() {
    imageMode(CENTER);
    push();
    fill(255);
    translate(this.x, this.y);
    rotate(this.angle);
    image(img[this.i], 0, 0, img[this.i].width, img[this.i].height);
    pop();
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (
      this.x > width - img[this.i].width / 2 ||
      this.x < img[this.i].width / 2
    ) {
      this.xSpeed = this.xSpeed * -1;
    }
    if (
      this.y > height - img[this.i].height / 2 ||
      this.y < img[this.i].height / 2
    ) {
      this.ySpeed = this.ySpeed * -1;
    }
  }
  rotate() {
    this.angle += this.inc;
  }
}
