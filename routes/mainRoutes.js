const express = require('express');
const router = express.Router();

//Controller
const mainController = require('../controllers/mainController');

//Middlewares
const loginMiddleware = require('../middlewares/loginMiddleware');
const loginAuthMiddleware = require('../middlewares/loginAuthMiddleware');
const uploadFile = require('../middlewares/multerMiddleware');
const validationsRegister = require('../middlewares/validationsRegisterMiddleware');
const validationsLogin = require('../middlewares/validationsLoginMiddleware');

//página de inicio
router.get('/', mainController.index);

//página formulario de registro
router.get('/register', mainController.register);

//procesamiento de registro
router.post('/register', uploadFile.single('avatar'), validationsRegister, mainController.processRegister);

//Para ver todos los usuarios
router.get('/usuarios', mainController.usuarios);

//Eliminar usuario
router.delete('/:id', mainController.deleteUser); 

//pagina formulario de login
router.get('/login', loginMiddleware, mainController.login);

//procesamiento login
router.post('/login', validationsLogin, mainController.processLogin);

//perfil de usuario
router.get('/', loginAuthMiddleware, mainController.profile);

// Logout
router.get('/logout/', mainController.logout);

//Contacto
router.get('/contact', mainController.contact);

module.exports = router;


