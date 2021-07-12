const express = require('express');
const { diskStorage } = require('multer');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, '../public/images/libros');
    }, 
    filename: (req, file, cb)=> {
        const fileName = file.fieldname + '_img' + path.extname(file.filename);
        cb(null, fileName);
    }
})
const uploadFile = multer({storage});

const productsController = require('../controllers/productsController');
router.get('/carrito', productsController.carrito);
router.get('/producto', productsController.producto);
router.get('/crearProducto', productsController.crearProducto);
router.get('/cat_arte', productsController.cat_arte);

module.exports = router;
