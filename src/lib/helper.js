export const saveDataPost = data =>
  window.sessionStorage.setItem("posts:db", JSON.stringify(data));

export const getDataPost = () => {
  const posts = window.sessionStorage.getItem("posts:db");
  if (posts !== null) {
    return JSON.parse(posts);
  }
  return [];
};
