const express = require('express');
const router = express.Router();
const autenticarToken = require('../middleware/authMiddleware');
const { inserirProdutoController, buscarProdutoController, excluirProdutoController } = require('../controllers/produtoController');

router.post('/', autenticarToken, inserirProdutoController);
router.get('/:codigo?/:mercadoria?', autenticarToken, buscarProdutoController);
router.delete('/:produto_id', autenticarToken, excluirProdutoController);

module.exports = router;