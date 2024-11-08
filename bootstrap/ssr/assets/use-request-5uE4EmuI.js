import "../ssr.js";
import axios from "axios";
const getPageContent = async (page) => {
  const { data } = await axios.get(`/api/get-content?page=${page}`);
  return data.content;
};
const savePageContent = async (form) => {
  const { data } = await axios.post("/api/save-page-content", form);
  return data;
};
export {
  getPageContent as g,
  savePageContent as s
};
