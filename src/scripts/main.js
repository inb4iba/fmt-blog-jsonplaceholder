import { domController } from "../controllers/domController.js";
import { modalController } from "../controllers/modalController.js";
import { postController } from "../controllers/postController.js";

let page = 1,
  limit = 20;

const loadPosts = async () => {
  const posts = await postController.getPosts(page, limit);
  domController.addPosts(posts);
};

document.getElementById("load-posts-btn").addEventListener("click", () => {
  page++;
  loadPosts();
});

document
  .getElementById("modal")
  .addEventListener("click", () => modalController.closeModal());

document
  .getElementById("modal-wrapper")
  .addEventListener("click", (e) => e.stopPropagation());

window.openPostModal = (id, title, body) => {
  console.log(id, title, body);
};

loadPosts();
