const conectar = require('./database');

const inserirDadosVenda = async (tenantId, venda) => {
    const conexao = await conectar();
    const sql = 'INSERT INTO vendas (tenant_id, produto_id, nome_produto, nome_cliente, codigo_produto, total) VALUES (?, ?, ?, ?, ?, ?)';
    const valores = [tenantId, venda.produto_id, venda.nome_produto, venda.nome_cliente, venda.codigo_produto, venda.total];
    await conexao.query(sql, valores);
    console.log('Dados de venda inseridos com sucesso');
};

module.exports = { inserirDadosVenda };