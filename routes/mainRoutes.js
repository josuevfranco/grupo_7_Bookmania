const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const {body} = require('express-validator');

const mainController = require('../controllers/mainController');

//storage para guardar imagen de usuario
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, './public/images/usuarios');
    }, 
    filename: (req, file, cb)=> {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        const newFileName = 'profile-' + Date.now() + ext; //path.extname(file.originalname)
        cb(null, newFileName);
    }
})

const uploadFile = multer({storage});



//array de validaciones de registro
const validationsRegister = [
    body('nameUser').notEmpty().withMessage('Tienes que escribir un nombre (s)'),
    body('lastName').notEmpty().withMessage('Tienes que escribir tu apellido paterno'),
    body('lastNameM').notEmpty().withMessage('Tienes que escribir tu apellido materno'),
    body('email')
        .notEmpty().withMessage('Tienes que escribir un email').bail()
        .isEmail().withMessage('Debes escribir un correo válido'),
    body('password')
        .notEmpty().withMessage('Debes escribir una contraseña').bail()
        .isLength({min: 6}).withMessage('La contraseña debe ser de mínimo 6 caracteres'),
    body('password2').notEmpty(),
    
    body('usuarios').custom((value, {req}) =>{
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
router.post('/register', uploadFile.single('usuarios'), validationsRegister, mainController.processRegister);

//pagina formulario de login
router.get('/login', mainController.login);

//procesamiento login
router.post('/login', validationsLogin, mainController.processLogin);

module.exports = router;


