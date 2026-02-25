import axios from "axios";
import {resume} from "react-dom/server";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {'Content-Type': 'application/json'}
});

apiClient.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if(token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
      const {response} = error;
      if(response){
        switch (response.status){
          case 401:
            console.error('Error 401; Invalid login session');
            break;
          case 403:
            console.error('Error 403; Invalid user permissions');
            break;
          case 500:
            console.error('Error 500; Internal error');
            break;
          default:
            console.error(response.data.message || 'Request failed')
        }
      }
      return Promise.reject(error)
    }
)

export default apiClient;