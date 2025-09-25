import axios from 'axios';
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/auth';

export const registerUser = (payload) => axios.post(`${API}/register`, payload).then(r => r.data);
export const loginUser = (payload) => axios.post(`${API}/login`, payload).then(r => r.data);
export const getMe = (token) => axios.get(`${API}/me`, { headers: { Authorization: `Bearer ${token}` } }).then(r => r.data);

// helper
export const saveToken = (token) => localStorage.setItem('token', token);
export const getToken = () => localStorage.getItem('token');
export const removeToken = () => localStorage.removeItem('token');
