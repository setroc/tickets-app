import Swal from 'sweetalert2';
import { types } from '../types/types';

// const baseURL = 'http://localhost:4000/api';

export const solicitarTicket = (formData) => {
    return async(dispatch)=> {
        try {
            dispatch(ticketSolicitado());
            const token = localStorage.getItem('token') || '';
            // const resp = await fetch(`${baseURL}/ticket`,{
            const resp = await fetch(`/api/ticket`,{
                method: 'POST',
                body: formData,
                headers: {
                    'x-token' : token
                }
            });
            const body =  await resp.json();
            if (body.ok) {
                Swal.fire({
                    title: 'El ticket ha sido enviado',
                    html: `<strong>No. de Ticket: ${body.noTicket}</strong><br/> ${body.msg}`,
                    icon: 'success',
                    allowOutsideClick: true,
                    showCancelButton: false,
                    showConfirmButton: true,
                    // timer: 2500,
                    backdrop:true,
                    confirmButtonColor: "#4796ff"
                })
            }else {
                Swal.fire({
                    title: 'El ticket NO se ha enviado',
                    html: body.msg,
                    icon: 'error',
                    allowOutsideClick: true,
                    showCancelButton: false,
                    showConfirmButton: true,
                    // timer: 1500,
                    backdrop:true,
                    confirmButtonColor: "#4796ff"
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const ticketSolicitado = ()=> ({
    type: types.ticketSolicitado
})

export const traerTickets = (fechaInicio, fechaFin) => {
    return async(dispatch) => {
        try {
            const token = localStorage.getItem('token') || '';
            const resp = await fetch(`/api/ticket?desde=${fechaInicio}&hasta=${fechaFin}`,{
                method: 'GET',
                headers: {
                    'x-token' : token
                }
            });
            const body = await resp.json();
            dispatch(ticketsCargados(body.tickets));
        } catch (error) {
            console.log(error);
        }
    }
}
const ticketsCargados = (tickets) => ({
    type:  types.ticketCargados,
    payload:  tickets
})

export const actualizarTicket = (ticket) => {
    return async(dispatch) => {
        try {
            const resp = await fetch(`/api/ticket/${ticket._id}`,{
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(ticket)
            })
            const body = await resp.json();
            if (body.ok) {
                dispatch(ticketActualizado(ticket))
            }else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error)
        }
    }
}
const ticketActualizado = (ticket) => ({
    type: types.ticketActualizado,
    payload: ticket
})