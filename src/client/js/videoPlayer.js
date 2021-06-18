const playBtn = document.querySelector(`#play`);
const muteBtn = document.querySelector(`#mute`);
const time = document.querySelector(`#time`);
const volume = document.querySelector(`#volume`);
const video = document.querySelector("video");

const handlePlay = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const handleIconPlay = () => (playBtn.innerText = `PAUSE`);
const handleIconPause = () => (playBtn.innerText = `PLAY`);

playBtn.addEventListener("click", handlePlay);
video.addEventListener("play", handleIconPlay);
video.addEventListener("pause", handleIconPause);

muteBtn.addEventListener("click", handleMute);
