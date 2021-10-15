import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

import { Link } from 'react-router-dom'

export const NavBar = () => {

    const {nombre, role} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const handleLogout = ()=> {
        dispatch(startLogout());
    }

    return (
        <div className="navbar__container">
            <div className="data__container">
                <p>Bienvenido {nombre}</p>
            </div>
            <div className="data__container">
                <div className="buttons">
                    {
                        (role==="ADMIN") && (
                            <Link to="/admin">Reportes</Link>
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
