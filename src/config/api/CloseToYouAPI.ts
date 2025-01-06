import axios from 'axios';
import {API_URL} from '@env';
import {DataStorage} from '../../adapters/data-storage/AsyncStorage';

const CloseToYouAPI = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

//TODO: interceptors
CloseToYouAPI.interceptors.request.use(async config => {
  // Add token to header if exists in storage for the requests
  const token = await DataStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export {CloseToYouAPI};
