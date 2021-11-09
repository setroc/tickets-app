import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import BugerMenu from './BugerMenu';

const MenuAdmin = () => {
    const [menu, setMenu] = useState(false);
    const handleMenu = () => {
        setMenu(!menu);
    }
    return (
        <div className="menuAdmin">
            <i 
                class="fas fa-bars"
                onClick={handleMenu}
            ></i>
            {
                menu && (
                    <BugerMenu>
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
                    </BugerMenu>
                )
            }
        </div>
    )
}

export default MenuAdmin
