const express = require('express');
const router = express.Router();
const autenticarToken = require('../middleware/authMiddleware');
const { inserirVendaController } = require('../controllers/vendaController');

router.post('/', autenticarToken, inserirVendaController);

module.exports = router;