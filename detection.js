let detections = {};

const videoElement = document.getElementById("video");
const button = document
  .querySelector(".button")
  .addEventListener("click", hello);
const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
  }
});

hands.setOptions({
  maxNumHands: 4,
  minDetectionConfidence: 0.8,
  minTrackingConfidence: 0.5
});

hands.onResults(gotHands);
function gotHands(results) {
  detections = results;
  //console.log(detections);
  //console.log(detections.multiHandLandmarks);
  if (detections.multiHandLandmarks.length === 2) {
    if (
      Math.abs(
        detections.multiHandLandmarks[0][4].y -
          detections.multiHandLandmarks[0][20].y
      ) < 0.1 &&
      detections.multiHandLandmarks[1][10].x >
        detections.multiHandLandmarks[1][12].x &&
      detections.multiHandLandmarks[1][14].x >
        detections.multiHandLandmarks[1][16].x &&
      detections.multiHandLandmarks[1][18].x >
        detections.multiHandLandmarks[1][20].x
    ) {
      console.log("사랑해요");
      document.getElementById("content").innerHTML = "사랑해요";
    } else {
      //console.log("no");
    }
    if (
      detections.multiHandLandmarks[0][12].y >
        detections.multiHandLandmarks[0][9].y &&
      detections.multiHandLandmarks[0][16].y >
        detections.multiHandLandmarks[0][13].y &&
      detections.multiHandLandmarks[0][20].y >
        detections.multiHandLandmarks[0][17].y
    ) {
      console.log("이 한마디");
      document.getElementById("content").innerHTML = "이 한마디";
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
  height: 480
});
camera.start();

function hello() {
  videoElement.classList.toggle("flipped");
}
