import React, { useState, useEffect } from "react";
import conexionAxios from "../axios/Axios";

const ListaCarrera = () => {
    const [carrera, setCarrera] = useState([]);
    // Agregar estado local para la carrera seleccionada
    const [selectedCarrera, setSelectedCarrera] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await conexionAxios.get("/academyProgram");
                const carrerasWithIsEnabled = response.data.message.map(
                    (carrera) => ({
                        ...carrera,
                        isEnabled: carrera.status,
                    })
                );
                setCarrera(carrerasWithIsEnabled);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleToggleEstado = async (id) => {
        try {
            const res = await conexionAxios.put(
                `/academyProgram/changeState/${id}`
            );

            if (res.status === 200) {
                setCarrera((prevState) =>
                    prevState.map((carrera) =>
                        carrera.id === id
                            ? { ...carrera, isEnabled: !carrera.isEnabled }
                            : carrera
                    )
                );

                // Actualizar la carrera seleccionada localmente
                setSelectedCarrera((prevSelected) =>
                    prevSelected?.id === id
                        ? {
                              ...prevSelected,
                              isEnabled: !prevSelected.isEnabled,
                          }
                        : prevSelected
                );
            }
        } catch (error) {
            // Manejar el error de la solicitud
        }
    };

    return (
        <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
            {carrera && carrera.length ? (
                <>
                    <h2 className="font-black text-2xl text-center">
                        Listado de las Carreras
                    </h2>

                    <p className="text-xl mt-5 mb-10 text-center">
                        Administra las {""}
                        <span className="text-indigo-600 font-bold text-xl ">
                            carreras
                        </span>
                    </p>

                    {carrera.map((carrera) => (
                        <div
                            key={carrera.id}
                            className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl"
                        >
                            <p className="font-bold mb-3 text-gray-700 uppercase">
                                Materia:{" "}
                                <span className="font-normal normal-case">
                                    {carrera.name}
                                </span>
                            </p>
                            <p className="font-bold mb-3 text-gray-700 uppercase">
                                Codigo:{" "}
                                <span className="font-normal normal-case">
                                    {carrera.code}
                                </span>
                            </p>
                            <div className="flex justify-between ">
                                <button
                                    className={`ml-2 text-white rounded-lg px-3 py-1 text-sm ${
                                        selectedCarrera &&
                                        selectedCarrera.id === carrera.id
                                            ? selectedCarrera.isEnabled
                                                ? "bg-green-500"
                                                : "bg-red-500"
                                            : carrera.isEnabled
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                    }`}
                                    onClick={() =>
                                        handleToggleEstado(carrera.id)
                                    }
                                >
                                    {/* Actualizar el texto del botón según el estado de la carrera seleccionada */}
                                    {selectedCarrera &&
                                    selectedCarrera.id === carrera.id
                                        ? selectedCarrera.isEnabled
                                            ? "Habilitado"
                                            : "Deshabilitado"
                                        : carrera.isEnabled
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
                        No hay carreras
                    </h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Comienza agregando carreras {""}
                        <span className="text-indigo-600 font-bold text-xl ">
                            y aparecerán en este lugar
                        </span>
                    </p>
                </>
            )}
        </div>
    );
};

export default ListaCarrera;
