import { postController } from "./postController.js";

export const modalController = {
  openModal: () => {
    document.getElementById("modal").style.display = "grid";
  },
  closeModal: () => {
    document.getElementById("modal-wrapper").scrollTop = 0;
    document.getElementById("modal").style.display = "none";
  },
  updateModalData: (post) => {
    postController.updateActualPost(post);
    updateTitle(post);
    updateBody(post);
    updateComments(post);
  },
};

function updateTitle({ title }) {
  document.getElementById("modal-post-title").innerText = title;
}

function updateBody({ body }) {
  document.getElementById("modal-post-body").innerText = body;
}

function updateComments({ comments }) {
  const commentsHTML = comments
    .map(
      ({ email, body }) => `
  <div class="post-comment">
    <span class="post-comment-user">${email}</span>
    <p class="post-comment-body">
      ${body}
    </p>
  </div>
  `
    )
    .join("");

  document.getElementById("modal-comments-wrapper").innerHTML = commentsHTML;
}
