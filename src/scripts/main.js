import { domController } from "../controllers/domController.js";
import { modalController } from "../controllers/modalController.js";
import { postController } from "../controllers/postController.js";

let page = 1,
  limit = 20,
  element;

const loadPosts = async () => {
  if (element) intersectionObserver.unobserve(element);

  const posts = await postController.getPosts(page, limit);
  element = domController.addPosts(posts);

  if (!element) {
    document.querySelector(".lds-dual-ring").style.display = "none";
    return;
  }
  page++;
  intersectionObserver.observe(element);
};

const intersectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      loadPosts();
    }
  });
});

document
  .getElementById("modal")
  .addEventListener("click", () => modalController.closeModal());

document
  .getElementById("modal-wrapper")
  .addEventListener("click", (e) => e.stopPropagation());

loadPosts();
