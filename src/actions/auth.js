import Swal from 'sweetalert2';
import { types } from '../types/types';

// const baseURL = 'http://localhost:4000/api'
//Login
export const startLogin = (email, password) => {
    return async(dispatch)=> {
        const data = {
            email,
            password
        }
        // const resp = await fetch(`${baseURL}/auth`, {
        const resp = await fetch(`/api/auth`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const body = await resp.json();
        if (body.ok) {
            localStorage.setItem('token', body.token);
            const {nombre, uid, role} = body.usuario;
            dispatch(login({
                nombre, 
                uid,
                role
            }))
        }else {
            Swal.fire({
                title: body.msg,
                html: `En caso de olvidarlos, por favor contacte al administrador del sistema.`,
                icon: 'error',
                allowOutsideClick: true,
                showCancelButton: false,
                showConfirmButton: true,
                // timer: 2500,
                backdrop:true,
                confirmButtonColor: "#4796ff"
            });
        }
    }
}
const login = (usuario) => ({
    type: types.authLogin,
    payload: usuario,
})
//Logout
export const startLogout = () => {
    return (dispatch)=> {
        localStorage.clear();
        dispatch(logoutTicket());
        dispatch(logout());
    }
}
const logout = () => ({
    type: types.authLogout
});
const logoutTicket = () => ({
    type: types.ticketLogout
})
//Register
export const startRegister = (nombre, email, password)=> {
    return async(dispatch) => {
        const data = {
            nombre,
            email,
            password
        }
        // const resp = await fetch(`${baseURL}/auth/new`,{
        const resp = await fetch(`/api/auth/new`,{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(data)
        })
        const body = await resp.json();
        if (body.ok) {
            const {nombre} = body.usuario;
            Swal.fire({
                title: 'Usuario creado con exito',
                html: `El usuario ${nombre} se ha creado exitosamente`,
                icon: 'success',
                allowOutsideClick: true,
                showCancelButton: false,
                showConfirmButton: true,
                // timer: 2500,
                backdrop:true,
                confirmButtonColor: "#4796ff"
            })
        }else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}
export const startChecking = () => {
    return async(dispatch) => {
        try {
            const token = localStorage.getItem('token') || '';
            // const resp = await fetch(`${baseURL}/auth/renew`,{
            const resp = await fetch(`/api/auth/renew`,{
                method: 'GET',
                headers: {
                    'x-token':token
                },
            });
            const body = await resp.json();
            if (body.ok) {
                localStorage.setItem('token', body.token);
                dispatch(login({
                    uid: body.uid,
                    nombre: body.nombre,
                    role: body.role
                }))
            }else {
                dispatch(checkingFinish());
            }
            
        } catch (error) {
            console.log(error);
        }
    }
}
const checkingFinish = () => ({
    type: types.authCheckingFinish
})

export const startUpdatePass = (pass, npass)=> {
    return async(dispatch) => {
        const data = { password: pass, npassword: npass};
        const token = localStorage.getItem('token') || '';
        const resp = await fetch(`/api/auth/update`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'x-token':token
            },
            body: JSON.stringify(data)
        });
        const body = await resp.json();
        if (body.ok) {
            Swal.fire({
                title: `${body.msg}`,
                icon: 'success',
                allowOutsideClick: true,
                showCancelButton: false,
                showConfirmButton: true,
                timer: 3500,
                backdrop:true,
                confirmButtonColor: "#4796ff"
            });
            dispatch(updatePass());
            setTimeout(()=>{
                dispatch(startLogout());
            },4000);
        }else {
            Swal.fire('Error', body.msg, 'error');
        }

    }
}
const updatePass = () => ({
    type: types.authUpdatePass
})