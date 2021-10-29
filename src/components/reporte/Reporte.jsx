const Reporte = ({text, handleInputChange}) => {
    return (
        <div className="input__container">
            <label htmlFor="text">Explique de la mejor manera el incidente o solicitud que desea reportar</label>
            <textarea 
                name="text" 
                id="text"
                rows="8"
                placeholder="Realizar cambio de hardphone a softphone del usuario <nombre> con extensión <ext>"
                value={text}
                onChange={handleInputChange}
            >
            </textarea>
        </div>
    )
}

export default Reporte
