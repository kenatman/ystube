const playBtn = document.querySelector(`#play`);
const muteBtn = document.querySelector(`#mute`);
const time = document.querySelector(`#time`);
const volumeRange = document.querySelector(`#volume`);
const video = document.querySelector("video");

let volumeValue = 0.5;

video.volume = volumeValue;

const handlePlay = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? `PLAY` : `PAUSE`;
};

const handleMute = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? `UNMUTE` : `MUTE`;
  volumeRange.value = video.muted ? 0 : volumeValue;
};

const handleVolumeRange = (e) => {
  const {
    target: { value },
  } = e;
  if (video.muted) {
    muteBtn.innerText = `MUTE`;
    video.muted = false;
  }
  volumeValue = value;
  video.volume = value;
};

playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeRange);
