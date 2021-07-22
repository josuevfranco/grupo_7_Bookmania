const {validationResult} = require('express-validator');
const User  = require('../models/User');
const bcrypt = require('bcryptjs');

const fs = require('fs');
const path = require('path');

const mainController = {
    index: (req, res) => {
        return res.render('index');
    },
    register: (req, res) => {
        return res.render('users/register');
    },

    //Proceso de Registro de un usuario
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
            rol : req.body.rol,
            imagen : imagen
        }

        //Verificamos que el email no esté ya dado de alta
        let userInDB = User.findByField('email', usuario.email);

        if (userInDB) {
            return res.render('users/register', {
                errors: {
                    email: {
                        msg:'Este email ya está registrado'
                    }
                },
                oldData: req.body
            });
        }

        User.create(usuario);
        console.log(usuario);
        //return res.send("Validaciones y registro en registro OK ");
        return res.render('users/login');
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