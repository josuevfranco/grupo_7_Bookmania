const path = require('path');
const { body } = require('express-validator');

module.exports = [
      body('titulo').notEmpty().withMessage('Tienes que escribir el nombre del libro'),
      body('autor').notEmpty().withMessage('Tienes que escrbir el autor del libro'),
      body('anio').notEmpty().withMessage('Tienes que escribir el año de publicación'),
      body('editorial').notEmpty().withMessage('Tienes que escribir la editorial del libro'),
      body('precioLib')
          .notEmpty().withMessage('Debes de asignar un precio').bail()
          .isNumeric().withMessage('Escribe el precio en formato de número'),
      body('categoria').notEmpty().withMessage('Tienes que seleccionar una categoría'),
    
    
      body('paginas')
          .notEmpty().withMessage('Tienes que escribir el total de páginas del libro').bail()
          .isNumeric().withMessage('Escribe las páginas en formato de número'),
    
      body('idioma')
          .notEmpty().withMessage('Escribe el idioma del libro'),
      body('rating')
          .notEmpty().withMessage('Escribe el raiting del libro').bail()
          .isNumeric().withMessage('Escribe el raiting en formato de número'),

      body("resenia").notEmpty().withMessage('Escribe la reseña del libro'),

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