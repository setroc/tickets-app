import React from 'react'
import { NavBar } from '../ticket/NavBar'
import { TablaScreen } from './TablaScreen'

export const AdminScreen = () => {
    return (
        <div className="admin__container">
            <NavBar />
            <TablaScreen />
            <div className="input__container">
                <button className="btn-block btn-login">Salvar</button>
                <button className="btn-block btn-login">Exportar</button>
            </div>
        </div>
    )
}
