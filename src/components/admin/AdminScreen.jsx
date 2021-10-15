import React, { useState } from 'react'
import { NavBar } from '../ticket/NavBar'
import { TablaScreen } from './TablaScreen'

import moment from 'moment';

moment.locale('es-mx');
export const AdminScreen = () => {
    // const [fechaInicio, setFechaInicio] = useState(moment().format("YYYY-MM-DD[T]HH:mm"));
    const [fechaInicio, setFechaInicio] = useState('');
    const handleDateInicioChange = (e)=> {
        setFechaInicio(moment(e.target.value).format("YYYY-MM-DD[T]HH:mm"));
    }
    // const [fechaFin, setfechaFin] = useState(moment().add(1, "h").format("YYYY-MM-DD[T]HH:mm"));
    const [fechaFin, setfechaFin] = useState('');
    const handleDateFinChange = (e)=> {
        setfechaFin(moment(e.target.value).format("YYYY-MM-DD[T]HH:mm"));
    }
    // const [buscar, setBuscar] = useState(false);
    // const busqueda = (e) => {
    //     e.preventDefault();
    //     setBuscar(true);
    // }
    return (
        <div className="admin__container">
            <NavBar className="navbar-admin" />
            <div className="filtro__container">
                <div className="filtro-input">
                    <label htmlFor="fechaInicio">Desde</label>
                    <input 
                        type="datetime-local" 
                        name="fechaInicio" 
                        id="fechaInicio" 
                        value={fechaInicio}
                        onChange={handleDateInicioChange}
                    />
                </div>
                <div className="filtro-input">
                    <label htmlFor="fechaFin">Hasta</label>
                    <input 
                        type="datetime-local" 
                        name="fechaFin" 
                        id="fechaFin"
                        value={fechaFin} 
                        onChange={handleDateFinChange}
                        min={fechaInicio}
                    />
                </div>
                {/* <button
                    onClick={busqueda}
                >Ejecutar</button> */}
            </div>
            <TablaScreen fechaInicio={fechaInicio} fechaFin={fechaFin} />
            {/* {
                buscar && <TablaScreen fechaInicio={fechaInicio} fechaFin={fechaFin} />
            } */}
            <div className="input__container">
                <button className="btn-">Exportar</button>
            </div>
        </div>
    )
}
