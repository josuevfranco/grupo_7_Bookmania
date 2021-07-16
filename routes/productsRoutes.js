const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {body} = require('express-validator');


const multerStorage = multer.memoryStorage();


//storage para guardar imagen de libro
 const storage = multer.diskStorage({
     destination: (req, file, cb)=> {
         cb(null, './public/images/productos');
     }, 
     filename: (req, file, cb)=> {
         //const fileName = file.fieldname + '_img' + path.extname(file.originalname);
         //cb(null, fileName);
         cb(null, file.originalname);
     }
 })

const uploadFile = multer({storage : storage});
const productsController = require('../controllers/productsController');

//array de validaciones
const validations = [
      body('titulo').notEmpty().withMessage('Tienes que escribir el nombre del libro'),
      body('autor').notEmpty().withMessage('Tienes que escrbir el autor del libro'),
      body('anio').notEmpty().withMessage('Tienes que escribir el año de publicación'),
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
          .notEmpty().withMessage('Escribe el raiting del libro').bail()
          .isNumeric().withMessage('Escribe el raiting en formato de número'),

      body('imagenLibro').custom((value, {req}) =>{
          let file = req.file;
          console.log(JSON.stringify(req.file));
          console.log('here');
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
router.get('/cat_arte', productsController.cat_arte);

//formulario de creación de productos 
router.get('/crearProducto', productsController.crearProducto);
//almacenamiento de productos
router.post('/crearProducto', uploadFile.single('imagenLibro'), validations, productsController.store);
//procesar la creacion de productos
//router.post('/crearProducto', uploadFile.single('imagenLibro'), validations, productsController.processProducto); 

//Editar libro
router.get('/edit/:id/', productsController.edit);
router.put('/editar/:id', productsController.update);



//Mostrar un Libro en Específico
router.get('/detail/:id', productsController.detail); 

//Eliminar producto
router.delete('/eliminar/:id', productsController.delete); 


module.exports = router;


