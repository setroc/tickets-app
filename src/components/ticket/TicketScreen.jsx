import React, { useState } from 'react'
import { NavBar } from './NavBar';
import { useForm } from './../../hooks/useForm';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { solicitarTicket } from '../../actions/ticket';

export const TicketScreen = () => { 

    const dispatch = useDispatch();

    const [limitSize, setLimitSize] = useState(10 * 1024 * 1024);

    const [formValues, handleInputChange, reset] = useForm({
        text: ''
    })
    const {text} = formValues;

    //inputs radio
    const [lugar, setLugar] = useState('cat');
    const handleRadioLugarChange = (e)=> {
        setLugar(e.target.value);
    }
    
    const [tipo, setTipo] = useState('solicitud');
    const handleRadioTipoChange = (e)=> {
        setTipo(e.target.value);
    }


    const [selectedImage, setSelectedImage] = useState(null);
    const [image, setImage] = useState(null);
    const handleImageChange = (e) => {
        if (e.target.files?.length === 1) {
            setSelectedImage(e.target.files[0]);
            setLimitSize(limitSize-e.target.files[0].size);
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    }
    const [selectedFiles, setSelectedFiles] = useState(null);
    const handleFilesChange = (e) => {
        if (e.target.files?.length > 0) {
            setSelectedFiles(e.target.files);
            for (let i = 0; i<e.target.files.length;i++) {
                setLimitSize(limitSize-e.target.files[i].size);
            } 
        }
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
                    <div>
                        <h3 className="radio--title">Seleccione el lugar del servicio</h3>
                        <label>
                            <input 
                                type="radio" 
                                name="lugar" 
                                value="cat" 
                                id="cat"
                                checked={lugar === 'cat' ? true : false}
                                onChange={handleRadioLugarChange}
                                />
                                Coorporativo Caja
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="lugar" 
                                value="consejo" 
                                id="consejo" 
                                checked={lugar === 'consejo' ? true : false}
                                onChange={handleRadioLugarChange}
                            />
                            Consejo
                        </label>
                    </div>

                    <div>
                        <h3 className="radio--title">Seleccione el tipo de servicio</h3>
                        <label>
                            <input 
                                type="radio" 
                                name="tipo" 
                                value="solicitud" 
                                id="solicitud" 
                                checked={tipo === 'solicitud' ? true : false}
                                onChange={handleRadioTipoChange}
                            />
                            Solicitud
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="tipo" 
                                value="incidente" 
                                id="incidente" 
                                checked={tipo === 'incidente' ? true : false}
                                onChange={handleRadioTipoChange}
                            />
                            Incidente
                        </label>
                    </div>

                </div>
                <div className="input__container">
                    <label htmlFor="text">Explique de la mejor manera el incidente o solicitud que desea reportar</label>
                    <textarea 
                        name="text" 
                        id="text"
                        rows="8"
                        placeholder="Realizar cambio de hardphone a softphone del usuario <nombre> con extensión <ext>"
                        value={text}
                        onChange={handleInputChange}
                    >
                    </textarea>
                </div>

                <div className="input__container">
                    <p className="input__p">En caso de ser necesario.</p>
                    <div className="files">
                        <div className="file__container">
                            <input 
                                type="file" 
                                name="images" 
                                id="images"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="images">
                                <i className="fas fa-upload"></i>
                                Cargar Imagen*
                            </label>
                        </div>

                        <div className="file__container">
                            <input 
                                type="file" 
                                name="files" 
                                id="files"
                                accept="audio/*,video/*,.pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain"
                                onChange={handleFilesChange}
                                multiple
                            />
                            <label htmlFor="files">
                                <i className="fas fa-upload"></i>
                                Cargar Archivos*
                            </label>
                        </div>
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
                    selectedFiles && (
                        <div className="input__container image">
                            <p className="input__p">Archivos seleccionados</p>
                            <ul>
                                {
                                    Array.from(selectedFiles).map((file, i) => (
                                        <li key={i}>{file.name}</li>
                                    ))
                                }
                            </ul>
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
