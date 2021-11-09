import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { startUpdatePass } from '../../actions/auth';

import validateInfo from '../../helpers/validateInfo';

const initialValues = {
    password: '',
    npassword: '',
    npassword2: ''
}
const Cuenta = () => {
    const dispatch = useDispatch();

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState(initialValues);
    const { password, npassword, npassword2 } = values;
    const handleInputChange = (e) => {
        setValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validateInfo(values));
        if ( Object.keys(errors).length === 0 ) { //Formulario valido
            dispatch(startUpdatePass(password, npassword));
        }
        setValues(initialValues);
    }
    return (
        <div className="cuenta__container">
            <h2>Cambiar contraseña</h2>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <label htmlFor="password">Contraseña actual</label>
                    <input 
                        className={`${errors.password && 'inputError'}`}
                        type="password"
                        value={password}
                        onChange={handleInputChange}
                        placeholder="**********" 
                        name="password" 
                        id="password" 
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                    <label htmlFor="npassword">Nueva contraseña *</label>
                    <input 
                        className={`${errors.npassword && 'inputError'}`}
                        type="password"
                        value={npassword}
                        onChange={handleInputChange}
                        placeholder="**********" 
                        name="npassword" 
                        id="npassword" 
                    />
                    {errors.npassword && <p className="error">{errors.npassword}</p>}
                    <label htmlFor="npassword2">Confirmar contraseña *</label>
                    <input 
                        className={`${errors.npassword2 && 'inputError'}`}
                        type="password"
                        value={npassword2}
                        onChange={handleInputChange}
                        placeholder="**********" 
                        name="npassword2" 
                        id="npassword2" 
                    />
                    {errors.npassword2 && <p className="error">{errors.npassword2}</p>}
                    <p className="nota">* La contraseña debe tener mínimo 6 caracteres.</p>
                    <button 
                        className="btn-block btn-login"
                        type="submit"
                    >
                        Cambiar contraseña
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Cuenta
