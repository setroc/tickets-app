import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import moment from 'moment';
import 'moment/locale/es-mx';

import { solicitarTicket } from '../actions/ticket';

const useFormTicket = () => {
    const dispatch = useDispatch();

    //Estado del componente Email en caso de tickets elaborados por nosotros
    const [email, setEmail] = useState('');
    const [fechaSoli, setFechaSoli] = useState(moment().format("YYYY-MM-DD[T]HH:mm"));

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
    const submit = (role) => {
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
        formData.append('lugar',lugar);
        formData.append('categoria',tipo);
        if ( role === 'ADMIN' && email !== '' ) { // ticket hecho por admin
            formData.append('email', email);
            formData.append('fechaSolicitud',fechaSoli);
        }else {
            formData.append('fechaSolicitud',moment().format("YYYY-MM-DD[T]HH:mm"));
        }
        
        dispatch( solicitarTicket(formData) );

        resetTextArea();
        setSelectedImage(null);
        setImage(null);
        setSelectedFiles([]);
        setLugar('cat');
        setTipo('solicitud');

        setEmail('');
        setFechaSoli(moment().format("YYYY-MM-DD[T]HH:mm"));
    }
    return {
        email, 
        setEmail,
        fechaSoli, 
        setFechaSoli,
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