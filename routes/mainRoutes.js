const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/', mainController.index);
router.get('/registro', mainController.register);
router.get('/login', mainController.login);
router.get('/carrito', mainController.carrito);
router.get('/producto', mainController.producto);
router.get('/actualizar_producto', mainController.actualizar_producto);
router.get('/cat-arte', mainController.cat_arte);


module.exports = router;