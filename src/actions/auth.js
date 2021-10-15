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
            Swal.fire('Error', body.msg, 'error');
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
            localStorage.setItem('token', body.token);
            const {nombre, uid} = body.usuario;
            dispatch(login({
                nombre,
                uid
            }))
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