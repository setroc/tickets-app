import React from 'react'

import Reporte from './../reporte/Reporte';
import useFormTicket from './../../hooks/useFormTicket';
import Servicio from '../servicio/Servicio';
import Cargar from '../cargar/Cargar';
import Imagen from '../imagen/Imagen';
import Archivos from '../archivos/Archivos';

export const TicketScreen = () => { 
    const {
        lugar, 
        setLugar, 
        tipo, 
        setTipo, 
        textArea:text, 
        handleTextAreaChange:handleInputChange,
        selectedImage,
        setSelectedImage,
        image,
        setImage,
        selectedFiles,
        setSelectedFiles,
        onDeleteFile,
        onDeleteImage,
        setLimitSize,
        submit
    } = useFormTicket();

    const handleSubmit = (e)=> {
        e.preventDefault();
       submit();
    }
       
    return (
        <div className="ticket__container">
            <form onSubmit={handleSubmit}>
                <Servicio 
                    lugar={lugar} 
                    setLugar={setLugar} 
                    tipo={tipo} 
                    setTipo={setTipo} 
                />
                <Reporte 
                    text={text} 
                    handleInputChange={handleInputChange} 
                />

                <Cargar 
                    setSelectedImage={setSelectedImage} 
                    setImage={setImage}
                    setSelectedFiles={setSelectedFiles}
                    setLimitSize={setLimitSize}
                />

                {
                    image && (
                        <Imagen 
                            image={image} 
                            alt={selectedImage.name}
                            onDeleteImage={onDeleteImage}
                        />
                    )
                }
                {
                    (selectedFiles.length !== 0) && (
                        <Archivos 
                            selectedFiles={selectedFiles} 
                            onDeleteFile={onDeleteFile} 
                        />
                    )
                }
                <div className="input__container">
                    <button
                        className="btn-block btn-login"
                        type="submit"
                    >
                        Solicitar Ticket
                    </button>
                </div>
            </form>
        </div>
    )
}
