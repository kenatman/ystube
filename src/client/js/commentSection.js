const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = (e) => {
  e.preventDefault();
  const textarea = form.querySelector(`textarea`);
  const text = textarea.value;
  console.log(text);
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
