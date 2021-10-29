const CargarImagen = ({setSelectedImage, setImage ,setLimitSize}) => {
    const handleImageChange = (e) => {
        if (e.target.files?.length === 1) {
            setSelectedImage(e.target.files[0]);
            setLimitSize((prevState)=>(prevState-e.target.files[0].size));
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    }
    return (
        <div className="file__container">
            <input 
                type="file" 
                name="images" 
                id="images"
                accept="image/*"
                onChange={handleImageChange}
            />
            <label htmlFor="images">
                Cargar Imagen*
            </label>
        </div>
    )
}

export default CargarImagen
