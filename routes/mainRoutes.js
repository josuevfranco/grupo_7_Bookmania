const express = require('express');
const router = express.Router();

const {body} = require('express-validator');

const mainController = require('../controllers/mainController');

//array de validaciones de registro
const validationsRegister = [
    body('nameUser').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('lastName').notEmpty().withMessage('Tienes que escribir un apellido'),
    body('email')
        .notEmpty().withMessage('Tienes que escribir un email').bail()
        .isEmail().withMessage('Debes escribir un correo válido'),
    body('password')
        .notEmpty().withMessage('Debes escribir una contraseña').bail()
        .isLength({min: 6}).withMessage('La contraseña debe ser de mínimo 6 caracteres'),
    body('password2').notEmpty(),
]

//array de validaciones de login
const validationsLogin = [
    body('emailUser')
        .notEmpty().withMessage('Tienes que escribir tu correo de registro').bail()
        .isEmail().withMessage('Debes escribir un correo válido').bail(),
    body('passwordUser')
        .notEmpty().withMessage('Ingresa tu contraseña de usuario').bail()
        .isLength({min: 6}).withMessage('La contraseña debe ser de mínimo 6 caracteres'),
]

//página de inicio
router.get('/', mainController.index);

//página formulario de registro
router.get('/register', mainController.register);

//procesamiento de registro
router.post('/register', validationsRegister, mainController.processRegister);

//pagina formulario de login
router.get('/login', mainController.login);

//procesamiento login
router.post('/login', validationsLogin, mainController.processLogin);


module.exports = router;


