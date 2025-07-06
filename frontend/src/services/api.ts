import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

interface LoginData {
  email: string;
  password: string;
}

interface TodoData {
  title?: string;
  description?: string;
  completed?: boolean;
}

export const api = {
  // Auth endpoints
  signup: async (data: LoginData) => {
    const response = await axios.post(`${API_URL}/auth/signup`, data);
    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await axios.post(`${API_URL}/auth/login`, data);
    return response.data;
  },

  // Todo endpoints
  getTodos: async () => {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data;
  },

  createTodo: async (data: TodoData) => {
    const response = await axios.post(`${API_URL}/todos`, data);
    return response.data;
  },

  updateTodo: async (id: string, data: TodoData) => {
    const response = await axios.patch(`${API_URL}/todos/${id}`, data);
    return response.data;
  },

  deleteTodo: async (id: string) => {
    const response = await axios.delete(`${API_URL}/todos/${id}`);
    return response.data;
  }
};