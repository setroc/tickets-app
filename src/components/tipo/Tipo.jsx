const Tipo = ({tipo, setTipo}) => {
    const handleRadioTipoChange = (e)=> {
        setTipo(e.target.value);
    }
    return (
        <div>
            <h3 className="radio--title">Seleccione el tipo de servicio</h3>
            <label>
                <input 
                    type="radio" 
                    name="tipo" 
                    value="solicitud" 
                    id="solicitud" 
                    checked={tipo === 'solicitud' ? true : false}
                    onChange={handleRadioTipoChange}
                />
                Solicitud
            </label>
            <label>
                <input 
                    type="radio" 
                    name="tipo" 
                    value="incidente" 
                    id="incidente" 
                    checked={tipo === 'incidente' ? true : false}
                    onChange={handleRadioTipoChange}
                />
                Incidente
            </label>
        </div>
    )
}

export default Tipo
