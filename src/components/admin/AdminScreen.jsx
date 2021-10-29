import React, { useState } from 'react'

import moment from 'moment';

import { TablaScreen } from './TablaScreen'
import { NavBar } from './../navbar/NavBar';

moment.locale('es-mx');
const initialValues = {
    inicio : moment().set({hour:0, minute:0}).format("YYYY-MM-DD[T]HH:mm"),
    fin: moment().set({hour:23,minute:59}).format("YYYY-MM-DD[T]HH:mm")
}
export const AdminScreen = () => {

    const [fechaInicio, setFechaInicio] = useState(initialValues.inicio);
    // const [fechaInicio, setFechaInicio] = useState('');
    const handleDateInicioChange = (e)=> {
        setFechaInicio(moment(e.target.value).format("YYYY-MM-DD[T]HH:mm"));
    }
    const [fechaFin, setfechaFin] = useState(initialValues.fin);
    // const [fechaFin, setfechaFin] = useState('');
    const handleDateFinChange = (e)=> {
        setfechaFin(moment(e.target.value).format("YYYY-MM-DD[T]HH:mm"));
    }

    // const handleDownloadFile = async () => {
    //     console.log('click')
    //     const resp = await fetch(`/api/ticket/download`);
    //     const blob = await resp.blob();
    //     const url = window.URL.createObjectURL(new Blob([blob]));
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute(
    //         'download',
    //         `FileName.png`,
    //     );
      
    //     // Append to html link element page
    //     document.body.appendChild(link);
    
    //     // Start download
    //     link.click();
    
    //     // Clean up and remove the link
    //     link.parentNode.removeChild(link);
    // }
    return (
        <div className="admin__container">
            <NavBar/>
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
            </div>
            <TablaScreen fechaInicio={fechaInicio} fechaFin={fechaFin} />
            <div className="input__container">
                <button className="btn-block">
                    Exportar
                </button>
            </div>
        </div>
    )
}
