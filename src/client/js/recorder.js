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
  await ffmpeg.run(
    "-i",
    "recording.webm",
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    "thumbnail.jpg"
  );

  const mp4File = ffmpeg.FS("readFile", "output.mp4");
  const thumbnailFile = ffmpeg.FS("readFile", "thumbnail.jpg");
  // Until here... ffmpeg part. not JS..

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbnailBlob = new Blob([thumbnailFile.buffer], { type: "image/jpg" });

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbnailUrl = URL.createObjectURL(thumbnailBlob);

  const a = document.createElement("a");
  a.href = mp4Url;
  a.download = "My Video.mp4";
  document.body.appendChild(a);
  a.click();

  const thumbA = document.createElement("a");
  thumbA.href = thumbnailUrl;
  thumbA.download = "My thumbnail.jpg";
  document.body.appendChild(thumbA);
  thumbA.click();
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
