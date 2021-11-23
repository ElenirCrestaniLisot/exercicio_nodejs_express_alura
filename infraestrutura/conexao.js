
const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'root123',
    database: 'agendapetshop'
})

module.exports = conexao;
