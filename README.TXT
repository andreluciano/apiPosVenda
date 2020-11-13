---------------------------
** PREPARANDO O AMBIENTE **
---------------------------
    A api foi desenvolvida em "nodejs" e utiliza banco de dados "mysql".
    É necessário que o ambiente na qual será executada estejam instalados tanto o nodejs quanto o mysql


--------------------
** Banco de Dados **
--------------------
    Script para criação da tabela utilizada pela api:

    CREATE SCHEMA db_mensagens_posvenda;

    use db_mensagens_posvenda;

    CREATE TABLE IF NOT EXISTS mensagens_agendadas(
        idAgendamento int NOT NULL AUTO_INCREMENT,
        dataHoraCadastro datetime NOT NULL,
        dataHoraEnvio datetime NOT NULL,
        destinatario varchar(50) NOT NULL,
        mensagem text NOT NULL,
        canalMensagem varchar(20) NOT NULL,
        situacao varchar(20) NOT NULL,
        PRIMARY KEY(idAgendamento)
    );


----------------
** Instalação **
----------------
    Para instalação da api no servidor, executar os seguintes comandos:
    1: npm install
    2: npm install pm2 -g

    NOTA: utilizaremos o pm2 para gerenciamento da api


------------------
** Configuração **
------------------
    No arquivo /infraestrutura/conexao.js é necessário colocar as credenciais de acesso do banco de dados mysql no qual irá utilizar


--------------------------
** Iniciando o servidor **
--------------------------
    Executar o comando: pm2 start index.js


----------------------
** Consumindo a api **
----------------------

    ** Inserir um agendamento de mensagem:
        Método POST: <url>/agendamento/

        parâmetros JSON do método:
        {
            "dataHoraEnvio": "",
            "destinatario": "",
            "mensagem": "",
            "canalMensagem": ""
        }

        dataHoraEnvio: deve estar no formato: DD/MM/AAAA hh:mm:ss
        destinatario: Campos texto de até 50 caracteres
        mensagem: Campos texto
        canalMensagem: deve ser uma das opções: sms, email, push, whatsapp

        Exemplo:
        {
            "dataHoraEnvio": "12/11/2020 09:00:00",
            "destinatario": "André",
            "mensagem": "Teste de mensagem",
            "canalMensagem": "sms"
        }

        Retornos
        Sucesso (Status 200):
        {
            "dataHoraEnvio": "2020-11-12 09:00:00",
            "destinatario": "André",
            "mensagem": "Teste de mensagem",
            "canalMensagem": "sms",
            "dataHoraCadastro": "2020-11-12 09:07:57",
            "situacao": "agendado",
            "status": "sucesso",
            "idAgendamento": 2
        }

        Parâmetros fora do esperado (Status 200): 
            [
                {
                    "nome": "dataHoraEnvio",
                    "valido": false,
                    "mensagem": "Data deve ser maior ou igual a data atual"
                },
                {
                    "nome": "destinatario",
                    "valido": false,
                    "mensagem": "Destinatário não pode ser vazio"
                },
                {
                    "nome": "mensagem",
                    "valido": false,
                    "mensagem": "Mensagem não pode ser vazio"
                },
                {
                    "nome": "canalMensagem",
                    "valido": false,
                    "mensagem": "canalMensagem deve ser: email, sms, push ou whatsapp"
                }
            ]

            Erro: (Status 400):
                {
                    "status": "erro",
                    "descricao": "Erro no processamento. Verifique os parâmetros."
                }



    ** Remover um agendamento de mensagem:
        Método DELETE: <url>/agendamento/idAgendamento
        *idAgendamento que é retornado na inserção

        Retornos

        Sucesso (Status: 200):
            {
                "status": "sucesso",
                "idAgendamento": 4
            }

        idAgendamento não encontrado (Status: 200):
            {
                "status": "nenhum agendamento com o idAgendamento4 foi encontrado",
                "idAgendamento": 4
            }

        Erro (Status: 400):
            {
                "status": "erro",
                "descricao": "Erro no processamento. Verifique os parâmetros."
            }




    ** Consultar todos os agendamentos
        Método GET: <url>/consultaAgendamento/

        Retorno:
        [
            {
                "idAgendamento": 1,
                "dataHoraCadastro": "2020-11-12 10:36:33.00",
                "dataHoraEnvio": "2020-11-13 00:00:00.00",
                "destinatario": "André",
                "mensagem": "Teste de mensagem",
                "canalMensagem": "email",
                "situacao": "agendado"
            },
            {
                "idAgendamento": 2,
                "dataHoraCadastro": "2020-11-12 11:07:57.00",
                "dataHoraEnvio": "2020-11-12 11:00:00.00",
                "destinatario": "André",
                "mensagem": "Teste de mensagem",
                "canalMensagem": "sms",
                "situacao": "agendado"
            }
        ]



    ** Consultar um agendamento específico
        Método GET: <url>/consultaAgendamento/idAgendamento
        *idAgendamento que é retornado na inserção

        Retorno:
        Sucesso (Status 200):
            {
                "idAgendamento": 1,
                "dataHoraCadastro": "2020-11-12 10:36:33.00",
                "dataHoraEnvio": "2020-11-13 00:00:00.00",
                "destinatario": "André",
                "mensagem": "Teste de mensagem",
                "canalMensagem": "email",
                "situacao": "agendado"
            }

        idAgendamento não encontrado (Status 200):
            {
                "status": "nenhum registro encontrado"
            }
                

        Erro: (Status 400):
            {
                "status": "erro",
                "descricao": "Erro no processamento. Verifique os parâmetros."
            }