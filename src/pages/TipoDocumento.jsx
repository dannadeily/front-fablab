import React from "react";
import RegistrarTipoDocumento from "./RegistrarTipoDocumento";
import ListaTipoDocumento from "./ListaTipoDocumento";

const TipoDocumento = () => {
  return (
    <div className="container md:flex z-40">
      <RegistrarTipoDocumento />
      <ListaTipoDocumento />
    </div>
  );
};

export default TipoDocumento;
