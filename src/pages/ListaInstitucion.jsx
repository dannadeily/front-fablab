import React, { useState, useEffect } from "react";
import conexionAxios from "../axios/Axios";
const ListaInstitucion = () => {
    const [name, setName] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await conexionAxios.get("/institution");
          setName(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
        {name && name.length ? (
          <>
            <h2 className="font-black text-2xl text-center">
              listado de las instituciones
            </h2>
  
            <p className="text-xl mt-5 mb-10 text-center">
              Administra las {""}
              <span className="text-indigo-600 font-bold text-xl ">
                instituciones
              </span>
            </p>
  
            {name.map((institucionItem) => (
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
              <span className="text-indigo-600 font-bold text-xl ">
                y apareceran en este lugar
              </span>
            </p>
          </>
        )}
      </div>
    );
}

export default ListaInstitucion
