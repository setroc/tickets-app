import React, { useState } from 'react'

import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';

import { traerTickets } from '../../actions/ticket';
import Tabla from './Tabla';

moment.locale('es-mx');
const initialValues = {
    inicio : moment().set({hour:0, minute:0}).format("YYYY-MM-DD[T]HH:mm"),
    fin: moment().set({hour:23,minute:59}).format("YYYY-MM-DD[T]HH:mm")
}

export const AdminScreen = () => {
    const {tickets} = useSelector(state => state.ticket);
    const dispatch = useDispatch();
    //fechas
    const [fechaInicio, setFechaInicio] = useState(initialValues.inicio);
    const handleDateInicioChange = (e)=> {
        setFechaInicio(moment(e.target.value).format("YYYY-MM-DD[T]HH:mm"));
        setDisabled(false);
    }
    const [fechaFin, setfechaFin] = useState(initialValues.fin);
    const handleDateFinChange = (e)=> {
        setfechaFin(moment(e.target.value).format("YYYY-MM-DD[T]HH:mm"));
    }
    //input radio
    const [lugar, setLugar] = useState('cat');
    const handleRadioLugarChange = (e)=> {
        setLugar(e.target.value);
    }
    // deshabilita el input de fecha fin hasta que se agrega un valor en input fecha inicio
    const [disabled, setDisabled] = useState(true);
    const handleSearch = () => {
        if (!!fechaFin !== false && !!fechaFin !== false) {
            dispatch(traerTickets(fechaInicio, fechaFin, lugar));
        }
    }
    return (
        <div className="admin__container">
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
                    <div className="radio">
                        <label htmlFor="cat">CAT</label>
                        <input 
                            type="radio" 
                            name="lugar" 
                            id="cat"  
                            value="cat"
                            checked={lugar === 'cat' ? true : false}
                            onChange={handleRadioLugarChange}
                        />
                        <label htmlFor="consejo">Consejo</label>
                        <input 
                            type="radio" 
                            name="lugar" 
                            id="consejo"  
                            value="consejo"
                            checked={lugar === 'consejo' ? true : false}
                            onChange={handleRadioLugarChange}
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        className="btn-block btn-login"
                    >
                        Buscar
                    </button>
                </div>
            </div>
            {
                // tickets && <TablaScreen tickets={tickets} />
            }
            {
                tickets && <Tabla tickets={tickets} />
            }
            {/* <Tabla /> */}
        </div>
    )
}