const baseUrl = "http://localhost:9090/api";

export const apiUrls = {
  getAllPost: `${baseUrl}/post/getAllPosts`,
  deletePostById: `${baseUrl}/post/deletePostById`,
  getPostDetailById: `${baseUrl}/post/getPostById`,
  savePost: `${baseUrl}/post/addPost`,
  updatePost: `${baseUrl}/post/updatePost`,
  register: `${baseUrl}/auth/register`,
  login: `${baseUrl}/auth/login`
};
