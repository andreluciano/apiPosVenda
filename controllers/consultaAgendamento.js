const ConsultaAgendamento = require('../models/consultaAgendamento');

module.exports = app => {

    app.get('/consultaAgendamento', (req, res) => {
        ConsultaAgendamento.listaTodos(res);
    });

    app.get('/consultaAgendamento/:id', (req, res) => {
        const id = parseInt(req.params.id);
        ConsultaAgendamento.buscaPorId(id, res);
    });

   
};