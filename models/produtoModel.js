const conectar = require('./database');

const inserirProduto = async (tenantId, produto) => {
    const conexao = await conectar();
    const sql = 'INSERT INTO produtos (tenant_id, mercadoria, codigo, valor) VALUES (?, ?, ?, ?)';
    const valores = [tenantId, produto.mercadoria, produto.codigo, produto.valor];
    await conexao.query(sql, valores);
    console.log('Produto inserido com sucesso');
};

const buscarProdutoPorCodigoOuNome = async (tenantId, codigo, mercadoria) => {
    const conexao = await conectar();
    const sql = 'SELECT * FROM produtos WHERE tenant_id = ? AND (codigo = ? OR mercadoria LIKE ?)';
    const [rows] = await conexao.query(sql, [tenantId, codigo, `%${mercadoria}%`]);
    return rows;
};

const excluirProduto = async (tenantId, produtoId) => {
    const conexao = await conectar();
    const sql = 'DELETE FROM produtos WHERE tenant_id = ? AND produto_id = ?';
    await conexao.query(sql, [tenantId, produtoId]);
    console.log('Produto excluído com sucesso');
};

module.exports = { inserirProduto, buscarProdutoPorCodigoOuNome, excluirProduto };