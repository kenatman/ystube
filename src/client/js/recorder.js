const recorderBtn = document.getElementById("recorderBtn");

const handleStart = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  console.log(stream);
};

recorderBtn.addEventListener("click", handleStart);
