import React from 'react'

const ArchivoImagen = ({image, alt, onDeleteImage}) => {
    console.log(image, alt);
    return (
        <>
            <div className="image__delete" onClick={onDeleteImage}>X</div>
            <img src={image} alt={alt} />
        </>
    )
}

export default ArchivoImagen
