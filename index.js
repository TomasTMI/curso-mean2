/*jshint esversion: 6*/

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/curso_mean2', (err, res) => {
    if (err) {
        console.log('Error: '+err);
        throw err;
    } else {
        console.log ('conexión BBDD');
        app.listen(port, function(){
            console.log('Servidor OK. port: '+port);
        });
    }
});
