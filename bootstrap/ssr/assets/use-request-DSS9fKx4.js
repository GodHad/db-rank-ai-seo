import "../ssr.js";
import axios from "axios";
const getVendors = async () => {
  const { data } = await axios.get("/api/get-vendors?countPerPage=5");
  return data.vendors;
};
const getRecentlyBlogs = async () => {
  const { data } = await axios.get("/api/get-blogs?countPerPage=3");
  return data.blogs;
};
export {
  getVendors as a,
  getRecentlyBlogs as g
};
