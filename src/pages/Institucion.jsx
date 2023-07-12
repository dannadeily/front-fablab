import React from "react";
import RegistrarInstitucion from "./RegistrarInstitucion";
import ListaInstitucion from "./ListaInstitucion";

const Institucion = () => {
  return (
    <div className="container md:flex z-40">
      <RegistrarInstitucion />
      <ListaInstitucion />
    </div>
  );
};

export default Institucion;
