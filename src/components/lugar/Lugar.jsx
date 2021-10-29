const Lugar = ({lugar, setLugar}) => {
    const handleRadioLugarChange = (e)=> {
        setLugar(e.target.value);
    }
    return (
        <div>
            <h3 className="radio--title">Seleccione el lugar del servicio</h3>
            <label>
                <input 
                    type="radio" 
                    name="lugar" 
                    value="cat" 
                    id="cat"
                    checked={lugar === 'cat' ? true : false}
                    onChange={handleRadioLugarChange}
                    />
                    Coorporativo Caja
            </label>
            <label>
                <input 
                    type="radio" 
                    name="lugar" 
                    value="consejo" 
                    id="consejo" 
                    checked={lugar === 'consejo' ? true : false}
                    onChange={handleRadioLugarChange}
                />
                Consejo
            </label>
        </div>
    )
}

export default Lugar
