import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import BugerMenu from './BugerMenu';

const MenuUser = () => {
    const [menu, setMenu] = useState(false);
    const handleMenu = () => {
        setMenu(!menu);
    }
    return (
        <div className="menuAdmin user">
            <i 
                className="fas fa-bars"
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
                            to="/cuenta"
                            onClick={handleMenu}
                        >
                            Mi cuenta
                        </Link>
                    </BugerMenu>
                )
            }
        </div>
    )
}

export default MenuUser
