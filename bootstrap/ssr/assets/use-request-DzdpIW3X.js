import "../ssr.js";
import axios from "axios";
const getEncyclopedias = async () => {
  const { data } = await axios.get("/api/get-encyclopedias");
  return data.encyclopedias;
};
const createEncyclopedia = async ({ encyclopedia }) => {
  const { data } = await axios.post("/api/create-encyclopedia", encyclopedia);
  return data;
};
const updateEncyclopedia = async ({ id, encyclopedia }) => {
  const { data } = await axios.post(`/api/update-encyclopedia?id=${id}`, encyclopedia);
  return data;
};
const deleteEncyclopedia = async (id) => {
  await axios.delete(`/api/delete-encyclopedia?id=${id}`);
};
export {
  createEncyclopedia as c,
  deleteEncyclopedia as d,
  getEncyclopedias as g,
  updateEncyclopedia as u
};
