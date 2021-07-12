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
        if(resValidation.errors.length > 0){
            return res.render('users/register', {
                errors: resValidation.mapped(),
            });
        }
    },

    login: (req, res) => {
        return res.render('users/login');
    },
    
}
module.exports = mainController;