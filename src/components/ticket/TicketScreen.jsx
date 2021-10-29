import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

import { useForm } from './../../hooks/useForm';

import { solicitarTicket } from '../../actions/ticket';

import Lugar from '../lugar/Lugar';
import Tipo from '../tipo/Tipo';
import Reporte from './../reporte/Reporte';
import CargarArchivos from '../cargarArchivos/CargarArchivos';
import CargarImagen from '../cargarImagen/CargarImagen';
import { NavBar } from './../navbar/NavBar';
import ArchivoItem from '../archivoItem/ArchivoItem';

export const TicketScreen = () => { 

    const dispatch = useDispatch();
    //estado que cuenta el tamaño de los archivos seleecionados tanto de la imagen como los archivos, no debe ser mayor a 10MB
    const [limitSize, setLimitSize] = useState(10 * 1024 * 1024);
    //estado del texto ingresado
    const [formValues, handleInputChange, reset] = useForm({
        text: ''
    })
    const {text} = formValues;
    //estado de los input radio
    const [lugar, setLugar] = useState('cat');
    const [tipo, setTipo] = useState('solicitud');
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
    const validarFormulario = () => {
        //valido que el mensaje no este vacio
        if (text.length === 0) {
            return false;
        }
        return true;
    }

    const handleSubmit = (e)=> {
        e.preventDefault();

        if ( !validarFormulario() ) {
            Swal.fire({
                title: "Es necesario incluir explicación en la solicitud",
                icon: "error",
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonColor: "#4796ff"
            })
            return;
        }

        if (limitSize <= 0) {
            Swal.fire({
                title: "Se excede el límite de tamaño de archivos :(",
                icon: "error",
                showCancelButton: false,
                showConfirmButton: true,
                confirmButtonColor: "#4796ff"
            })
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
        formData.append('message', text.replaceAll('<','(').replaceAll('>',')'));
        formData.append('fechaSolicitud',Date());
        formData.append('lugar',lugar);
        formData.append('tipo',tipo);

        dispatch( solicitarTicket(formData) );

        reset();
        setSelectedImage(null);
        setImage(null);
        setSelectedFiles(null);
        setLugar('cat');
        setTipo('solicitud');
    }   

    

    return (
        <div className="ticket__container">
            <NavBar />
            <form onSubmit={handleSubmit}>
                <div className="input__container radio">
                    <Lugar lugar={lugar} setLugar={setLugar}/>
                    <Tipo tipo={tipo} setTipo={setTipo} />
                </div>

                <Reporte text={text} handleInputChange={handleInputChange} />

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

                {
                    image && (
                        <div className="input__container image">
                            <p className="input__p">Previsualización de la imagen seleccionada</p>
                            <img src={image} alt="imagen"/>
                        </div>
                    )
                }
                {
                    (selectedFiles.length > 0) && (
                        <div className="input__container image">
                            <p className="input__p">Archivos seleccionados</p>
                            <ul>
                                {
                                    selectedFiles.map((file) => (
                                        <ArchivoItem 
                                            key={file.name}
                                            nombre={file.name}
                                            tam={file.size}
                                            onDeleteFile={() => onDeleteFile(file.name, file.size)}
                                        />
                                    ))
                                }
                            </ul>
                            {/* <ul>
                                {
                                    Array.from(selectedFiles).map((file) => (
                                        <li key={file.name} onClick={(e)=>{
                                            console.log(e.target)
                                        }}>{file.name}</li>
                                    ))
                                }
                            </ul> */}
                        </div>
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
