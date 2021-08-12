const multer = require('multer');

//storage para guardar imagen de libro
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, './public/images/productos');
    }, 
    filename: (req, file, cb)=> {
        cb(null, file.originalname);
    }
})

const uploadFile = multer({storage : storage});

module.exports = uploadFile;