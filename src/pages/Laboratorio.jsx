import React from 'react'
import RegistrarLaboratorio from './RegistrarLaboratorio';
import ListaLaboratorio from './ListaLaboratorio';

const Laboratorio = () => {
  return (
    <div className="container md:flex z-40  ">
    <RegistrarLaboratorio/>
    <ListaLaboratorio/>
    </div>
  )
}

export default Laboratorio