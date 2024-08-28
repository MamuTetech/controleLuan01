const txtEmpresa = document.querySelector("#txtEmpresa");  // Novo campo
const txtnome = document.querySelector("#txtnome")
const txtEmail = document.querySelector("#txtEmail")
const txtUsuario = document.querySelector("#txtUsuario")
const pasSenha = document.querySelector("#pasSenha")
const botaoEnviar = document.querySelector("#botaoEnviar")
const botaoAbrirLogin = document.querySelector("#botaoAbrirLogin")
const imagemPerfil = document.querySelector("#imagemPerfil")
const imagemPreview = document.querySelector("#imagemPreview")

const enviarDados = async (event) => {
    event.preventDefault();  // Prevenir recarregamento da página
    const empresaNome = txtEmpresa.value.trim();  // Novo campo
    const nome = txtnome.value.trim()
    const email = txtEmail.value.trim()
    const usuario = txtUsuario.value.trim()
    const senha = pasSenha.value.trim()
    const imagem = imagemPerfil.files[0]

    if(!empresaNome || !nome || !email || !usuario || !senha ||!imagem){
       document.getElementById('message').innerText = 'Por favor, preencha todos os campos.'
       return
    }

    const formData = new FormData()
    formData.append('empresaNome', empresaNome)
    formData.append('nome', nome)
    formData.append('email', email)
    formData.append('usuario', usuario)
    formData.append('senha', senha)
    formData.append('imagem', imagem)
    try {
        const response = await fetch('http://localhost:3001/usuarios', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,  // Adicione o token aqui, se necessário
            },
            body: formData
            })
        const data = await response.json()
        if (response.ok) {
            document.getElementById('message').innerText = `Usuário cadastrado com sucesso.`
        } else {
            document.getElementById('message').innerText = `Erro: ${data.error}`
        }
    } catch (error) {
        console.error('Erro ao enviar dados', error)
        document.getElementById('message').innerText = 'Erro ao enviar dados'
    }
}
const mostrarImagemPreview = (event) => {
    const file = event.target.files[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            imagemPreview.src = e.target.result
            imagemPreview.style.display = 'block'
        }
        reader.readAsDataURL(file)
    }
}

imagemPerfil.addEventListener("change", mostrarImagemPreview)

botaoAbrirLogin.addEventListener("click",(evt)=>{
    window.location.href = 'usuarioSenha.html' // Redirecionar para usuarioSenha.html
    
})

botaoEnviar.addEventListener("click", enviarDados)
  
