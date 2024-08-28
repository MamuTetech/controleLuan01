const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { inserirUsuario, buscarUsuarioPorNome } = require('../models/userModel');
const segredoJWT = 'chave_secreta_jwt';

const gerarTenantId = (empresaNome) => {
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `${empresaNome}-${randomPart}`;
};

const cadastrarUsuario = async (req, res) => {
    try {
        const { empresaNome, nome, email, usuario, senha } = req.body;
        const imagem_url = req.file ? `/uploads/${req.file.filename}` : null;
        const tenantId = gerarTenantId(empresaNome);
        await inserirUsuario(tenantId, { nome, email, usuario, senha, imagem_url });
        res.status(200).json({ message: 'Usuário cadastrado com sucesso', tenantId });
    } catch (error) {
        console.log('Erro ao cadastrar usuário', error);
        res.status(500).json({ error: 'Erro ao cadastrar usuário' });
    }
};

const autenticarUsuario = async (req, res) => {
    try {
        const { usuario, senha } = req.body;
        const usuarioBD = await buscarUsuarioPorNome(usuario);

        if (!usuarioBD) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuarioBD.senha_hash);
        if (!senhaCorreta) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        const token = jwt.sign(
            { usuarioId: usuarioBD.user_id, tenantId: usuarioBD.tenant_id },
            segredoJWT,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, imagem_url: usuarioBD.imagem_url });
    } catch (error) {
        console.log('Erro na autenticação:', error.message);
        res.status(500).json({ error: 'Erro na autenticação' });
    }
};

module.exports = { cadastrarUsuario, autenticarUsuario };