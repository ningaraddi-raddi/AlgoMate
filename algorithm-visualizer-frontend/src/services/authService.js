import axios from 'axios';
const API ='https://algomate-p45p.onrender.com';

export const registerUser = (payload) => axios.post(`${API}/register`, payload).then(r => r.data);
export const loginUser = (payload) => axios.post(`${API}/login`, payload).then(r => r.data);
export const getMe = (token) => axios.get(`${API}/me`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

// helper
export const saveToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const removeToken = () => localStorage.removeItem('token');





