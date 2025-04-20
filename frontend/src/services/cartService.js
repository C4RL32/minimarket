import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const sendOrder = (data) => axios.post(`${API_URL}/order`, { items: data });
