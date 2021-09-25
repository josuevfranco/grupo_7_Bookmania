const express = require('express');
const router = express.Router();

//controller
const productsController = require('../controllers/productsController');

//Middlewares
const validations = require('../middlewares/validationsLibroMiddleware');
const uploadFile = require('../middlewares/multerLibroMiddleware');

//Carrito
router.get('/carrito', productsController.carrito);
router.get('/producto', productsController.producto);

//Categoría 1
router.get('/cat_arte', productsController.cat_arte);

//Todos los productos
router.get('/misproductos', productsController.misproductos);

//formulario de creación de productos 
router.get('/crearProducto', productsController.crearProducto);

//almacenamiento de productos
router.post('/crearProducto', uploadFile.single('imagenLibro'), validations, productsController.store);

//Editar libro
router.get('/edit/:id/', productsController.edit);
router.put('/editar/:id', uploadFile.single('imagenLibro'), productsController.update);

//Detalle de libro
router.get('/detail/:id', productsController.detail); 

//Eliminar libro
router.delete('/eliminar/:id', productsController.eliminar); 



module.exports = router;


