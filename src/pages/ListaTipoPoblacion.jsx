import React, { useState, useEffect } from "react";
import conexionAxios from "../axios/Axios";

const ListaTipoPoblacion = () => {
  const [poblacion, setPoblacion] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await conexionAxios.get("/populationTypes");
        setPoblacion(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleToggleEstado = async (id) => {
    try {
      const res = await conexionAxios.put(`/populationTypes/changeState/${id}`);

      if (res.status === 200) {
        setPoblacion((prevState) =>
          prevState.map((poblacionItem) =>
            poblacionItem.id === id
              ? { ...poblacionItem, status: !poblacionItem.status }
              : poblacionItem
          )
        );
      }
    } catch (error) {
      // Manejar el error de la solicitud
    }
  };
  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {poblacion && poblacion.length ? (
        <>
          <h2 className="font-black text-2xl text-center">
            listado de tipos de población
          </h2>

          <p className="text-xl mt-5 mb-10 text-center">
            Administra los {""}
            <span className="text-indigo-600 font-bold text-xl ">
              tipos de población
            </span>
          </p>

          {poblacion.map((poblacionItem) => (
            <div
              key={poblacionItem.id}
              className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl"
            >
              <p className="font-bold mb-3 text-gray-700 uppercase">
                Nombre:{" "}
                <span className="font-normal normal-case">
                  {poblacionItem.name}
                </span>
              </p>
              <div className="flex justify-between ">
                <button
                  className={`ml-2 text-white rounded-lg px-3 py-1 text-sm ${
                    poblacionItem.status ? "bg-green-500" : "bg-red-500"
                  }`}
                  onClick={() => handleToggleEstado(poblacionItem.id)}
                >
                  {poblacionItem.status ? "Habilitado" : "Deshabilitado"}
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-2xl text-center">
            No hay tipo de de poblaciones registradas
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando alguna población {""}
            <span className="text-indigo-600 font-bold text-xl ">
              y apareceran en este lugar
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default ListaTipoPoblacion;
