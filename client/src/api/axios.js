import axios from 'axios';

// Create an axios instance
export const client = axios.create({
  baseURL: 'http://localhost:3001',
});
