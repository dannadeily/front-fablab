import React from "react";
import RegistrarCargo from "./RegistrarCargo";
import ListaCargo from "./ListaCargo";

const Cargo = () => {
  return (
    <div className="container md:flex z-40  ">
      <RegistrarCargo />
      <ListaCargo />
    </div>
  );
};

export default Cargo;
