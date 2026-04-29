import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (email, password) => api.post('/auth/login', { email, password });
export const signup = (email, password) => api.post('/auth/signup', { email, password });
export const getTasks = () => api.get('/tasks');
export const createTask = (title) => api.post('/tasks', { title });
export const updateTaskStatus = (id, status) => api.put(`/tasks/${id}`, { status });
export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export default api;
