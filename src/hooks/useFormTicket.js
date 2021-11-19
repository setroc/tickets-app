import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { solicitarTicket } from '../actions/ticket';

const useFormTicket = () => {
    const dispatch = useDispatch();

    //limite de archvios
    const [limitSize, setLimitSize] = useState(10*1024*1024);

    //input radio que manejan el lugar y tipo
    const [lugar, setLugar] = useState('cat');
    const [tipo, setTipo] = useState('solicitud');

    //textarea
    const [textArea, setTextArea] = useState('');
    //borrar texto del textArea
    const resetTextArea = () => {
        setTextArea('');
    }
    const handleTextAreaChange = ({target}) => {
        setTextArea(target.value);
    }

    //estado de imagen y archvios subidos
    const [selectedImage, setSelectedImage] = useState(null);
    const [image, setImage] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    //borrar archivo
    const onDeleteFile = (name, size) => {
        setLimitSize((prevSate) => (prevSate + size));
        setSelectedFiles(selectedFiles.filter((file) => {
            return (file.name !== name) && file  
        }));
    }
    //borrar imagen
    const onDeleteImage = () => {
        setLimitSize((prevSate) => (prevSate + selectedImage.size));
        setSelectedImage(null);
        setImage(null);
    }

    const validarDatos = () => {
        if ( textArea.trim().length <= 0 ) {
            Swal.fire({
                title: "Es necesario incluir explicación en la solicitud",
                icon: "error",
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonColor: "#4796ff"
            })
            return false;
        }
        if ( limitSize <=0 ) {
            Swal.fire({
                title: "Se excede el límite de tamaño de archivos :(",
                icon: "error",
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonColor: "#4796ff"
            })
            return false;
        }
        selectedFiles.forEach(file => {
            if (file.name.includes('exe') || file.name.includes('.bat')) {
                console.log('Archivo no permitido');
                return false;
            }
        });
        return true;
    }
    const submit = () => {
        if ( !validarDatos() ) {
            return;
        }

        Swal.fire({
            title: 'Por favor espere',
            html: 'Enviando ticket...',
            allowOutsideClick: false,
            showCancelButton: false,
            showConfirmButton: false,
            backdrop:true,
            willOpen: ()=> {
                Swal.showLoading()
            }
        });
        const formData = new FormData();
        if (selectedImage !== null){
            formData.append('file', selectedImage);
        }
        if (setSelectedFiles !== null) {
            for (let i=0; i<selectedFiles?.length; i++){
                formData.append('file', selectedFiles[i]);
            }
        }
        formData.append('message', textArea.replaceAll('<','(').replaceAll('>',')'));
        formData.append('fechaSolicitud',Date());
        formData.append('lugar',lugar);
        formData.append('categoria',tipo);

        dispatch( solicitarTicket(formData) );

        resetTextArea();
        setSelectedImage(null);
        setImage(null);
        setSelectedFiles([]);
        setLugar('cat');
        setTipo('solicitud');
    }
    return {
        lugar,
        setLugar,
        tipo,
        setTipo,
        textArea,
        handleTextAreaChange,
        resetTextArea,
        selectedImage,
        setSelectedImage,
        image,
        setImage,
        selectedFiles,
        setSelectedFiles,
        onDeleteFile,
        onDeleteImage,
        limitSize,
        setLimitSize,
        submit
    }
}

export default useFormTicket;