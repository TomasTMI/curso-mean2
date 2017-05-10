/*jshint esversion: 6*/

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');

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

module.exports = {
    pruebas,
    saveUser
};
