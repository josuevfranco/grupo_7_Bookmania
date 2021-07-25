const { body } = require('express-validator');

module.exports = [ 
    body('email')
        .notEmpty().withMessage('Tienes que escribir tu correo de registro').bail()
        .isEmail().withMessage('Debes escribir un correo válido').bail(),
    body('password')
        .notEmpty().withMessage('Ingresa tu contraseña de usuario').bail()
        .isLength({min: 6}).withMessage('La contraseña debe ser de mínimo 6 caracteres'),
]