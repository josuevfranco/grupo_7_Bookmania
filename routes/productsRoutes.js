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
    body('titulo').notEmpty().withMessage('Tienes que escribir el nombre del libro'),
    body('autor').notEmpty().withMessage('Tienes que escrbir el autor del libro'),
    body('year').notEmpty().withMessage('Tienes que escribir el año de publicación'),
    body('editorial').notEmpty().withMessage('Tienes que escribir la editorial del libro'),
    body('precio')
        .notEmpty().withMessage('Debes de asignar un precio').bail()
        .isNumeric().withMessage('Escribe el precio en formato de número'),
    
    body('paginas')
        .notEmpty().withMessage('Tienes que escribir el total de páginas del libro').bail()
        .isNumeric().withMessage('Escribe las páginas en formato de número'),
    
    body('idioma')
        .notEmpty().withMessage('Escribe el idioma del libro'),
    body('rating')
        .notEmpty().withMessage('Ecribe el raiting del libro').bail()
        .isNumeric().withMessage('Escribe el raiting en formato de número'),

    body('libros').custom((value, {req}) =>{
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        if(!file){
            throw new Error('Tienes que subir una imagen');
        } else{
            let fileExtension = path.extname(file.originalname);
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error('Las extensiones de archivos permitidas son ${acceptedExtensions.join(', ')}$')
            } 
        }
        return true;
    })
]

router.get('/carrito', productsController.carrito);
router.get('/producto', productsController.producto);

//formulario de creación de productos 
router.get('/crearProducto', productsController.crearProducto);

//procesar la creacion de productos
router.post('/crearProducto', uploadFile.single('libros'), validations, productsController.processProducto); 


router.get('/cat_arte', productsController.cat_arte);

module.exports = router;
