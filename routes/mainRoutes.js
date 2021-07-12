const express = require('express');
const router = express.Router();
const path = require('path');

const {body} = require('express-validator');

const mainController = require('../controllers/mainController');

//array de validaciones
const validations = [
    body('nameUser').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('lastName').notEmpty().withMessage('Tienes que escribir un apellido'),
    body('email').notEmpty().isEmail().withMessage('Tienes que escribir un email valido'),
    body('password').notEmpty().isLength({min: 6}).withMessage('La contraseña debe ser de mínimo 6 caracteres'),
    body('password2').notEmpty(),
]

router.get('/', mainController.index);

//formulario de registro
router.get('/register', mainController.register);

//procesamiento de registro
router.post('/register', validations, mainController.processRegister);

router.get('/login', mainController.login);

module.exports = router;


