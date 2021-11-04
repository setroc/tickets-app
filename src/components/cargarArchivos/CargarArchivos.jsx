const CargarArchivos = ({setSelectedFiles, setLimitSize}) => {
    const handleFilesChange = (e) => {
        if (e.target.files?.length > 0) {
            setSelectedFiles(Array.from(e.target.files));
            for (let i = 0; i<e.target.files.length;i++) {
                setLimitSize((prevState)=>(prevState-e.target.files[i].size));
            } 
        }
    }
    return (
        <div className="file__container">
            <input 
                type="file" 
                name="files" 
                id="files"
                accept="audio/*,video/*,.pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain"
                onChange={handleFilesChange}
                multiple
            />
            <label htmlFor="files">
                Cargar Archivos*
            </label>
        </div>
    )
}

export default CargarArchivos
