import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000', // Endereço do seu servidor Express
  headers: {
    'Content-Type': 'application/json',
  },
});