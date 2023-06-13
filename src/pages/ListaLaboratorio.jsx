import React, { useState, useEffect } from "react";
import conexionAxios from "../axios/Axios";
import ruta from "../config/rutaBackend";

const ListaLaboratorio = () => {
  const [laboratorio, setLaboratorio] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await conexionAxios.get("/laboratory");
        setLaboratorio(response.data.message);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {laboratorio && laboratorio.length ? (
        <>
          <h2 className="font-black text-2xl text-center ">Laboratorios</h2>

          <p className="text-xl mt-5 mb-10 text-center">
            Administra los {""}
            <span className="text-indigo-600 font-bold text-xl ">
              laboratorios
            </span>
          </p>

          {laboratorio.map((laboratorioItem) => (
            <div
              key={laboratorioItem.id}
              className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl"
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src={ruta + "/" + laboratorioItem.urlImage}
                  alt="Imagen"
                  className="rounded-lg h-52 w-80"
                />
                <div>
                  <p className="font-bold mb-3 text-gray-700 uppercase">
                    Nombre del laboratorio:{" "}
                    <span className="font-normal normal-case">
                      {laboratorioItem.name}
                    </span>
                  </p>
                  <p className="font-bold mb-3 text-gray-700 uppercase">
                    Descripcion:{" "}
                    <span className="font-normal normal-case">
                      {laboratorioItem.description}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-2xl text-center">
            No hay laboratorios
          </h2>
        </>
      )}
    </div>
  );
};

export default ListaLaboratorio;
