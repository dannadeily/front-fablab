import React from "react";

const ListaLaboratorio = () => {
  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {/* {pacientes && pacientes.length ? ( */}

      <h2 className="font-black text-2xl text-center">
        listados de laboratorios
      </h2>

      <p className="text-xl mt-5 mb-10 text-center">
        Adminsitra los {""}
        <span className="text-indigo-600 font-bold text-xl ">laboratorios</span>
      </p>

      {/* {pacientes.map((paciente) => (
       <Paciente  key={paciente.id} paciente={paciente} setPaciente={setPaciente} eliminarPaciente={eliminarPaciente}/>
     ))} */}

      {/* </> ) : (<> */}
      <h2 className="font-black text-2xl text-center">No hay laboratorios</h2>
      <p className="text-xl mt-5 mb-10 text-center">
        Comienza agregando laboratorios {""}
        <span className="text-indigo-600 font-bold text-xl ">
          y apareceran en este lugar
        </span>
      </p>

      {/* </>) } */}
    </div>
  );
};

export default ListaLaboratorio;
