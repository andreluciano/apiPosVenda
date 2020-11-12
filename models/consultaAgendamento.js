const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class ConsultaAgendamento {

    listaTodos(res){
        const sql = 'SELECT * FROM mensagens_agendadas';

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultados);
            }
        });
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM mensagens_agendadas WHERE idAgendamento = ${id}`;

        conexao.query(sql, (erro, resultados) => {
            const mensagem = resultados[0];
            if(erro){
                res.status(400).json(erro);
            }else{
                if(resultados.length>0){
                    res.status(200).json(mensagem);
                }else{
                    const aviso = "nenhum registro encontrado";
                    const retorno = {aviso};
                    res.status(200).json(retorno);
                }
            }
        });
    }

}

module.exports = new ConsultaAgendamento;