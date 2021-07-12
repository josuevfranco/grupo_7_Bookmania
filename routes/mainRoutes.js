const express = require('express');
const router = express.Router();
const path = require('path');

const {body} = require('express-validator');

const mainController = require('../controllers/mainController');

//array de validaciones
const validations = [
    body('nameUser').notEmpty(),
    body('lastName').notEmpty(),
    body('email').notEmpty(),
    body('password').notEmpty(),
    body('password2').notEmpty(),
]

router.get('/', mainController.index);

//formulario de registro
router.get('/register', mainController.register);

//procesamiento de registro
router.post('/register', validations, mainController.processRegister);

router.get('/login', mainController.login);

module.exports = router;


