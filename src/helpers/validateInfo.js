export default function validateInfo(values) {
    const {password, npassword, npassword2}  = values;
    let errors = {}

    if ( !password ) {
        errors.password = 'La contraseña actual es requerida.';
    }

    if ( !npassword ) {
        errors.npassword = 'La nueva contraseña es requerida.';
    } else if ( npassword.length < 6 ) {
        errors.npassword = 'La nueva contraseña debe contener mínimo 6 caracteres.';
    } else if ( npassword === password ) {
        errors.npassword = 'La nueva contraseña no puede ser igual a la actual.';
    }
    
    if ( !npassword2 ) {
        errors.npassword2 = 'La nueva contraseña es requerida.';
    } else if ( npassword2.length < 6 ) {
        errors.npassword2 = 'La nueva contraseña debe contener mínimo 6 caracteres.';
    } else if ( npassword2 !== npassword ) {
        errors.npassword2 = 'Las contraseñas no coinciden.';
    }

    return errors;
}