import React from 'react'
import { useDispatch } from 'react-redux';
import Swal  from 'sweetalert2';

import { startRegister } from '../../actions/auth';
import { useForm } from './../../hooks/useForm';

const initialFormState = {
    email: '',
    nombre: '',
    password: '',
    password2: ''
}

export const RegisterScreen = () => {

    const [formValues, handleInputChange, reset] = useForm(initialFormState);
    const {email,nombre,password,password2} = formValues;

    const dispatch = useDispatch();

    const handleSubmit = (e)=> {
        e.preventDefault();
        if ( password !== password2) {
            Swal.fire('Error', 'Las contraseñas no son iguales', 'error');
        }
        dispatch(startRegister(nombre,email,password));
        reset();
    }
    return (
        <div className="login__container register">
            <h1>Registrar Ususario</h1>
            <form onSubmit={handleSubmit}>
            <div className="input__container">
                    <label htmlFor="nombre">Ingresar nombre</label>
                    <input 
                        type="text"
                        name="nombre"
                        placeholder="usuario"
                        autoComplete="off"
                        value={nombre}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input__container">
                    <label htmlFor="email">Ingresar Email</label>
                    <input 
                        type="email"
                        name="email"
                        placeholder="usuario@domino.com"
                        autoComplete="off"
                        value={email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input__container">
                    <label htmlFor="password">Ingresar Contraseña</label>
                    <input 
                        type="password"
                        name="password"
                        placeholder="********"
                        autoComplete="off"
                        value={password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input__container">
                    <label htmlFor="password2">Repetir Contraseña</label>
                    <input 
                        type="password"
                        name="password2"
                        placeholder="********"
                        autoComplete="off"
                        value={password2}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="input__container">
                    <button
                        className="btn-block btn-login"
                        type="submit"
                    >
                        Registrar
                    </button>
                </div>
            </form>
        </div>
    )
}