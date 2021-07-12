const {validationResult} = require('express-validator');

const mainController = {
    index: (req, res) => {
        return res.render('index');
    },
    register: (req, res) => {
        return res.render('users/register');
    },
    processRegister:(req, res)=>{
        const resValidation = validationResult(req);
        return res.send(resValidation);
    },

    login: (req, res) => {
        return res.render('users/login');
    },
    
}
module.exports = mainController;