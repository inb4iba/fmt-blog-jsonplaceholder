import { modalController } from "./modalController.js";
import { postController } from "./postController.js";

export const domController = {
  addPosts: async (posts) => {
    await Promise.all(posts.map(async (post) => await createPost(post))).then(
      (res) =>
        res.forEach((el) =>
          document.getElementById("posts-wrapper").appendChild(el)
        )
    );
  },
};

const createPost = async (post) => {
  const postDiv = document.createElement("div");
  postDiv.id = `post-${post.id}`;
  postDiv.classList = "post";

  const postBtn = document.createElement("button");
  postBtn.addEventListener("click", () => updatePostModal(post));

  const postTitle = document.createElement("h4");
  postTitle.classList = "post-title";
  postTitle.textContent = post.title;
  postBtn.appendChild(postTitle);
  postDiv.appendChild(postBtn);

  const postBody = document.createElement("p");
  postBody.classList = "post-body";
  postBody.textContent = post.body;
  postDiv.appendChild(postBody);

  const postUser = document.createElement("span");
  postUser.classList = "post-user";
  postUser.textContent = post.userId;
  postDiv.appendChild(postUser);

  return postDiv;
};

const updatePostModal = async (post) => {
  if (!postController.isPostOnModal(post.id)) {
    const comments = await postController.getComments(post.id);
    post = { ...post, ...comments };
    modalController.updateModalData(post);
  }
  modalController.openModal();
};
