const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: 'localhost', 
    port: 3306,
    user: 'root',
    password: 'Tatu1793',
    database: 'db_mensagens_posvenda',
});

module.exports = conexao;