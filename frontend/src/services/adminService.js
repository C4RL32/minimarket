import axios from 'axios';
const API = 'http://localhost:5000/api';

export const getProducts = () => axios.get(`${API}/admin/products`);
export const createProduct = (data) => axios.post(`${API}/admin/products`, data);
export const deleteProduct = (name) => axios.delete(`${API}/admin/products/${name}`);
export const updateProduct = (name, data) => axios.put(`${API}/admin/products/${name}`, data);