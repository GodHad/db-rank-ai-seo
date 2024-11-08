import "../ssr.js";
import axios from "axios";
const getBlogs = async ({ categories = [], tags = [], page = 1, countPerPage = 10 }) => {
  const { data } = await axios.get(`/api/get-blogs?categories=${categories.join(",")}&tags=${tags.join(",")}&page=${page}&countPerPage=${countPerPage}`);
  return data.blogs;
};
const getTags = async () => {
  const { data } = await axios.get("/api/blog/get-tags");
  return data.tags;
};
const getCategories = async () => {
  const { data } = await axios.get("/api/blog/get-categories");
  return data.categories;
};
const getBlog = async (id) => {
  const { data } = await axios.get(`/api/get-blog?id=${id}`);
  return data.blog;
};
const createBlog = async ({ blog }) => {
  const { data } = await axios.post("/api/create-blog", blog);
  return data;
};
const updateBlog = async ({ id, blog }) => {
  const { data } = await axios.post(`/api/update-blog?id=${id}`, blog);
  return data;
};
const deleteBlog = async (id) => {
  await axios.delete(`/api/delete-blog?id=${id}`);
};
export {
  getTags as a,
  getBlogs as b,
  createBlog as c,
  getBlog as d,
  deleteBlog as e,
  getCategories as g,
  updateBlog as u
};
