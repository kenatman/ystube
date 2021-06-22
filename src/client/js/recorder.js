const recorderBtn = document.getElementById("recorderBtn");
const video = document.getElementById("preview");

let stream;

const handleStop = () => {
  recorderBtn.innerText = `Start Recording!!`;
  recorderBtn.removeEventListener("click", handleStop);
  recorderBtn.addEventListener("click", handleStart);
};

const handleStart = () => {
  recorderBtn.innerText = `Stop Recording...`;
  recorderBtn.removeEventListener("click", handleStart);
  recorderBtn.addEventListener("click", handleStop);
  const recorder = new MediaRecorder(stream);
  recorder.start();
  setTimeout(() => {
    recorder.stop();
  }, 3000);
  recorder.ondataavailable = (e) => {
    console.log(e.data);
  };
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
