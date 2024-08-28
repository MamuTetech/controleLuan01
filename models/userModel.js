const conectar = require('./database');
const bcrypt = require('bcrypt');

const inserirUsuario = async (tenantId, usuario) => {
    try {
        const conexao = await conectar();
        const hashedSenha = await bcrypt.hash(usuario.senha, 10);
        const { nome, email, usuario: userName, imagem_url } = usuario;
        const sql = 'INSERT INTO usuarios (tenant_id, nome, email, usuario, senha_hash, imagem_url) VALUES (?, ?, ?, ?, ?, ?)';
        const valores = [tenantId, nome, email, userName, hashedSenha, imagem_url];
        await conexao.query(sql, valores);
        console.log('Usuário cadastrado com sucesso');
    } catch (error) {
        console.log('Erro ao cadastrar usuário', error);
        throw error;
    }
}

const buscarUsuarioPorNome = async (usuario) => {
    const conexao = await conectar();
    const [rows] = await conexao.execute('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    return rows.length ? rows[0] : null;
};

module.exports = { inserirUsuario, buscarUsuarioPorNome };