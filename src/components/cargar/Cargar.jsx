import React from 'react'

import CargarArchivos from '../cargarArchivos/CargarArchivos'
import CargarImagen from '../cargarImagen/CargarImagen'

const Cargar = ({setSelectedImage, setImage, setSelectedFiles, setLimitSize}) => {
    return (
        <div className="input__container">
            <p className="input__p">En caso de ser necesario.</p>
            <div className="files">
                <CargarImagen 
                    setSelectedImage={setSelectedImage} 
                    setImage={setImage} 
                    setLimitSize={setLimitSize}
                />                        
                <CargarArchivos
                    setSelectedFiles={setSelectedFiles}
                    setLimitSize={setLimitSize}
                />
            </div>
            <p className="input__p--nota">* No se aceptan archivos mayores a 10MB.</p>
        </div>
    )
}

export default Cargar
