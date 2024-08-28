const { inserirDadosVenda } = require('../models/vendaModel');

const inserirVendaController = async (req, res) => {
    try {
        const tenantId = req.user.tenantId;
        const { produto_id, nome_produto, nome_cliente, codigo_produto, total } = req.body;
        await inserirDadosVenda(tenantId, { produto_id, nome_produto, nome_cliente, codigo_produto, total });
        res.status(200).json({ message: 'Dados de venda inseridos com sucesso' });
    } catch (error) {
        console.log('Erro ao inserir dados de venda no banco de dados', error);
        res.status(500).json({ error: 'Erro ao inserir dados de venda no banco de dados' });
    }
};

module.exports = { inserirVendaController };