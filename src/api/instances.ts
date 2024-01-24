import axios from 'axios';
export const API_URL = 'https://randomuser.me/api';

export const instance = axios.create({
  baseURL: API_URL,
});
