const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { cadastrarUsuario, autenticarUsuario } = require('../controllers/authController');

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post('/register', upload.single('imagem_url'), cadastrarUsuario);
router.post('/login', autenticarUsuario);

module.exports = router;