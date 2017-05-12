/*jshint esversion: 6*/

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function pruebas(req, res) {
    res.status(200).send({message: 'Acción controlador'});
}

function saveUser(req, res) {
    var user = new User();
    var params = req.body;

    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = 'null';

    if(params.password) {
        bcrypt.hash(params.password, null, null, (err, hash) =>{
            user.password = hash;
            if (user.name != null && user.surname != null && user.email != null) {
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({message: 'Error al guardar al usuario'});
                    } else {
                        if (!userStored) {
                            res.status(404).send({message: 'No se ha registrado el usuario'});
                        } else {
                            res.status(200).send({User: userStored});
                        }
                    }
                });
            } else {
                res.status(200).send({message: 'Rellena todos los campos'});
            }
        });
    } else {
        res.status(500).send({message: 'Introduce la contraseña'});
    }
}

// ToDo: toLowerCase (email); Si falta email, control.
function loginUser(req, res) {
    var params = req.body;

    var email = params.email; //.toLowerCase();
    var password = params.password;

    User.findOne({email: email}, (err, user) => {
        if (err) {
            res.status(500).send({message: 'Error en la petición'});
        } else {
            if (!user) {
                res.status(404).send({message: 'El usuario no existe'});
            } else {
                bcrypt.compare(password, user.password, (err, check) => {
                    if (check) {
                        if (params.gethash) {
                            // Token
                            res.status(200).send({token: jwt.createToken(user)});
                        } else {
                            res.status(200).send({user});
                        }
                    } else {
                        res.status(404).send({message: 'El usuario no ha podido loguearse'});
                    }
                });
            }
        }
    });
}

function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err) {
            res.status(500).send({message: 'Error al actualizar al usuario'});
        } else {
            if (!userUpdated) {
                res.status(404).send({message: 'No se ha podido actualizar al usuario'});
            } else {
                res.status(200).send({user: userUpdated});
            }
        }
    });
}

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser
};
