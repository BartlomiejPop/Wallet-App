import Axios from 'axios';
import { API_URL } from './index';

export const http = Axios.create({
  baseURL: `${API_URL}`,
});

export const httpAuth = Axios.create({
  baseURL: `${API_URL}`,
});

const getToken = () => {
  const accessToken = localStorage.getItem('accessToken');

  return accessToken;
};

httpAuth.interceptors.request.use(function (config) {
  if (config.headers) config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});

httpAuth.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status === 401) {
      localStorage.removeItem('accessToken');
    }
    return Promise.reject(error);
  },
);
