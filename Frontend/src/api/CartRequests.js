import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5000' });


export const addToCart = (item) => API.post(`/cart`, item);

export const updateCart = (updatedData, id) => API.put(`/cart/update/${id}`, updatedData);

export const getCarts = (id) => API.get(`cart/${id}`);


export const deleteCart = (id) => API.delete(`/cart`, id);

