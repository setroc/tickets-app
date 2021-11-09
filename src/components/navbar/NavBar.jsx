import React from 'react'

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'


import logo from '../../assets/logo.png';
import MenuAdmin from './MenuAdmin';
import MenuUser from './MenuUser';

export const NavBar = () => {

    const {nombre, role} = useSelector(state => state.auth);
    const {pathname} = useLocation();

    return (
        <nav className={`navbar__container ${(pathname === '/admin' || pathname === '/register') ? 'navbar__container-admin' : ''}`} >
            <div className="navbar__left">
                <img src={logo} alt="logo" className={`logo ${(pathname === '/admin') ? 'logo-admin' : ''}`}/>
                <p>Bienvenido {nombre}</p>
            </div>
            <div className="navbar__right">
                {   
                    (role==="ADMIN") 
                    ? (
                        <MenuAdmin />
                    )
                    : (
                        <MenuUser />
                    )
                }   
            </div>
        </nav>
    )
}
