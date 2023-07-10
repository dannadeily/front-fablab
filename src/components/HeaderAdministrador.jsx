import React, { useState, useCallback, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const HeaderAdministrador = () => {
  const [openMenu2, setOpenMenu2] = useState("");
  const handleClick2 = (menuName) => {
    if (openMenu2 === menuName) {
      setOpenMenu2("");
    } else {
      setOpenMenu2(menuName);
    }
  };

  const handleClickOutside2 = useCallback(
    (event) => {
      if (!openMenu2) return;
      if (event.target.closest("#dropdownNavbar")) {
        setOpenMenu2(false);
      }
    },
    [openMenu2, setOpenMenu2]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside2);
    return () => {
      document.removeEventListener("click", handleClickOutside2);
    };
  }, [handleClickOutside2]);

  const [openMenu, setOpenMenu] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="bg-gray-800" data-te-navbar-ref>
          <div className="flex items-center justify-between">
            <button
              className="text-gray-900 dark:text-white md:hidden"
              onClick={handleMobileMenuToggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="hidden md:flex items-center">
              <Link to="/administrador">
                <img
                  src="/Logo-FABLAB-PNG-horizontal.png"
                  width="200"
                  height="200"
                  alt="logo fablab"
                />
              </Link>

              <Link to="/administrador">
                <button
                  onClick={handleMobileMenuClose}
                  className="py-2 px-3 rounded-md hover:bg-transparent hover:text-blue-700 text-white"
                >
                  Registrar asistencia
                </button>
              </Link>
              <Link to="carrera">
                <button
                  onClick={handleMobileMenuClose}
                  className="py-2 px-3 rounded-md hover:bg-transparent hover:text-blue-700 text-white"
                >
                  Carreras
                </button>
              </Link>
              <Link to="laboratorio">
                <button
                  onClick={handleMobileMenuClose}
                  className="py-2 px-3 rounded-md hover:bg-transparent hover:text-blue-700 text-white"
                >
                  Laboratorios
                </button>
              </Link>
              <div>
                <button
                  onClick={() => handleClick2("menu1")}
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className="flex py-2 px-3 rounded-md hover:bg-transparent hover:text-blue-700 text-white"
                >
                  Reportes
                  <svg
                    className="w-5 h-5 ml-1"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
                  </svg>
                </button>

                {openMenu2 === "menu1" && (
                  <div className="absolute z-10 block font-normal bg-white divide-y  rounded shadow  divide-gray-600">
                    <ul
                      id="dropdownNavbar"
                      className="py-1 text-sm text-gray-400"
                      aria-labelledby="dropdownLargeButton"
                    >
                      <Link
                        to="reportelaboratorio"
                        onClick={handleMobileMenuClose}
                      >
                        <li className="block px-4 py-2  text-black hover:bg-blue-300 hover:text-black">
                          <button type="button">Reporte por laboratorio</button>
                        </li>
                      </Link>
                      <Link to="reportecarrera" onClick={handleMobileMenuClose}>
                        <li className="block px-4 py-2  text-black hover:bg-blue-300 hover:text-black">
                          <button type="button">Reporte por carrera</button>
                        </li>
                      </Link>
                      <Link to="reporte" onClick={handleMobileMenuClose}>
                        <li className="block px-4 py-2  text-black hover:bg-blue-300 hover:text-black">
                          <button type="button">Reporte general</button>
                        </li>
                      </Link>
                    </ul>
                  </div>
                )}
              </div>
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
          </div>

          <div
            className={`${
              openMenu || isMobileMenuOpen ? "block" : "hidden"
            } md:hidden flex-col md:flex-row md:space-x-8  font-medium`}
          >
            <Link to="/administrador">
              <button
                onClick={handleMobileMenuClose}
                className="block py-2 px-3 rounded-md hover:bg-transparent hover:text-blue-700 text-white"
              >
                Registrar asistencia
              </button>
            </Link>
            <Link to="carrera">
              <button
                onClick={handleMobileMenuClose}
                className="block py-2 px-3 rounded-md hover:bg-transparent hover:text-blue-700 text-white"
              >
                Carreras
              </button>
            </Link>
            <Link to="laboratorio">
              <button
                onClick={handleMobileMenuClose}
                className="block py-2 px-3 rounded-md hover:bg-transparent hover:text-blue-700 text-white"
              >
                Laboratorios
              </button>
            </Link>
            <div>
              <button
                onClick={() => handleClick2("menu1")}
                id="dropdownNavbarLink"
                data-dropdown-toggle="dropdownNavbar"
                className="flex py-2 px-3 rounded-md hover:bg-transparent hover:text-blue-700 text-white"
              >
                Reportes
                <svg
                  className="w-5 h-5 ml-1"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
                </svg>
              </button>

              {openMenu2 === "menu1" && (
                <div className="absolute z-10 block font-normal bg-white divide-y  rounded shadow  divide-gray-600">
                  <ul
                    id="dropdownNavbar"
                    className="py-1 text-sm text-gray-400"
                    aria-labelledby="dropdownLargeButton"
                  >
                    <Link
                      to="reportelaboratorio"
                      onClick={handleMobileMenuClose}
                    >
                      <li className="block px-4 py-2  text-black hover:bg-blue-300 hover:text-black">
                        <button type="button">Reporte por laboratorio</button>
                      </li>
                    </Link>
                    <Link to="reportecarrera" onClick={handleMobileMenuClose}>
                      <li className="block px-4 py-2  text-black hover:bg-blue-300 hover:text-black">
                        <button type="button">Reporte por carrera</button>
                      </li>
                    </Link>
                    <Link to="reporte" onClick={handleMobileMenuClose}>
                      <li className="block px-4 py-2  text-black hover:bg-blue-300 hover:text-black">
                        <button type="button">Reporte general</button>
                      </li>
                    </Link>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
      <main className="container mt-24 z-40">
        <Outlet />
      </main>
    </>
  );
};

export default HeaderAdministrador;
