        const userImagemUrl = localStorage.getItem('imagem_url')
        const caixaCabesalho = document.querySelector("#organisaInput")
        const botaoLogin = document.querySelector("#botaoEnviar");
        const usernameId = document.querySelector("#txtUsuario")
        const passwordId = document.querySelector("#txtSenha")
        const botaoCadastro = document.querySelector("#botaoCadastro")
        const messageElement = document.querySelector("#message")

        window.addEventListener("load", () => {
            mostrarImagemPerfil(); // Função para mostrar a imagem de perfil
        });
        
        const mostrarImagemPerfil = () => {
        
            const userImagemUrl = localStorage.getItem('userImagemUrl'); // Correção na chave do localStorage
            if (userImagemUrl) {
                const userImg = document.createElement('img');
                userImg.src = `http://localhost:3001${userImagemUrl}`; // URL completa para buscar a imagem do backend
                userImg.style.width = '150px'; // Configurar o tamanho da imagem
                userImg.alt = 'Imagem de perfil';
                caixaCabesalho.appendChild(userImg);
                console.log(userImagemUrl);
            } else {
                console.log("URL da imagem não encontrada no localStorage");
            }
        }
        

        const LoginSenha = () =>{
            const username = usernameId.value.trim()
            const password = passwordId.value.trim()

            if(!username || !password){
                console.log("Campos obrigatórios não preenchidos"); // Log para verificar a condição
                messageElement.innerHTML= "Dados invalidos tente novamente"
                return
            }
          

        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario: username, senha: password })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.token) {
                const token = data.token;
                const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload do JWT
                localStorage.setItem('tenantId', payload.tenantId);
                localStorage.setItem('token', token);
                localStorage.setItem('userImagemUrl', data.imagem_url); 
                console.log('Imagem URL salva:', data.imagem_url)// Armazena a URL da imagem de perfil
                // Redirecionar ou realizar outras ações após o login bem-sucedido
                const tenantId = localStorage.getItem('tenantId');
                if (tenantId) {
                    console.log('Tenant ID capturado com sucesso:', tenantId);
                    // Redirecionar ou realizar outras ações após o login bem-sucedido
                    window.location.href = 'index.html';
                } else {
                    console.error('Erro: Tenant ID não capturado.');
                    document.querySelector("#message").innerText = "Erro: Tenant ID não capturado.";
                }
            } else {
                document.querySelector("#message").innerText = "Erro: Credenciais inválidas.";
            }
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
            document.querySelector("#message").innerText = "Erro ao fazer login.";
        });
        }
       

 botaoLogin.addEventListener("click", (evt) => {
     evt.preventDefault(); // Prevenir o comportamento padrão do botão
    LoginSenha()
       
    });
    botaoCadastro.addEventListener("click",(evt)=>{
        window.location.href = 'cadastroDeUsuarios.html'; 
    })   

