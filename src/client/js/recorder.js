import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const recorderBtn = document.getElementById("recorderBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = async () => {
  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();

  ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));

  await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");

  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "My Own Video.webm";
  document.body.appendChild(a);
  a.click();
};

const handleStop = () => {
  recorderBtn.innerText = `Download Recording~~`;
  recorderBtn.removeEventListener("click", handleStop);
  recorderBtn.addEventListener("click", handleDownload);
  recorder.stop();
  recorder.ondataavailable = (e) => {
    videoFile = URL.createObjectURL(e.data); // create URL available only on the browser's memory
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
