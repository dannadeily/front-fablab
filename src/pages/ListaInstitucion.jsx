import React, { useState, useEffect } from "react";
import conexionAxios from "../axios/Axios";


const ListaInstitucion = () => {
  const [institucion, setInstitucion] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await conexionAxios.get("/institution");
      setInstitucion(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleEstado = async (id) => {
    try {
      const res = await conexionAxios.put(`/institution/changeState/${id}`);

      if (res.status === 200) {
        setInstitucion((prevRoles) =>
          prevRoles.map((institucionItem) =>
            institucion.id === id
              ? { ...institucionItem, status: !institucionItem.status }
              : institucionItem
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {institucion && institucion.length ? (
        <>
          <h2 className="font-black text-2xl text-center">
            Listado de las instituciones
          </h2>

          <p className="text-xl mt-5 mb-10 text-center">
            Administra las {""}
            <span className="text-indigo-600 font-bold text-xl">
              instituciones
            </span>
          </p>

          {institucion.map((institucionItem) => (
            <div
              key={institucionItem.id}
              className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl"
            >
              <p className="font-bold mb-3 text-gray-700 uppercase">
                Nombre:{" "}
                <span className="font-normal normal-case">
                  {institucionItem.name}
                </span>
              </p>
              <div className="flex justify-between">
                <button
                  className={`ml-2 text-white rounded-lg px-3 py-1 text-sm ${
                    institucionItem.status ? "bg-green-500" : "bg-red-500"
                  }`}
                  onClick={() => handleToggleEstado(institucionItem.id)}
                >
                  {institucionItem.status ? "Habilitado" : "Deshabilitado"}
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-2xl text-center">
            No hay instituciones registradas
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando una institución {""}
            <span className="text-indigo-600 font-bold text-xl">
              y aparecerán en este lugar
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default ListaInstitucion;
