import React from "react";
import { Route, Navigate } from "react-router-dom";
import HeaderAdministrador from "../components/HeaderAdministrador";

const RutaProtegida = ({ component: Component, ...rest }) => {
  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    if (token) {
      // Verificar la fecha de expiración del token
      const tokenExpiration = localStorage.getItem("tokenExpiration");
      if (tokenExpiration && new Date(tokenExpiration) < new Date()) {
        // El token ha expirado, borrarlo y redirigir al usuario a la página de inicio
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        return false;
      }
      return true;
    }
    return false;
  };
  const isAuthenticated = checkAuthentication(); // Verificar si el token existe en el almacenamiento local

  return (
    <>{isAuthenticated ? <HeaderAdministrador /> : <Navigate to="/login" />}</>
  );
};

export default RutaProtegida;
