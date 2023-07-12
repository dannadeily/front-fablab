import React from 'react'
import RegistrarTipoPoblacion from './RegistrarTipoPoblacion'
import ListaTipoPoblacion from './ListaTipoPoblacion'

const TipoPoblacion = () => {
  return (
    <div className="container md:flex z-40">
    <RegistrarTipoPoblacion />
    <ListaTipoPoblacion />
  </div>
  )
}

export default TipoPoblacion