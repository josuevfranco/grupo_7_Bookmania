const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const {body} = require('express-validator');

//storage para guardar imagen de libro
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, './public/images/libros');
    }, 
    filename: (req, file, cb)=> {
        const fileName = file.fieldname + '_img' + path.extname(file.originalname);
        cb(null, fileName);
    }
})

const uploadFile = multer({storage});
const productsController = require('../controllers/productsController');

//array de validaciones
const validations = [
    body('id').notEmpty(),
    body('titulo').notEmpty(),
    body('autor').notEmpty(),
    body('año').notEmpty(),
    body('editorial').notEmpty(),
]

router.get('/carrito', productsController.carrito);
router.get('/producto', productsController.producto);

//formulario de creación de productos 
router.get('/crearProducto', productsController.crearProducto);

//procesar la creacion de productos
router.post('/crearProducto', uploadFile.single('libros'), validations, productsController.processProducto); 


router.get('/cat_arte', productsController.cat_arte);

module.exports = router;
