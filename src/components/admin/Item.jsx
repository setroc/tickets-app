import moment from 'moment';
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { actualizarFecha } from '../../actions/ticket';
moment.locale('es-mx');

export const Item = ({ticket,i}) => {

    const dispatch = useDispatch();

    const {mensaje, fechaSolicitud, fechaAtencion, fechaFin, noFolio, usuario} = ticket;
    const usuarioNombre = usuario.nombre;  

    const [inicio, setInicio] = useState(moment(fechaAtencion).format("YYYY-MM-DD[T]HH:mm"));
    const handleDateInicioChange = (e)=> {
        setInicio(moment(e.target.value).format("YYYY-MM-DD[T]HH:mm"));
    }
    const [fin, setFin] = useState(moment(fechaFin).format("YYYY-MM-DD[T]HH:mm"));
    const handleDateFinChange = (e)=> {
        setFin(moment(e.target.value).format("YYYY-MM-DD[T]HH:mm"));
    }

    useEffect(() => {
        if (inicio !== moment(fechaAtencion).format("YYYY-MM-DD[T]HH:mm") || fin !== moment(fechaFin).format("YYYY-MM-DD[T]HH:mm") ) {
            dispatch(actualizarFecha({
                ...ticket, 
                fechaAtencion: inicio, 
                fechaFin: fin,
            }));
        }
    }, [inicio, fin, dispatch, fechaAtencion, fechaFin, ticket])

    return (
        <tr>
            <td>{i+1}</td>
            <td>{moment(new Date(fechaSolicitud)).format('L')}</td>
            <td>{moment(new Date(fechaSolicitud)).format('LT')}</td>
            <td>
                <input 
                    type="datetime-local" 
                    name="inicio" 
                    value={inicio}
                    onChange={handleDateInicioChange}
                    id="datetime-tabla"
                />
            </td>
            <td>
                <input 
                    type="datetime-local" 
                    name="fin" 
                    value={fin}
                    onChange={handleDateFinChange}
                    id="datetime-tabla"
                />
            </td>
            <td>{usuarioNombre}</td>
            <td>{mensaje}</td>
            <td>{noFolio}</td>
        </tr>
    )
}
