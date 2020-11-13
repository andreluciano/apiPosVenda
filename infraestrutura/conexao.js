const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: 'host',
    port: 3306,
    user: 'user',
    password: 'passwd',
    database: 'db_mensagens_posvenda',
});

module.exports = conexao;