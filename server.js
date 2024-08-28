const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const authRoutes = require('./routes/authRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const vendaRoutes = require('./routes/vendaRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Criar pasta uploads para salvar imagem se não existir
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/auth', authRoutes);
app.use('/produtos', produtoRoutes);
app.use('/vendas', vendaRoutes);

const porta = process.env.PORT || 3001;
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`);
});