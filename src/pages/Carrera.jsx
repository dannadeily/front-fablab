import { useState, useEffect } from "react";
import RegistrarCarrera from "./RegistrarCarrera";
import ListaCarrera from "./ListaCarrera";

const Carrera = () => {
  return<div className="container md:flex z-40  ">
    <RegistrarCarrera/>
    <ListaCarrera/>
    </div>;
};

export default Carrera;
