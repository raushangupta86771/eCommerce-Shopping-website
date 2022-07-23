import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });


export const getAllProducts = () => API.get(`/product`);

export const getSingleProduct = (id) => API.get(`/product/getProduct/${id}`);