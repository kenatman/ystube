const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComments = (text) => {
  const commentsUl = document.querySelector(`.video__comments ul`);
  const li = document.createElement("li");
  li.className = `video__comment`;
  const i = document.createElement("i");
  i.className = `fas fa-comment`;
  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(i);
  li.appendChild(span);
  commentsUl.prepend(li);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const textarea = form.querySelector(`textarea`);
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === ``) {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    //headers : information about request
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  textarea.value = "";
  if (response.status === 201) {
    addComments(text);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
