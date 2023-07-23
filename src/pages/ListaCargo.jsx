import React, { useState, useEffect } from "react";
import conexionAxios from "../axios/Axios";

const ListaCargo = () => {
  const [name, setName] = useState([]);
   // Agregar estado local para el laboratorio seleccionado
   const [selectedLaboratorio, setSelectedLaboratorio] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await conexionAxios.get("/role");
        setName(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const handleToggleEstado = async (id) => {
    try {
      const res = await conexionAxios.put(`/laboratory/changeState/${id}`);
  
      if (res.status === 200) {
        setLaboratorio((prevState) =>
          prevState.map((poblacionItem) =>
            poblacionItem.id === id
              ? { ...poblacionItem, isEnabled: !poblacionItem.isEnabled }
              : poblacionItem
          )
        );

        // Actualizar el laboratorio seleccionado localmente
        setSelectedLaboratorio((prevSelected) =>
          prevSelected?.id === id ? { ...prevSelected, isEnabled: !prevSelected.isEnabled } : prevSelected
        );
      }
    } catch (error) {
      // Manejar el error de la solicitud
    }
  };

  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {name && name.length ? (
        <>
          <h2 className="font-black text-2xl text-center">listado de cargos</h2>

          <p className="text-xl mt-5 mb-10 text-center">
            Administra los {""}
            <span className="text-indigo-600 font-bold text-xl ">
              tipos de cargos
            </span>
          </p>

          {name.map((poblacionItem) => (
            <div
              key={poblacionItem.id}
              className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl"
            >
              <p className="font-bold mb-3 text-gray-700 uppercase">
                Nombre:{" "}
                <span className="font-normal normal-case">
                  {poblacionItem.population_type}
                </span>
              </p>
              <div className="flex justify-between ">
                <button
                  className={`ml-2 text-white rounded-lg px-3 py-1 text-sm ${
                    selectedLaboratorio &&
                    selectedLaboratorio.id === poblacionItem.id
                      ? selectedLaboratorio.isEnabled
                        ? "bg-green-500"
                        : "bg-red-500"
                      : poblacionItem.isEnabled
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                  onClick={() => handleToggleEstado(poblacionItem.id)}
                >
                  {/* Actualizar el texto del botón según el estado del laboratorio seleccionado */}
                  {selectedLaboratorio &&
                  selectedLaboratorio.id === poblacionItem.id
                    ? selectedLaboratorio.isEnabled
                      ? "Habilitado"
                      : "Deshabilitado"
                    : poblacionItem.isEnabled
                    ? "Habilitado"
                    : "Deshabilitado"}
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-2xl text-center">
            No hay cargos registrados
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comienza agregando cargo {""}
            <span className="text-indigo-600 font-bold text-xl ">
              y apareceran en este lugar
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default ListaCargo;
