import React from 'react';

const Imagen = ({onDeleteImage, image, alt}) => {
    return (
        <div className="input__container image">
            <p className="input__p">Previsualización de la imagen seleccionada</p>
            <div className="image__delete" onClick={onDeleteImage}>X</div>
            <img src={image} alt={alt} />
        </div>
    )
}

export default Imagen;
