let actualPost = {};

export const postController = {
  getPosts: async (page, limit) => {
    const loadBtn = document.getElementById("load-posts-btn");
    let posts = await fetchPosts(page, limit);
    posts = updateUsers(posts);
    if (posts.length === limit) loadBtn.style.display = "block";
    else loadBtn.style.display = "none";
    return posts;
  },
  getUser: async (id) => await fetchUser(id),
  getComments: async (id) => await fetchComments(id),
  isPostOnModal: (id) => actualPost.id === id,
  updateActualPost: (post) => (actualPost = { ...post }),
};

async function updateUsers(posts) {
  const users = await Promise.all(
    posts.map(async (post) => await postController.getUser(post.userId))
  );
  posts = posts.map((post, idx) => {
    return { ...post, ...users[idx] };
  });
  return posts;
}

const fetchPosts = (page = 1, limit = 20) =>
  fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  )
    .then((res) => res.json())
    .then((res) => res);

const fetchUser = (id) =>
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((res) => res.json())
    .then((res) => {
      return { userId: res.name };
    });

const fetchComments = (id) =>
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then((res) => res.json())
    .then((res) => {
      return { comments: res };
    });
