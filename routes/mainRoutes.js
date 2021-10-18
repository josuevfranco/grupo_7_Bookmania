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
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');

//página de inicio
router.get('/', mainController.index);

//página formulario de registro
router.get('/register', userLoggedMiddleware, mainController.register);

//procesamiento de registro
router.post('/register', uploadFile.single('avatar'), validationsRegister, userLoggedMiddleware, mainController.processRegister);

//Para ver todos los usuarios
router.get('/usuarios', mainController.usuarios);

//Eliminar usuario <----------
router.delete('/eliminar/:id', mainController.deleteUser); 

//pagina formulario de login
router.get('/login', loginMiddleware, mainController.login);

//procesamiento login
router.post('/login', validationsLogin, mainController.processLogin);

//perfil de usuario
router.get('/', loginAuthMiddleware, mainController.profile);

// Logout
router.get('/logout/', mainController.logout);

// Rutas accesibles solo con login redireccionan al login
router.get('/notLogged/', mainController.notLogged);

// Rutas accesibles solo sin login redireccionan al perfil
router.get('/profile/', mainController.userProfile);

// No tienes permiso de Admin
router.get('/restrictedArea/', mainController.restrictedArea);

//Contacto
router.get('/contact', mainController.contact);
//nosotros
router.get('/nosotros', mainController.nosotros);

//Detalle del Usuario
router.get('/detailUser/:id', mainController.detailUser); 

//Editar un Usuario 
router.get('/editUser/:id/', mainController.editUser);
router.put('/editarUser/:id', uploadFile.single('avatar'),  validationsRegister, mainController.updateUser);


module.exports = router;


