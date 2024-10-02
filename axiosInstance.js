import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:443', 
  withCredentials: true, 
});

export default axiosInstance;
