import axios from 'axios';
import Cookies from "js-cookie";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const handleInvalidToken = () => {
  Cookies.remove("token");
  // rediriger vers la page de connexion
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
    // Vérifie si l'erreur est liée à un token invalide
    if (
      error.response &&
      (error.response.status === 403 || error.response.data.message === 'Invalid token')
    ) {
      // retirer le cookie du token
      handleInvalidToken();
    }

    // Propager l'erreur pour permettre à l'appelant de la gérer aussi
    return Promise.reject(error);
  }
);

export default axiosInstance;
