const {validationResult} = require('express-validator');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

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
    },
    misproductos: (req,res) => {
        return res.render('misproductos', {'products': products});
    }  
}
module.exports = mainController;