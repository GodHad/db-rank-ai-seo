import axios from '@/variables/axiosConfig';

const getPageContent = async (page) => {
    const { data } = await axios.get(`/api/get-content?page=${page}`);
    return data.content;
}

const savePageContent = async (form) => {
    const { data } = await axios.post('/api/save-page-content', form);
    return data
}

export {
    getPageContent,
    savePageContent
}