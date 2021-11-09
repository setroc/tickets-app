import React from 'react'
import { useDispatch } from 'react-redux';
import { startLogout } from '../../actions/auth';

const BugerMenu = ({children}) => {
    const dispatch = useDispatch();
    const handleLogout = ()=> {
        dispatch(startLogout());
    }
    return (
        <div className="burgerMenu">
            { children }
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
