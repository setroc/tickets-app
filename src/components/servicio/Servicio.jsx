import React from 'react'

import Tipo from '../tipo/Tipo';
import Lugar from './../lugar/Lugar';

const Servicio = ({lugar, setLugar, tipo, setTipo}) => {
    return (
        <div className="input__container radio">
            <Lugar lugar={lugar} setLugar={setLugar}/>
            <Tipo tipo={tipo} setTipo={setTipo} />
        </div>
    )
}

export default Servicio
