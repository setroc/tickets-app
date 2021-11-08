import React, { useState } from 'react'
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
                menu && <BugerMenu handleMenu={handleMenu} />
            }
        </div>
    )
}

export default MenuAdmin
