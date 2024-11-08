import "../ssr.js";
import axios from "axios";
const getVendors = async () => {
  const { data } = await axios.get("/api/get-vendor-managers");
  return data.vendors.map((vendor) => ({ ...vendor.user, approved: vendor.approved, author: vendor.author, userRoleId: vendor.id }));
};
const createVendor = async ({ vendor }) => {
  const { data } = await axios.post("/api/create-vendor-manager", vendor);
  return data;
};
const updateVendor = async ({ vendor }) => {
  const { data } = await axios.post(`/api/update-vendor-manager?id=${vendor.id}`, vendor);
  return data;
};
const deleteVendor = async (id) => {
  await axios.delete(`/api/delete-vendor-manager?id=${id}`);
};
export {
  createVendor as c,
  deleteVendor as d,
  getVendors as g,
  updateVendor as u
};
