import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const recorderBtn = document.getElementById("recorderBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumbnail: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};

const handleDownload = async () => {
  recorderBtn.removeEventListener("click", handleDownload);
  recorderBtn.innerText = `Transcoding...`;
  recorderBtn.disabled = true;
  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();
  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));
  await ffmpeg.run("-i", files.input, "-r", "60", files.output);
  await ffmpeg.run(
    "-i",
    files.input,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    "thumbnail.jpg"
  );

  const mp4File = ffmpeg.FS("readFile", files.output);
  const thumbnailFile = ffmpeg.FS("readFile", files.thumbnail);
  // Until here... ffmpeg part. not JS..

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbnailBlob = new Blob([thumbnailFile.buffer], { type: "image/jpg" });

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbnailUrl = URL.createObjectURL(thumbnailBlob);

  downloadFile(mp4Url, "My video.mp4");
  downloadFile(thumbnailUrl, "My thumbnail.jpg");

  //for better performance
  ffmpeg.FS("unlink", files.output);
  ffmpeg.FS("unlink", files.thumbnail);
  ffmpeg.FS("unlink", files.input);

  URL.revokeObjectURL(videoFile);
  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbnailUrl);

  recorderBtn.innerText = `Record Again!!`;
  recorderBtn.disabled = false;
  recorderBtn.addEventListener("click", handleStart);
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
  video.src = null;
  video.srcObject = stream;
  video.play();
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
