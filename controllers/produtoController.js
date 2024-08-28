const { inserirProduto, buscarProdutoPorCodigoOuNome, excluirProduto } = require('../models/produtoModel');

const inserirProdutoController = async (req, res) => {
    try {
        const tenantId = req.header('Tenant-ID');
        const { mercadoria, codigo, valor } = req.body;
        await inserirProduto(tenantId, { mercadoria, codigo, valor });
        res.status(200).json({ message: 'Produto inserido com sucesso no banco de dados' });
    } catch (error) {
        console.log('Erro ao inserir produto no banco de dados', error);
        res.status(500).json({ error: 'Erro ao inserir produto no banco de dados' });
    }
};

const buscarProdutoController = async (req, res) => {
    try {
        const tenantId = req.user.tenantId;
        const { codigo, mercadoria } = req.params;
        const produtos = await buscarProdutoPorCodigoOuNome(tenantId, codigo, mercadoria);
        res.status(200).json(produtos);
    } catch (error) {
        console.log('Erro ao buscar produtos no banco de dados', error);
        res.status(500).json({ error: 'Erro ao buscar produtos no banco de dados' });
    }
};

const excluirProdutoController = async (req, res) => {
    try {
        const tenantId = req.user.tenantId;
        const produtoId = req.params.produto_id;
        await excluirProduto(tenantId, produtoId);
        res.status(200).json({ message: 'Produto excluído com sucesso' });
    } catch (error) {
        console.log('Erro ao excluir produto no banco de dados', error);
        res.status(500).json({ error: 'Erro ao excluir produto no banco de dados' });
    }
};

module.exports = { inserirProdutoController, buscarProdutoController, excluirProdutoController };