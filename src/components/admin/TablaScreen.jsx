import React from 'react'
import { Item } from './Item'

export const TablaScreen = ({tickets, setTickets}) => {
    return (
        <div className="tabla__container">
            <div className="tabla__header">
                <h3 className="tabla__header-titulo">#</h3>
                <h3 className="tabla__header-titulo">Número de Folio</h3>
                <h3 className="tabla__header-titulo">Estatus</h3>
                <h3 className="tabla__header-titulo">Mensaje</h3>
                <h3 className="tabla__header-titulo">Severidad</h3>
                <h3 className="tabla__header-titulo">Fecha y hora solicitud</h3>
                <h3 className="tabla__header-titulo">Fecha y hora inicio</h3>
                <h3 className="tabla__header-titulo">Fecha y hora fin</h3>
                <h3 className="tabla__header-titulo">Horario</h3>
                <h3 className="tabla__header-titulo">Categoría</h3>
                <h3 className="tabla__header-titulo">RMA</h3>
                <h3 className="tabla__header-titulo">Atención</h3>
                <h3 className="tabla__header-titulo">SLA</h3>
                <h3 className="tabla__header-titulo">Editar</h3>
            </div>
            {
                tickets && tickets.map((ticket,i) => {
                    return <Item ticket={ticket} key={ticket._id} i={i} setTickets={setTickets}/>
                })
            }
            {/* <div className="tabla__header">
                <h3 className="tabla__header-titulo">#</h3>
                <h3 className="tabla__header-titulo">Número de Folio</h3>
                <h3 className="tabla__header-titulo">Estatus</h3>
                <h3 className="tabla__header-titulo">Mensaje</h3>
                <h3 className="tabla__header-titulo">Severidad</h3>
                <h3 className="tabla__header-titulo">Fecha y hora solicitud</h3>
                <h3 className="tabla__header-titulo">Fecha y hora inicio</h3>
                <h3 className="tabla__header-titulo">Fecha y hora fin</h3>
                <h3 className="tabla__header-titulo">Horario</h3>
                <h3 className="tabla__header-titulo">Categoría</h3>
                <h3 className="tabla__header-titulo">RMA</h3>
                <h3 className="tabla__header-titulo">Atención</h3>
                <h3 className="tabla__header-titulo">SLA</h3>
                <h3 className="tabla__header-titulo">Editar</h3>
            </div> */}

            {/* <div className="tabla__content">
                {
                    tickets && tickets.map((ticket,i) => {
                        return <Item ticket={ticket} key={ticket._id} i={i} setTickets={setTickets}/>
                    })
                }
            </div> */}
        </div>
        // <table className="tabla_container">
        //     <thead>
        //         <tr>
        //             <th>#</th>
        //             <th>Número de Folio</th>
        //             <th>Estatus</th>
        //             <th>Mensaje</th>
        //             <th>Severidad</th>
        //             <th>Fecha y hora solicitud</th>
        //             <th>Fecha y hora inicio</th>
        //             <th>Fecha y hora fin</th>
        //             <th>Horario</th>
        //             <th>Categoría</th>
        //             <th>RMA</th>
        //             <th>Atención</th>
        //             <th>SLA</th>
        //             <th>Editar</th>
        //         </tr>
        //     </thead>
            // <tbody>
            //     {
            //         tickets && tickets.map((ticket,i) => {
            //             return <Item ticket={ticket} key={ticket._id} i={i} setTickets={setTickets}/>
            //         })
            //     }
            // </tbody>
        // </table>
    )
}
