const mysql = require('mysql2/promise');

const conectar = async () => {
    if (global.conexao && global.conexao.state !== 'disconnected')
        return global.conexao;

    const con = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'u777266202_mamutecaixa.usuarios'
    });

    console.log('Conectou ao banco de dados');
    global.conexao = con;

    return con;
};

module.exports = conectar;