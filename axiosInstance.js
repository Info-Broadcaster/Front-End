import axios from 'axios';
import Cookies from "js-cookie";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const handleInvalidToken = () => {
  Cookies.remove("token");
  window.location.href = "/";
};

const axiosInstance = axios.create({
  baseURL: apiUrl + "/api", 
  withCredentials: true, 
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 403 || error.response.data.message === 'Invalid token')
    ) {
      handleInvalidToken();
    }

    return Promise.reject(error);
  }
);

export const getToken = () => Cookies.get("token");

export default axiosInstance;
