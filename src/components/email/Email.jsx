import React, { useState } from 'react'

const Email = ({email, setEmail, fechaSoli, setFechaSoli}) => {
    const [menu, setMenu] = useState(true);
    const handleClickMenu = () => {
        setMenu(!menu);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handleFechaSoliChange = (e) => {
        setFechaSoli(e.target.value);
    }
    return (
        <div className="input__container email">
            <div 
                className="email-title"
                onClick={handleClickMenu}
            >
                <i className={`fas fa-chevron-right ${!menu?'rotate':''}`}></i>
                <p>Solicitud realizada por alguien externo.</p>
            </div>
            <div className={`email-content ${menu?'none':''}`}>
                <div>
                    <label htmlFor="email">Correo del solicitante</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="usuario@catcoop.org.mx"
                        value={email}
                        onChange={handleEmailChange}
                        autoComplete="off"
                    />
                </div>
                <div>
                    <label htmlFor="fechaSoli">Fecha de solicitud</label>
                    <input 
                        type="datetime-local" 
                        name="fechaSoli" 
                        id="fechaSoli"
                        value={fechaSoli}
                        onChange={handleFechaSoliChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default Email
