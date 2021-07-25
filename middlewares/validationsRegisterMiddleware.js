const path = require('path');
const { body } = require('express-validator');

module.exports = [
    body('nameUser').notEmpty().withMessage('Tienes que escribir un nombre (s)'),
    body('lastName').notEmpty().withMessage('Tienes que escribir tu apellido paterno'),
    body('lastNameM').notEmpty().withMessage('Tienes que escribir tu apellido materno'),
    body('email')
        .notEmpty().withMessage('Tienes que escribir un email').bail()
        .isEmail().withMessage('Debes escribir un correo válido'),
    body('password')
        .notEmpty().withMessage('Debes escribir una contraseña').bail()
        .isLength({min: 6}).withMessage('La contraseña debe ser de mínimo 6 caracteres'),
    body('rol').notEmpty().withMessage('Selecciona el rol al que perteneces'),
    
    body('avatar').custom((value, {req}) =>{
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        if(!file){
            throw new Error('Tienes que subir una imagen de usuario');
        } else{
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error('Las extensiones de archivos permitidas son ${acceptedExtensions.join(', ')}$')
            } 
        }
        return true;
    })
] 