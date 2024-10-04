import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://infobroadcaster-backend.onrender.com/api', 
  withCredentials: true, 
});

export default axiosInstance;
