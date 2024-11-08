import "../ssr.js";
import axios from "axios";
const getSponsors = async (featured) => {
  const { data } = await axios.get(`/api/get-sponsors?featured=${featured}`);
  return data.sponsors;
};
const createSponsor = async ({ sponsor }) => {
  const { data } = await axios.post("/api/create-sponsor", sponsor);
  return data;
};
const updateSponsor = async ({ sponsor }) => {
  const { data } = await axios.post(`/api/update-sponsor`, sponsor);
  return data;
};
const deleteSponsor = async (id) => {
  await axios.delete(`/api/delete-sponsor?id=${id}`);
};
export {
  createSponsor as c,
  deleteSponsor as d,
  getSponsors as g,
  updateSponsor as u
};
