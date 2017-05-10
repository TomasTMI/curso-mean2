/*jshint esversion: 6*/


function pruebas(req, res) {
    res.status(200).send({message: 'Acción controlador'});
}

module.exports = {
    pruebas
};
