let detections = {};

const videoElement = document.getElementById("video");

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
  if (detections.multiHandLandmarks.length > 0) {
    // love

    if (
      detections.multiHandLandmarks[0][12].y >
        detections.multiHandLandmarks[0][9].y &&
      detections.multiHandLandmarks[0][16].y >
        detections.multiHandLandmarks[0][13].y
    ) {
      console.log("love");
    } else {
      console.log("hi");
    }
  }
}

const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 640,
  height: 480
});
camera.start();
