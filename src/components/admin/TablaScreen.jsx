import React from 'react'

export const TablaScreen = () => {
    return (
        <table className="tabla_container">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Fecha Solicitud</th>
                    <th>Hora Solicitud</th>
                    <th>Fecha Inicio</th>
                    <th>Hora Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Hora Fin</th>
                    <th>Solicito</th>
                    <th>Solicitud</th>
                    <th>Número de Folio</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>10/05/2021</td>
                    <td>08:30</td>
                    <td>
                        <input type="date" name="" id="" />
                    </td>
                    <td>
                        <input type="time" name="" id="" />
                    </td>
                    <td>
                        <input type="date" name="" id="" />
                    </td>
                    <td>
                        <input type="time" name="" id="" />
                    </td>
                    <td>Jorge Mejía</td>
                    <td>Cambiar de hardphone a softphone el usuario (sperez) con extensión (1582)</td>
                    <td>10052021-01</td>
                </tr>
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
