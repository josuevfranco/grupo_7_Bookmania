const express = require('express');
const router = express.Router();

//controller
const productsController = require('../controllers/productsController');

//Middlewares
const validationsProduct = require('../middlewares/validationsLibroMiddleware');
const uploadFile = require('../middlewares/multerLibroMiddleware');

//Carrito
router.get('/carrito', productsController.carrito);
router.get('/producto', productsController.producto);

//Categorías
router.get('/arte', productsController.cat_arte);
router.get('/ingenieria-informatica', productsController.cat_ingenieria);
router.get('/ciencia', productsController.cat_ciencia);

//Todos los productos
router.get('/misproductos', productsController.misproductos);

//formulario de creación de productos 
router.get('/crearProducto', productsController.crearProducto);

//almacenamiento de productos
router.post('/crearProducto', uploadFile.single('imagenLibro'), validationsProduct, productsController.store);

//Editar libro
router.get('/edit/:id/', productsController.edit);
router.put('/editar/:id', uploadFile.single('imagenLibro'), validationsProduct, productsController.update);

//Detalle de libro
router.get('/detail/:id', productsController.detail); 

//Eliminar libro
router.delete('/eliminarLibro/:id', productsController.eliminarLibro); 



module.exports = router;


