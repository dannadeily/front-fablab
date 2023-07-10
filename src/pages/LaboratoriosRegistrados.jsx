import React, { useState, useEffect } from "react";
import conexionAxios from "../axios/Axios";
import ruta from "../config/rutaBackend";

const LaboratoriosRegistrados = () => {
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
    <div className="flex justify-center items-center flex-col">
      {laboratorio && laboratorio.length ? (
        <>
          <h2 className="font-black text-2xl text-center mb-5">
            Aulas
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {laboratorio.map((laboratorioItem) => (
              <div
                key={laboratorioItem.id}
                className="mx-5 my-5 shadow-md px-5 py-5 rounded-xl border border-black border-spacing-2 "
              >
                <div className="grid grid-cols-2 gap-4 ">
                  <div>
                    <img
                      src={ruta + "/" + laboratorioItem.urlImage}
                      alt="Imagen"
                      className=" rounded-lg h-52 w-96"
                    />
                  </div>

                  <div>
                    <p className="font-bold mb-3 uppercase text-center">
                      {laboratorioItem.name}
                    </p>
                    <p className="font-normal normal-case">
                      {laboratorioItem.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="font-black text-2xl text-center">
            No hay laboratorios
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando laboratorios {""}
            <span className="text-indigo-600 font-bold text-xl ">
              y apareceran en este lugar
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default LaboratoriosRegistrados;
