import Swal from 'sweetalert2';
import { types } from '../types/types';

// const baseURL = 'http://localhost:4000/api';

export const solicitarTicket = (formData) => {
    return async(dispatch)=> {
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
                html: body.msg,
                icon: 'success',
                allowOutsideClick: true,
                showCancelButton: false,
                showConfirmButton: true,
                timer: 1500,
                backdrop:true
            })
        }else {
            Swal.fire({
                title: 'El ticket NO se ha enviado',
                html: body.msg,
                icon: 'error',
                allowOutsideClick: true,
                showCancelButton: false,
                showConfirmButton: true,
                timer: 1500,
                backdrop:true
            })
        }
    }
}
const ticketSolicitado = ()=> ({
    type: types.ticketSolicitado
})