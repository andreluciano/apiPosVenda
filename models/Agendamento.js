const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Agendamento {

    adiciona(dados, res) {
        
        try {
            const dataHoraCadastro = moment().format('YYYY-MM-DD hh:mm:ss');
            const dataHoraEnvio = moment(dados.dataHoraEnvio, 'DD/MM/YYYY hh:mm:ss').format('YYYY-MM-DD HH:mm:ss');
            const destinatario = dados.destinatario;
            const mensagem = dados.mensagem;
            const canalMensagem = dados.canalMensagem;    

            const validaDataHoraEnvio = moment(dataHoraEnvio).isValid();
            const validaDestinatario = destinatario.length > 0;
            const validaMensagem = mensagem.length > 0;
    
            var validaCanalMensagem = false;
            if(canalMensagem == 'email' || canalMensagem == 'sms' || canalMensagem == 'push' || canalMensagem == 'whatsapp'){
                validaCanalMensagem = true;
            }else{
                validaCanalMensagem = false;
            }
    
            console.log(validaCanalMensagem);
    
            const validacoes = [
                {
                    nome: 'dataHoraEnvio',
                    valido: validaDataHoraEnvio,
                    mensagem: 'Data deve ser maior ou igual a data atual'
                },
                {
                    nome: 'destinatario',
                    valido: validaDestinatario,
                    mensagem: 'Destinatário não pode ser vazio'
                },
                {
                    nome: 'mensagem',
                    valido: validaMensagem,
                    mensagem: 'Mensagem não pode ser vazio'
                },
                {
                    nome: 'canalMensagem',
                    valido: validaCanalMensagem,
                    mensagem: 'canalMensagem deve ser: email, sms, push ou whatsapp'
                }
            ];
            
            const erros = validacoes.filter(campo => !campo.valido);
            const existemErros = erros.length;
    
            if(existemErros){
                res.status(400).json(erros)
            }else{
                const situacao = 'agendado';
                const mensagemAgendada = {...dados, dataHoraEnvio, dataHoraCadastro, situacao}
    
                const sql = 'INSERT INTO mensagens_agendadas SET ?';
        
                conexao.query(sql, mensagemAgendada, (erro, resultados) => {
                    if(erro){
                        const status = "erro";
                        const descricao = "Erro no processamento. Verifique os parâmetros.";
                        const retorno = {status, descricao}
    
                        res.status(400).json(retorno);
                    }else{
                        const status = "sucesso";
                        const idAgendamento = resultados.insertId;
                         
                        const retorno = {...mensagemAgendada, status, idAgendamento}
    
                        res.status(201).json(retorno);
                    } 
                });
            }
            
         }catch (e) {
            const status = "erro";
            const descricao = "Erro no processamento. Verifique os parâmetros.";
            const retorno = {status, descricao}

            res.status(400).json(retorno);
         }
        
        
        
        
        
        
    }

    deleta(id, res){
        const sql = 'DELETE FROM mensagens_agendadas WHERE idAgendamento = ?';

        conexao.query(sql, [id], (erro, resultados) => {
            if(erro){
                const status = "erro";
                const descricao = "Erro no processamento. Verifique os parâmetros.";
                const retorno = {status, descricao}

                res.status(400).json(retorno);
            }else{
                const idAgendamento = id;
                var status;
                
                if(resultados.affectedRows == 0){
                    status = "nenhum agendamento com o idAgendamento" + idAgendamento + " foi encontrado";
                }else{
                    status = "sucesso";    
                }

                const retorno = {status, idAgendamento}
                res.status(200).json(retorno);
            }
        });
    }


}

module.exports = new Agendamento;