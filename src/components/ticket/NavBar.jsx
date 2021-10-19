import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

import { Link, useLocation } from 'react-router-dom'

export const NavBar = () => {

    const {nombre, role} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const handleLogout = ()=> {
        dispatch(startLogout());
    }
    const {pathname} = useLocation();
    return (
        <div className={`navbar__container ${(pathname === '/admin') ? 'navbar__container-admin' : ''}`} >
            <div className="data__container">
                <p>Bienvenido {nombre}</p>
            </div>
            <div className="data__container">
                <div className="buttons">
                    {
                        (role==="ADMIN" && pathname==='/') 
                        ? (
                            <Link to="/admin">Reportes</Link>
                        )
                        : (
                            <Link to="/">Inicio</Link>
                        )
                    }
                    <button
                        className="btn-logout btn-block"
                        onClick={handleLogout}
                    >
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Salir</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
