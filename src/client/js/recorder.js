const recorderBtn = document.getElementById("recorderBtn");
const video = document.getElementById("preview");

let stream;
let recorder;

const handleDownload = () => {};

const handleStop = () => {
  recorderBtn.innerText = `Download Recording~~`;
  recorderBtn.removeEventListener("click", handleStop);
  recorderBtn.addEventListener("click", handleDownload);
  recorder.stop();
  recorder.ondataavailable = (e) => {
    const videoFile = URL.createObjectURL(e.data); // create URL available only on the browser's memory
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };
};

const handleStart = () => {
  recorderBtn.innerText = `Stop Recording`;
  recorderBtn.removeEventListener("click", handleStart);
  recorderBtn.addEventListener("click", handleStop);
  recorder = new MediaRecorder(stream);
  recorder.start();
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  video.srcObject = stream;
  video.play();
};

init();

recorderBtn.addEventListener("click", handleStart);
