import axios from "axios";
import ruta from "../config/rutaBackend";

const conexionAxios = axios.create({
  baseURL: ruta,
});

conexionAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Reemplaza con tu token de autenticación válido

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default conexionAxios;
