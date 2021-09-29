const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body('nameUser').notEmpty().withMessage('Tienes que escribir un nombre (s)').bail()
        .isLength({min:2}).withMessage('El nombre debe tener al menos 2 caracteres'),
    body('lastName').notEmpty().withMessage('Tienes que escribir tu apellido paterno').bail()
        .isLength({min:2}).withMessage('Los apellidos deben tener al menos 2 caracteres'),
    body('lastNameM').notEmpty().withMessage('Tienes que escribir tu apellido materno'),
    body('email').notEmpty().withMessage('Tienes que escribir un email').bail()
        .isEmail().withMessage('Debes escribir un correo válido'),
    body('password').notEmpty().withMessage('Debes escribir una contraseña').bail()
        .isLength({min: 8}).withMessage('La contraseña debe ser de mínimo 8 caracteres'),
    body('rol').notEmpty().withMessage('Selecciona el rol al que perteneces'),
    
    body('avatar').custom((value, {req}) =>{
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif', 'jpeg'];
        if(!file){
            //throw new Error('Tienes que subir una imagen de usuario');
            //No va a pasar nada, en automático le vamos a asignar una imagen en caso de no subir. 
        } else{
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error('Las extensiones de archivos permitidas son ${acceptedExtensions.join(', ')}$')
            } 
        }
        return true;
    })
] 