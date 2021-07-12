const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.index);

//formulario de registro
router.get('/register', mainController.register);

//procesamiento de registro
router.post('/register', mainController.processRegister);

router.get('/login', mainController.login);

module.exports = router;


