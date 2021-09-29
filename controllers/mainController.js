const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');


const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');

const mainController = {
    index: (req, res) => {
        return res.render('index');
    },

    //REGISTRO
    register: (req, res) => {
        return res.render('users/register');
    },

    //Proceso de Registro de un usuario CREATE
    processRegister: async (req, res) => {
        const resValidation = validationResult(req);
        let passEncriptada = bcrypt.hashSync(req.body.password, 10);
        let imagen = "";

        //verificamos que no haya campos vacios
        if (resValidation.errors.length > 0) {
            return res.render('users/register', {
                errors: resValidation.mapped(),
                oldData: req.body,
            });
        }
        else {
            let imagenAlternativa = "";
            if (req.file) {
                imagenAlternativa = req.file.filename;
            }else{
                imagenAlternativa = "user.png"
            }

            let rol = ['Administrador', 'Cliente'];
            let seleccionada = req.body.rol;
            let pos = 0;

            for (let i = 0; i < rol.length; i++) {
                if (rol[i] == seleccionada) {
                    pos = i + 1;
                }
            }

            let surnames = req.body.lastName + " " + req.body.lastNameM;

            db.User.create({
                name: req.body.nameUser,
                surnames: surnames,
                email: req.body.email,
                role_id: pos,
                password: passEncriptada,
                src_image: imagenAlternativa
            });

            // let userToLogin = User.findByField('email', req.body.email);
            //const userToLogin = await db.User.findOne({ where: { email: req.body.email } });
            //req.session.userLogged = userToLogin;
            //res.cookie('email', userToLogin.email, { maxAge: (1000 * 60) * 60 });
        }


        return res.redirect('/');
    },

    //usuarios totales
    usuarios: (req, res) => {
        db.User.findAll()
            .then(function (users) {
                return res.render('users/usuarios', { 'users': users });
            })
    },

    //eliminar usuario
    deleteUser: (req, res) => {
        db.User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect("/usuarios");
    },

    //LOGIN
    login: (req, res) => {
        return res.render('users/login');
    },

    //procesar login
    processLogin: async (req, res) => {
        const validation = validationResult(req);
        //let userToLogin = User.findByField('email', req.body.email);

        const userToLogin = await db.User.findOne({ where: { email: req.body.email } });

        if (userToLogin === null) {
            console.log('Not found!');
        } else {
            console.log(userToLogin);
        }
        
        if (validation.errors.length > 0) {
            return res.render('users/login', {
                errors: validation.mapped(),
                oldData: req.body,
            });
        }

        if (userToLogin) {
            let passwordOK = bcrypt.compareSync(req.body.password, userToLogin.password);
            if (passwordOK) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin;
                console.log(req.session.userLogged);
        
                if (req.body.remember_user) {
                    res.cookie('email', req.body.email, { maxAge: (1000 * 60) * 60 })
                }
                return res.redirect('/');
            }
            return res.render('users/login', {
                errors: {
                    email: {
                        msg: 'El usuario o contraseña son incorrectos'
                    }
                }
            });
        }
        return res.render('users/login', {
            errors: {
                email: {
                    msg: 'Usuario no registrado'
                }
            }
        });
    },

    //perfil de usuario
    profile: (req, res) => {
        return res.render('/', {
            user: req.session.userLogged
        });
    },

    logout: (req, res) => {
        res.clearCookie('email');
        req.session.destroy();
        return res.redirect('/');
    },

    contact: (req, res) => {
        return res.render('archivosEJS/contact');
    },
    notLogged: (req, res) => {
        return res.redirect('/login');
    },
    userProfile: (req, res) => {
        return res.render('users/profile');
    },
    restrictedArea: (req, res) => {
        return res.render('users/restrictedPage');
    },

    //detalle de usuario 
    detailUser: (req, res) => {
        db.User.findByPk(req.params.id)
            .then(function (users) {
                res.render('users/detailUser', { users });
            })
    },

    //editar usuario
    editUser: (req, res) => {
        let userEditar = db.User.findByPk(req.params.id);
        let roleEditar = db.UserRole.findAll();
        Promise.all([userEditar, roleEditar])
            .then(function ([UserToEdit, role]) {
                res.render('users/editUser', { UserToEdit: UserToEdit, role: role })
            })
    },

    //actualizar usuario
    updateUser: (req, res) => {
        let data = req.body;
        let rol = ['Administrador', 'Cliente'];

        let seleccionada = req.body.rol;
        let pos = 0;

        for (let i = 0; i < rol.length; i++) {
            if (rol[i] == seleccionada) {
                pos = i + 1;
            }
        }

        //Concatenar para apellidos

        db.User.update({
                name: data.nameUser,
                surnames: surnames,
                email: data.email,
                role_id: pos,
                src_image: req.file.filename
            }, {
                where: {
                    id: req.params.id
                }
            }
        )
        res.redirect("/usuarios");
    }
}
module.exports = mainController;