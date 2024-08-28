const botaohome = document.querySelector("#botaohome")
const botaoCaixa = document.querySelector("#botaoCaixa")
const botaoCadastroP = document.querySelector("#botaoCadastroP")
const botaoPesquisaP = document.querySelector("#botaoPesquisaP")
const botaoMvendido = document.querySelector("#botaoMvendido")
const botaoTotalVendas = document.querySelector("#botaoCalculoVendas")
const cabecalho = document.querySelector("#cabecalho")
const principal = document.querySelector("#principal")


// nome do banco de dados-------caixaestoqueluan--------------

botaohome.addEventListener("click",(evt)=>{
  selecionaraba(evt.target)
  window.open("./home.html","if_principal")
})
botaoCaixa.addEventListener("click",(evt)=>{
  selecionaraba(evt.target)
  window.open("./Caixa.html","if_principal") 
})
botaoCadastroP.addEventListener("click",(evt)=>{
  selecionaraba(evt.target)
  window.open("./cadastroProdutos.html","if_principal") 
})
botaoPesquisaP.addEventListener("click",(evt)=>{
  selecionaraba(evt.target)
  window.open("./PesquisaProduto.html","if_principal")  
})
botaoMvendido.addEventListener("click",(evt)=>{
  selecionaraba(evt.target)
  window.open("./MaisVendidos.html","if_principal")  
})
botaoTotalVendas.addEventListener("click",(evt)=>{
  selecionaraba(evt.target)
  window.open("./totalVendas.html","if_principal")
})

const selecionaraba = (el) =>{

  const todasAbas = [...document.querySelectorAll(".botaoTodos")]
  todasAbas.forEach(umPum=>{
    umPum.classList.remove("botaoSelecionado")
  })
  el.classList.add("botaoSelecionado")
  
}
document.addEventListener('DOMContentLoaded', async () => {
  const token = localStorage.getItem('token');
  if (!token) {
      window.location.href = 'usuarioSenha.html';
      return;
  }

  try {
      const response = await fetch('http://localhost:3000/user-data', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          }
      });

      if (response.ok) {
          const userData = await response.json();
          document.getElementById('user-data').textContent = `Bem-vindo, ${userData.nome}`;
      } else {
          console.error('Erro ao buscar dados do usuário:', response.statusText);
          window.location.href = 'login.html';
      }
  } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
      window.location.href = 'usuarioSenha.html';
  }
});