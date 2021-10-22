let detections = {};
let word = "";
const videoElement = document.getElementById("video");
const button = document
  .querySelector(".button")
  .addEventListener("click", flipVideo);
const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
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
  console.log(detections);
  //console.log(detections.multiHandLandmarks.length);
  if (detections.multiHandLandmarks.length === 1) {
    if (
      // z축과 동일(오른손만)
      Math.abs(
        detections.multiHandLandmarks[0][5].z -
          detections.multiHandLandmarks[0][9].z
      ) < 0.1 &&
      Math.abs(
        detections.multiHandLandmarks[0][4].z -
          detections.multiHandLandmarks[0][8].z
      ) < 0.1 &&
      detections.multiHandLandmarks[0][16].y <
        detections.multiHandLandmarks[0][13].y
    ) {
      console.log("참");
      document.getElementById("content").innerHTML = "참";
    }
    if (
      //검지만 펴져있는 손 모양(오른손만)
      detections.multiHandLandmarks[0][12].y >
        detections.multiHandLandmarks[0][9].y &&
      detections.multiHandLandmarks[0][16].y >
        detections.multiHandLandmarks[0][13].y &&
      detections.multiHandLandmarks[0][20].y >
        detections.multiHandLandmarks[0][17].y &&
      detections.multiHandLandmarks[0][8].y <
        detections.multiHandLandmarks[0][5].y
    ) {
      console.log("이 한마디");
      document.getElementById("content").innerHTML = "이 한마디";
      word = "이 한마디";
    }
    if (
      // 주먹 쥔 모양(오른손만)
      detections.multiHandLandmarks[0][12].y >
        detections.multiHandLandmarks[0][9].y &&
      detections.multiHandLandmarks[0][16].y >
        detections.multiHandLandmarks[0][13].y &&
      detections.multiHandLandmarks[0][20].y >
        detections.multiHandLandmarks[0][17].y &&
      detections.multiHandLandmarks[0][8].y >
        detections.multiHandLandmarks[0][5].y
    ) {
      console.log("좋은");
      document.getElementById("content").innerHTML = "좋은";
    }
  }
  if (detections.multiHandLandmarks.length === 2) {
    if (
      Math.abs(
        // 바닥과 수평된 손모양(오른손)
        detections.multiHandLandmarks[0][4].y -
          detections.multiHandLandmarks[0][20].y
      ) < 0.1 && // 주먹쥐고 있는 손 모양(왼손)
      detections.multiHandLandmarks[1][10].x >
        detections.multiHandLandmarks[1][12].x &&
      detections.multiHandLandmarks[1][14].x >
        detections.multiHandLandmarks[1][16].x &&
      detections.multiHandLandmarks[1][18].x >
        detections.multiHandLandmarks[1][20].x
    ) {
      console.log("사랑해요");
      document.getElementById("content").innerHTML = "사랑해요";
      particle("love");
    } else {
      //console.log("no");
    }
    if (
      //검지만 펴져있는 손 모양(오른손)
      detections.multiHandLandmarks[0][12].y >
        detections.multiHandLandmarks[0][9].y &&
      detections.multiHandLandmarks[0][16].y >
        detections.multiHandLandmarks[0][13].y &&
      detections.multiHandLandmarks[0][20].y >
        detections.multiHandLandmarks[0][17].y
    ) {
      if (
        //검지만 펴져있는 손 모양(왼손)
        detections.multiHandLandmarks[1][12].y >
          detections.multiHandLandmarks[1][9].y &&
        detections.multiHandLandmarks[1][16].y >
          detections.multiHandLandmarks[1][13].y &&
        detections.multiHandLandmarks[1][20].y >
          detections.multiHandLandmarks[1][17].y
      ) {
        console.log("말");
        document.getElementById("content").innerHTML = "말";
      }
    }
  }
  // if (detections.multiHandLandmarks.length === 1) {
  //   // love 손 모양

  //   if (
  //     detections.multiHandLandmarks[0][12].y >
  //       detections.multiHandLandmarks[0][9].y &&
  //     detections.multiHandLandmarks[0][16].y >
  //       detections.multiHandLandmarks[0][13].y
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

let canvas1;
let img;
let sketch1 = function (p) {
  console.log(p);
  setup = function () {
    canvas1 = createCanvas(640, 480);
    canvas1.id("canvas1");
    img = loadImage("f01.png");

    colorMode(HSB);
  };

  p.draw = function () {
    clear();
    //background(200);
    text(word, 20, 20, 100, 100);
    //  trigger
    if (word === "이 한마디") {
      // put designed particle module
      let posX = 100;
      let posY = 100;
      image(img, posX, posY, 200, 200);
      translate(0, 0, 40);
    }
  };
};

let myp51 = new p5(sketch1);
