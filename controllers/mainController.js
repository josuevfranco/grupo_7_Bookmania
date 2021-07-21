const {validationResult} = require('express-validator');
const fs = require('fs');
const path = require('path');




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
                oldData: req.body,
            });
        }
        return res.send("Validaciones en registro OK");
    },

    login: (req, res) => {
        return res.render('users/login');
    },

    processLogin:(req, res)=>{
        const resValidation = validationResult(req);
        if(resValidation.errors.length > 0){
            return res.render('users/login', {
                errors: resValidation.mapped(),
                oldData: req.body,
            });
        }

        return res.send("Validaciones en LOGIN OK");
    }
}
module.exports = mainController;