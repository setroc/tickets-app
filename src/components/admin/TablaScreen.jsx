import React from 'react'
import { Item } from './Item'

export const TablaScreen = ({tickets, setTickets}) => {
    return (
        <table className="tabla_container">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Fecha y hora solicitud</th>
                    {/* <th>Hora Solicitud</th> */}
                    <th>Fecha y hora inicio</th>
                    {/* <th>Hora Inicio</th> */}
                    <th>Fecha y hora fin</th>
                    {/* <th>Hora Fin</th> */}
                    <th>Horario</th>
                    <th>Número de Folio</th>
                    <th>Categoría</th>
                    <th>RMA</th>
                    <th>Atención</th>
                    <th>Estatus</th>
                    <th>Severidad</th>
                    <th>SLA</th>
                    {/* <th>Solicito</th>
                    <th>Mensaje</th> */}
                    <th>Editar</th>
                </tr>
            </thead>
            <tbody>
                {
                    tickets && tickets.map((ticket,i) => {
                        return <Item ticket={ticket} key={ticket._id} i={i} setTickets={setTickets}/>
                    })
                }
            </tbody>
        </table>
    )
}
