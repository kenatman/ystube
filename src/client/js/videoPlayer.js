const playBtn = document.querySelector(`#play`);
const playBtnIcon = playBtn.querySelector(`i`);
const muteBtn = document.querySelector(`#mute`);
const muteBtnIcon = muteBtn.querySelector(`i`);
const volumeRange = document.querySelector(`#volume`);
const video = document.querySelector("video");
const currentTime = document.querySelector(`#currentTime`);
const totalTime = document.querySelector(`#totalTime`);
const timeline = document.querySelector(`#timeline`);
const fullScreenBtn = document.querySelector(`#fullScreen`);
const fullScreenBtnIcon = fullScreenBtn.querySelector(`i`);
const videoContainer = document.querySelector(`#videoContainer`);
const videoControls = document.querySelector(`#videoControls`);

let controlsMoveTimeout = null;
let controlsTimeout = null;
let volumeValue = 0.5;

video.volume = volumeValue;

const handlePlay = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtnIcon.classList = video.paused ? `fas fa-play` : `fas fa-pause`;
};

const handleMute = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? `fas fa-volume-mute`
    : `fas fa-volume-up`;
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

const handleFullScreen = () => {
  const fullScreenState = document.fullscreenElement;
  if (fullScreenState) {
    document.exitFullscreen();
    fullScreenBtnIcon.classList = `fas fa-expand`;
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtnIcon.classList = `fas fa-compress`;
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMoveTimeout) {
    clearTimeout(controlsMoveTimeout);
    controlsMoveTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMoveTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/view`, { method: "POST" });
};

playBtn.addEventListener("click", handlePlay);
video.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeRange);
video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("ended", handleEnded);
