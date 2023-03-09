export const postController = {
  getPosts: async (page, limit) => {
    const loadBtn = document.getElementById("load-posts-btn");
    const posts = await fetchPosts(page, limit);
    if (posts.length === limit) loadBtn.style.display = "block";
    else loadBtn.style.display = "none";
    return posts;
  },
  getUser: async (id) => await fetchUser(id),
};

const fetchPosts = (page = 1, limit = 20) =>
  fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  )
    .then((res) => res.json())
    .then((res) => res);

const fetchUser = (id) =>
  fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then((res) => res.json())
    .then((res) => res.name);
