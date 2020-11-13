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

        try {

            conexao.query(sql, (erro, resultados) => {
                if(erro){
                    const status = "erro";
                    const descricao = "Erro no processamento. Verifique os parâmetros.";
                    const retorno = {status, descricao}

                    res.status(400).json(retorno);
                }else{
                    if(resultados.length>0){
                        const mensagem = resultados[0];
                        res.status(200).json(mensagem);
                    }else{
                        const status = "nenhum registro encontrado";
                        const retorno = {status};
                        res.status(200).json(retorno);
                    }
                }
            });

        }catch (e) {
            const status = "erro";
            const descricao = "Erro no processamento. Verifique os parâmetros.";
            const retorno = {status, descricao}

            res.status(400).json(retorno);
        }
    }

}

module.exports = new ConsultaAgendamento;