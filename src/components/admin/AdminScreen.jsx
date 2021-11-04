import React, { useState } from 'react'

import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import { TablaScreen } from './TablaScreen'
import { traerTickets } from '../../actions/ticket';

moment.locale('es-mx');
const initialValues = {
    inicio : moment().set({hour:0, minute:0}).format("YYYY-MM-DD[T]HH:mm"),
    fin: moment().set({hour:23,minute:59}).format("YYYY-MM-DD[T]HH:mm")
}

export const AdminScreen = () => {
    const {tickets} = useSelector(state => state.ticket);
    const dispatch = useDispatch();

    const [fechaInicio, setFechaInicio] = useState(initialValues.inicio);
    // const [fechaInicio, setFechaInicio] = useState('');
    const handleDateInicioChange = (e)=> {
        setFechaInicio(moment(e.target.value).format("YYYY-MM-DD[T]HH:mm"));
        setDisabled(false);
    }
    const [fechaFin, setfechaFin] = useState(initialValues.fin);
    // const [fechaFin, setfechaFin] = useState('');
    const handleDateFinChange = (e)=> {
        setfechaFin(moment(e.target.value).format("YYYY-MM-DD[T]HH:mm"));
    }  
    // deshabilita el input de fecha fin hasta que se agrega un valor en input fecha inicio
    const [disabled, setDisabled] = useState(true);
    const handleSearch = () => {
        if (!!fechaFin !== false && !!fechaFin !== false) {
            dispatch(traerTickets(fechaInicio, fechaFin));
        }
    }
    return (
        <div className="admin__container">
            {/* <NavBar/> */}
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
                        disabled={disabled}
                    />
                </div>
                <div className="filtro-input">
                    {/* <label htmlFor="cat">CAT</label>
                    <input type="radio" name="lugar" id="lugar"  value="cat"/>
                    <label htmlFor="cat">Consejo</label>
                    <input type="radio" name="lugar" id="lugar"  value="consejo"/> */}
                    <button
                        onClick={handleSearch}
                    >
                        Buscar
                    </button>
                </div>
            </div>
            {
                tickets && <TablaScreen tickets={tickets} />
            }
            {/* <button className="admin__btn">
                Exportar
            </button> */}
        </div>
    )
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