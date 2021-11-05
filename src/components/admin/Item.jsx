import moment from 'moment';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { actualizarTicket } from '../../actions/ticket';
import 'moment/locale/es-mx';
import Swal  from 'sweetalert2';

import useSelectForm from '../../hooks/useSelectForm';

export const Item = ({ ticket, i, setTickets }) => {
    const dispatch = useDispatch();

    const { fechaSolicitud, fechaAtencion, fechaFin, noFolio } = ticket;
    
    const [inicio, setInicio] = useState(moment(fechaAtencion).format("YYYY-MM-DD[T]HH:mm"));
    const handleDateInicioChange = (e)=> {
        setInicio(moment(e.target.value).format("YYYY-MM-DD[T]HH:mm"));
    }
    const [fin, setFin] = useState(moment(fechaFin).format("YYYY-MM-DD[T]HH:mm"));
    const handleDateFinChange = (e)=> {
        setFin(moment(e.target.value).format("YYYY-MM-DD[T]HH:mm"));
    }
    //custom hook para manejar el estado del select horario
    const [ horario, handleHorario ] = useSelectForm(ticket.horario);
    //custom hook para manejar el estado del select categoria
    const [ categoria, handleCategoria ] = useSelectForm(ticket.categoria);
    //custom hook para manejar el estado del select rma
    const [ rma, handleRma ] = useSelectForm(ticket.rma);
    //custom hook para manejar el estado del select atencion
    const [ atencion, handleAtencion ] = useSelectForm(ticket.atencion);
    //custom hook para manejar el estado del select estatus
    const [ estatus, handleEstatus ] = useSelectForm(ticket.estatus);
    //custom hook para manejar el estado del select severidad
    const [ severidad, handleSeveridad ] = useSelectForm(ticket.severidad);
    //custom hook para manejar el estado del select sla
    const [ sla, handleSla ] = useSelectForm(ticket.sla);


    const [editar, setEditar] = useState(true);
    const handleEditar = () => {
        setEditar(false);
    }
    const validarCampos = () => {
        if (moment(fechaSolicitud).format("YYYY-MM-DD[T]HH:mm") > inicio ) {
            Swal.fire({
                title: "La fecha de inicio no puede ser menor a la de solicitud",
                icon: "error",
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonColor: "#4796ff"
            });
            return false;
        }
        if (moment(fechaSolicitud).format("YYYY-MM-DD[T]HH:mm") > fin ) {
            Swal.fire({
                title: "La fecha de fin no puede ser menor a la de solicitud",
                icon: "error",
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonColor: "#4796ff"
            });
            return false;
        }
        if (inicio > fin) {
            Swal.fire({
                title: "La fecha de inicio no puede ser mayor a la de fin",
                icon: "error",
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonColor: "#4796ff"
            });
            return false;
        }
        return true;
    }
    const handleGuardar = () => {
        if ( validarCampos() ) {
            setEditar(true);
            dispatch(actualizarTicket({
                ...ticket, 
                fechaAtencion: inicio, 
                fechaFin: fin,
                horario,
                categoria,
                rma,
                atencion,
                estatus,
                severidad,
                sla
            }));
        }
    }

    return (
        <tr>
            <td>{i+1}</td>
            <td>{moment(new Date(fechaSolicitud)).format("YYYY-MM-DD HH:mm")}</td>
            <td>
                <input
                    className="item__time"
                    type="datetime-local" 
                    name="inicio" 
                    value={inicio}
                    onChange={handleDateInicioChange}
                    min={moment(fechaSolicitud).format("YYYY-MM-DD[T]HH:mm")}
                    disabled={editar}
                />
            </td>
            <td>
                <input
                    className="item__time"
                    type="datetime-local" 
                    name="fin" 
                    value={fin}
                    min={inicio}
                    onChange={handleDateFinChange}
                    disabled={editar}
                />
            </td>
            <td>
                <select 
                    name="horario" 
                    id="horario" 
                    disabled={editar}
                    value={horario} 
                    onChange={handleHorario}
                >
                    <option value="habil">Hábil</option>
                    <option value="nohabil">No hábil</option>
                </select>
            </td>
            <td>{noFolio}</td>
            <td>
                <select 
                    name="categoria" 
                    id="categoria" 
                    disabled={editar}
                    value={categoria}
                    onChange={handleCategoria}
                >
                    <option value="solicitud">Solicitud</option>
                    <option value="incidente">Incidente</option>
                    <option value="mantenimiento">Mantenimiento</option>
                    <option value="monitoreo">Monitoreo</option>
                    <option value="rma">RMA</option>
                </select>
            </td>
            <td>
                <select 
                    name="rma" 
                    id="rma" 
                    disabled={editar}
                    value={rma}
                    onChange={handleRma}
                >
                    <option value="si">Si</option>
                    <option value="no">No</option>
                </select>
            </td>
            <td>
                <select 
                    name="atencion" 
                    id="atencion" 
                    disabled={editar}
                    value={atencion}
                    onChange={handleAtencion}
                >
                    <option value="sitio">Sitio</option>
                    <option value="remoto">Remoto</option>
                </select>
            </td>
            <td>
                <select 
                    name="estatus" 
                    id="estatus" 
                    disabled={editar}
                    value={estatus}
                    onChange={handleEstatus}
                >
                    <option value="abierto">Abierto</option>
                    <option value="cerrado">Cerrado</option>
                </select>
            </td>
            <td>
                <select 
                    name="severidad" 
                    id="severidad" 
                    disabled={editar}
                    value={severidad}
                    onChange={handleSeveridad}
                >
                    <option value="minima">Mínima</option>
                    <option value="menor">Menor</option>
                    <option value="mayor">Mayor</option>
                    <option value="critica">Crítica</option>
                    <option value="extraordinaria">Extraordinaria</option>
                </select>
            </td>
            <td>
                <select 
                    name="sla" 
                    id="sla" 
                    disabled={editar}
                    value={sla}
                    onChange={handleSla}
                >
                    <option value="cumple">Cumple</option>
                    <option value="nocumple">No cumple</option>
                </select>
            </td>
            <td>
                <button
                    onClick={handleEditar}
                    disabled={!editar}
                >
                    Editar
                </button>
                <button 
                    onClick={handleGuardar}
                    disabled={editar}   
                >
                    Guardar
                </button>
            </td>
            {/* <td>{usuarioNombre}</td>
            <td className="mensaje">{mensaje}</td>
            <td>{noFolio}</td> */}
        </tr>
    )
}

    // const dispatch = useDispatch();

    // const {mensaje, fechaSolicitud, fechaAtencion, fechaFin, noFolio, usuario} = ticket;

    // useEffect(() => {
    //     if (inicio !== moment(fechaAtencion).format("YYYY-MM-DD[T]HH:mm") || fin !== moment(fechaFin).format("YYYY-MM-DD[T]HH:mm") ) {
    //         dispatch(actualizarFecha({
    //             ...ticket, 
    //             fechaAtencion: inicio, 
    //             fechaFin: fin,
    //         }));
    //     }
    // }, [inicio, fin, dispatch, fechaAtencion, fechaFin, ticket])