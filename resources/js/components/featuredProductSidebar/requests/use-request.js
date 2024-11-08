import axios from '../../../variables/axiosConfig';

const getFeaturedProducts = async () => {
    const { data } = await axios.get('/api/get-featured-products?published=1&type=sidebar');
    const res = await axios.get('/api/get-featured-products?published=1&type=top');
    return { side: data.featured_products, top: res.data.featured_products };
}

export {
    getFeaturedProducts
}