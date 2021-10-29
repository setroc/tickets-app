import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'

import { startLogout } from '../../actions/auth';

import logo from '../../assets/logo.png';

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
                <img src={logo} alt="logo" className={`logo ${(pathname === '/admin') ? 'logo-admin' : ''}`}/>
                <p>Bienvenido {nombre}</p>
            </div>
            <div className="data__container">
                <div className="buttons">
                    {   
                        (role!=='USER') && (
                            (role==="ADMIN" && pathname==='/') 
                            ? (
                                <Link to="/admin">Reportes</Link>
                            )
                            : (
                                <Link to="/">Inicio</Link>
                            )
                        )
                    }
                    <button
                        className="btn-logout btn-block"
                        onClick={handleLogout}
                    >
                        Salir
                    </button>
                </div>
            </div>
        </div>
    )
}
