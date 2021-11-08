import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';

const BugerMenu = ({handleMenu}) => {
    const dispatch = useDispatch();
    const handleLogout = ()=> {
        dispatch(startLogout());
    }
    return (
        <div className="burgerMenu">
            <Link 
                to="/"
                onClick={handleMenu}
            >
                Inicio
            </Link>
            <Link 
                to="/admin"
                onClick={handleMenu}
            >
                Reportes
            </Link>
            <Link 
                to="/register"
                onClick={handleMenu}
            >
                Registrar
            </Link>
            <button
                className="btn-block"
                onClick={handleLogout}
            >
                Salir
            </button>
        </div>
    )
}

export default BugerMenu
