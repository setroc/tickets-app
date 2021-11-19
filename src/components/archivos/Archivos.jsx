import React from 'react'
import ArchivoItem from '../archivoItem/ArchivoItem';

const Archivos = ({selectedFiles, onDeleteFile}) => {
    return (
        <div className="input__container image">
            <p className="input__p">Archivos seleccionados</p>
            <ul>
                {
                    selectedFiles.map((file) => (
                        <ArchivoItem 
                            key={file.name}
                            nombre={file.name}
                            tam={file.size*0.001}
                            onDeleteFile={() => onDeleteFile(file.name, file.size)}
                        />
                    ))
                }
            </ul>
        </div>
    )
}

export default Archivos;
