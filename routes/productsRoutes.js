const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');
router.get('/carrito', productsController.carrito);
router.get('/producto', productsController.producto);
router.get('/actualizar_producto', productsController.actualizar_producto);
router.get('/cat_arte', productsController.cat_arte);

module.exports = router;
