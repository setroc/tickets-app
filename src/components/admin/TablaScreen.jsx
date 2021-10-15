import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Item } from './Item'
import { traerTickets } from '../../actions/ticket';


export const TablaScreen = ({fechaInicio, fechaFin}) => {

    const {tickets} = useSelector(state => state.ticket);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!!fechaFin !== false && !!fechaFin !== false) {
            dispatch(traerTickets(fechaInicio, fechaFin));
        }
    }, [dispatch, fechaInicio, fechaFin])


    return (
        <table className="tabla_container">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Fecha Solicitud</th>
                    <th>Hora Solicitud</th>
                    <th>Fecha y Hora Inicio</th>
                    {/* <th>Hora Inicio</th> */}
                    <th>Fecha y Hora Fin</th>
                    {/* <th>Hora Fin</th> */}
                    <th>Solicito</th>
                    <th>Solicitud</th>
                    <th>Número de Folio</th>
                </tr>
            </thead>
            <tbody>
                {
                    tickets && tickets.map((ticket,i) => {
                        return <Item ticket={ticket} key={ticket._id} i={i}/>
                    })
                }
            </tbody>
        </table>
        // <div className="tabla_container">
        //     <ul className="titulos">
        //         <li>No.</li>
        //         <li>Fecha Solicitud</li>
        //         <li>Hora Solicitud</li>
        //         <li>Fecha Inicio</li>
        //         <li>Hora Inicio</li>
        //         <li>Fecha Fin</li>
        //         <li>Hora Fin</li>
        //         <li>Solicito</li>
        //         <li>Solicitud</li>
        //         <li>Número de Folio</li>
        //     </ul>

        //     <ul className="item">
        //         <li>1</li>
        //         <li>10/05/2021</li>
        //         <li>08:30</li>
        //         <li>10/05/2021</li>
        //         <li>08:30</li>
        //         <li>10/05/2021</li>
        //         <li>08:30</li>
        //         <li>Jorge Mejía</li>
        //         <li>Cambiar de hardphone a softphone el usuario (sperez) con extensión (1582)</li>
        //         <li>10052021-01</li>
        //     </ul>
        // </div>
    )
}
