const Agendamento = require('../models/agendamento');

module.exports = app => {

    app.post('/agendamento', (req, res) => {
        const dados = req.body;
        console.log(dados);
        Agendamento.adiciona(dados, res);
    });

    app.delete('/agendamento/:id', (req, res) => {
        const id = parseInt(req.params.id);
        Agendamento.deleta(id, res)
    });

};