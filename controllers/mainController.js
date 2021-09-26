const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const User = require('../models/User-old');


const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const mainController = {
    index: (req, res) => {
        return res.render('index');
    },

    //REGISTRO
    register: (req, res) => {
        return res.render('users/register');
    },

    //Proceso de Registro de un usuario CREATE
    processRegister: (req, res) => {
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
            if (req.file) {
                imagen = req.file.filename;
                console.log(imagen);
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

            console.log(imagen);
            console.log(req.body.nameUser);

            db.User.create({
                name: req.body.nameUser,
                surnames: surnames,
                email: req.body.email,
                role_id: pos,
                password: passEncriptada,
                src_image: req.file.filename
            });

            // let userToLogin = User.findByField('email', req.body.email);
            // req.session.userLogged = userToLogin;
            // res.cookie('email', userToLogin.email, { maxAge: (1000 * 60) * 60 });
        }


        return res.redirect('/');
    },

    //usuarios totales
    usuarios: (req, res) => {
        //return res.render('users/usuarios', { 'users': users });
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
        /*const userIdex = users.findIndex(user => {
            return user.id == req.params.id;
        });

        users.splice(userIdex, 1);

        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        //res.redirect(req.get('referer'));
        res.redirect("/usuarios");*/


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
            console.log('Found It, Bitch :P'); // 'My Title'
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
    detailUser: (req, res) => {
        db.User.findByPk(req.params.id)
            .then(function (users) {
                res.render('users/detailUser', { users });
            })
    },
    editUser: (req, res) => {
        let userEditar = db.User.findByPk(req.params.id);
        let roleEditar = db.UserRole.findAll();
        Promise.all([userEditar, roleEditar])
            .then(function ([UserToEdit, role]) {
                res.render('users/editUser', { UserToEdit: UserToEdit, role: role })
            })
    },
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

        res.redirect("/misproductos");
    }
}
module.exports = mainController;