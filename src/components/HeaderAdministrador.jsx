import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const HeaderAdministrador = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar el token del almacenamiento local
    navigate("/login"); // Redirigir a la página de inicio de sesión
  };
  return (
    <>
      <header>
        <nav
          className="relative flex w-full items-center justify-between  shadow-lg  dark:bg-gray-800 md:flex-wrap md:justify-start"
          data-te-navbar-ref
        >
          <img
            src="/public/Logo-FABLAB-PNG-horizontal.png"
            width="200"
            height="200"
            alt="logo fablab"
          />
          <div class="flex justify-center mt-4 px-10">
            <Link to="carrera"> <button class="text-white mx-2">Carreras</button></Link>
            <Link to="laboratorio"><button class="text-white mx-2">Laboratorios</button></Link>
            <Link to="reporte"> <button class="text-white mx-2">Reportes</button></Link>

          </div>

          <button
            className="flex items-center px-4 py-2 rounded ml-auto"
            onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white mr-2 flex-shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            <span className="text-white">Salir</span>
          </button>
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
};

export default HeaderAdministrador;
