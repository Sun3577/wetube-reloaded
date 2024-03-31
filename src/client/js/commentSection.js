const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const commentList = document.querySelector(".video__comment");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  span2.innerText = " ❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleClickX = async (event) => {
  const parentList = event.currentTarget.parentNode;
  const commentId = parentList.dataset.id;
  await fetch(`/api/comment/${commentId}`, {
    method: "DELETE",
  });
  parentList.remove();
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (commentList) {
  const span2 = commentList.querySelector("span:last-child");
  span2.addEventListener("click", handleClickX);
}
