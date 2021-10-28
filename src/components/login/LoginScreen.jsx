import React from 'react'
import { useDispatch } from 'react-redux';

import { startLogin } from '../../actions/auth';
import { useForm } from './../../hooks/useForm';

import logo from '../../assets/logo.png';

export const LoginScreen = () => {

    const [formValues, handleInputChange] = useForm({
        email: '',
        password: ''
    });
    const {email,password} = formValues;

    const dispatch = useDispatch();

    const handleSubmit = (e)=> {
        e.preventDefault();
        dispatch( startLogin(email, password) );
    }

    return (
        <div className="login__container">
            <img src={logo} alt="logo" className="logo"/>
            <h1>Sistema de Tickets</h1>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
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
                    <button
                        className="btn-block btn-login"
                        type="submit"
                    >
                        Iniciar Sesión
                    </button>
                </div>
            </form>
        </div>
    )
}
