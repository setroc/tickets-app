const ArchivoItem = ({nombre, tam, onDeleteFile}) => {
    return (
        <li className="fileItem">
            <div className="fileItem__datos">
                <p>{nombre}</p>
                <p>{tam} KB</p>
            </div>
            <span
                className="fileItem__delete"
                onClick={onDeleteFile}
            >X</span>
        </li>
    )
}

export default ArchivoItem
