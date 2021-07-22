const {validationResult} = require('express-validator');
const fs = require('fs');
const path = require('path');
const User  = require('../models/User');
const bcrypt = require('bcryptjs');

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

        let passEncriptada = bcrypt.hashSync(req.body.password, 10);
        let imagen = "";
        if(req.file){
            imagen = req.file.filename;
            console.log(imagen);
        }



        usuario = {
            id : User.generateID(),
            nombre : req.body.nameUser,
            apellidoPaterno : req.body.lastName,
            apellidoMaterno : req.body.lastNameM,
            email : req.body.email,
            constrasena : passEncriptada,
            rol : req.body.rol.value,
            imagen : imagen
        }

        console.log(usuario);
        return res.send("Validaciones en registro OK "+usuario);
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