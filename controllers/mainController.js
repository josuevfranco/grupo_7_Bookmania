const { validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const mainController = {
    index: (req, res) => {
        return res.render('index');
    },
    register: (req, res) => {
        return res.render('users/register');
    },

    //Proceso de Registro de un usuario
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
            usuario = {
                id: User.generateID(),
                nombre: req.body.nameUser,
                apellidoPaterno: req.body.lastName,
                apellidoMaterno: req.body.lastNameM,
                email: req.body.email,
                password: passEncriptada,
                rol: req.body.rol,
                imagen: imagen
            }
            //Verificamos que el email no esté ya dado de alta
            let userInDB = User.findByField('email', usuario.email);
            if (userInDB) {
                return res.render('users/register', {
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado'
                        }
                    },
                    oldData: req.body
                });
            }
            User.create(usuario);
        }

        let userToLogin = User.findByField('email', req.body.email);
        req.session.userLogged = userToLogin;
        res.cookie('email', userToLogin.email, { maxAge: (1000 * 60) * 60 })

        return res.redirect('/');
        
    },

    //usuarios totales
    usuarios: (req, res) => {
        return res.render('users/usuarios', { 'users': users });
    },

    //elimiinar usuario
    deleteUser: (req, res) => {
        const userIdex = users.findIndex(user => {
            return user.id == req.params.id;
        });

        users.splice(userIdex, 1);

        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        //res.redirect(req.get('referer'));
        res.redirect("/usuarios");
    },

    login: (req, res) => {
        return res.render('users/login');
    },

    //procesar login
    processLogin: (req, res) => {
        const validation = validationResult(req);
        let userToLogin = User.findByField('email', req.body.email);
        

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
                
                if(req.body.remember_user) {
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
    
    profile: (req, res) =>{
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
    }

}
module.exports = mainController;