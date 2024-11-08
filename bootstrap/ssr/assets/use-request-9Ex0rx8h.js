import "../ssr.js";
import axios from "axios";
const getFeaturedProducts = async (type) => {
  const { data } = await axios.get(`/api/get-featured-products?type=${type}`);
  return data.featured_products;
};
const createFeaturedProduct = async ({ featuredProduct, type }) => {
  const { data } = await axios.post(`/api/create-featured-product?type=${type}`, featuredProduct);
  return data;
};
const updateFeaturedProduct = async ({ featuredProduct }) => {
  const { data } = await axios.post(`/api/update-featured-product`, featuredProduct);
  return data;
};
const deleteFeaturedProduct = async (id) => {
  await axios.delete(`/api/delete-featured-product?id=${id}`);
};
export {
  createFeaturedProduct as c,
  deleteFeaturedProduct as d,
  getFeaturedProducts as g,
  updateFeaturedProduct as u
};
