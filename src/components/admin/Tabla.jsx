import React from 'react'
import { Item } from './Item';

const Tabla = ({tickets, setTickets}) => {
  return (
    <div className="container">
        <table className="tabla_container">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Número de Folio</th>
                    <th>Estatus</th>
                    <th>Mensaje</th>
                    <th>Severidad</th>
                    <th>Fecha y hora solicitud</th>
                    <th>Fecha y hora inicio</th>
                    <th>Fecha y hora fin</th>
                    <th>Horario</th>
                    <th>Categoría</th>
                    <th>RMA</th>
                    <th>Atención</th>
                    <th>SLA</th>
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
    </div>
  )
}

export default Tabla