const playBtn = document.querySelector(`#play`);
const muteBtn = document.querySelector(`#mute`);
const volumeRange = document.querySelector(`#volume`);
const video = document.querySelector("video");
const currentTime = document.querySelector(`#currentTime`);
const totalTime = document.querySelector(`#totalTime`);
const timeline = document.querySelector(`#timeline`);

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

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(14, 5);

const handleLoadedMetaData = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currentTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (e) => {
  const {
    target: { value },
  } = e;
  video.currentTime = value;
};

playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeRange);
video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimelineChange);
