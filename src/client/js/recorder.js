const recorderBtn = document.getElementById("recorderBtn");
const video = document.getElementById("preview");
console.log(video);
const handleStart = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  video.srcObject = stream;
  video.play();
};

recorderBtn.addEventListener("click", handleStart);
