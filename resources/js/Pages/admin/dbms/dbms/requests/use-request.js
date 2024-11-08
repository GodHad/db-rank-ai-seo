import axios from "@/variables/axiosConfig";

const getCategories = async () => {
    const { data } = await axios.get('/api/get-categories');
    return data.categories;
}

const getVendors = async (country = ' ') => {
    const { data } = await axios.get(`/api/get-vendors?country=${country}`);
    return data.vendors;
}

const createVendor = async ({ vendor }) => {
    const { data } = await axios.post('/api/create-vendor', vendor);
    return data;
}

const updateVendor = async ({ id, vendor }) => {
    const { data } = await axios.post(`/api/update-vendor?id=${id}`, vendor);
    return data;
}

const deleteVendor = async (id) => {
    await axios.delete(`/api/delete-vendor?id=${id}`);
}

export {
    getCategories,
    getVendors,
    createVendor,
    updateVendor,
    deleteVendor
}