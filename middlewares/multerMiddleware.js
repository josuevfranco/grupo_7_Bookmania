const path = require('path');
const multer = require('multer');

//storage para guardar imagen de usuario
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, './public/images/usuarios');
    }, 
    filename: (req, file, cb)=> {
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        const newFileName = 'profile-' + Date.now() + ext; //path.extname(file.originalname)
        cb(null, newFileName);
    }
})

const uploadFile = multer({storage});
module.exports = uploadFile;