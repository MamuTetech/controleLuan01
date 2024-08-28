const userImagemUrl = localStorage.getItem('imagem_url')
const caixaCabesalho = document.querySelector("#caixaCabesalho")
const botaoAtualiza = document.querySelector("#botaoAtualiza");
const caixaValorDiarios = document.querySelector("#caixaValorDiarios");
const caixaValorMes = document.querySelector("#caixaValorMes");
const caixaTotalDia = document.querySelector("#caixaTotalDia");
const caixatotalMensal = document.querySelector("#caixaTotalMensal");
const caixaVendasMensal = document.querySelector("#caixaValorMes");

window.addEventListener("load", () => {
  mostrarImagemPerfil(); // Função para mostrar a imagem de perfil
});

const mostrarImagemPerfil = () => {

  const userImagemUrl = localStorage.getItem('userImagemUrl'); // Correção na chave do localStorage
  if (userImagemUrl) {
      const userImg = document.createElement('img');
      userImg.src = `http://mamutetech.shop${userImagemUrl}`; // URL completa para buscar a imagem do backend
      userImg.style.width = '150px'; // Configurar o tamanho da imagem
      userImg.alt = 'Imagem de perfil';
      caixaCabesalho.appendChild(userImg);
      console.log(userImagemUrl);
  } else {
      console.log("URL da imagem não encontrada no localStorage");
  }
}

// Obtendo o tenantId do localStorage
const tenantid = localStorage.getItem("tenantid");

if (!tenantid) {
  console.error('tenant ID não encontrado');
}

const getStorageKey = (key) => `${tenantid}-${key}`;

// Função para exibir dados de vendas diárias salvas
const exibirVendasDiarias = (vendasDiarias) => {
  caixaValorDiarios.innerHTML = "";
  let TotalValor = 0;

  vendasDiarias.forEach(umPum => {
    const DivCaixa = document.createElement("div");
    DivCaixa.setAttribute("id", "ca");
    DivCaixa.setAttribute("class", "caPro");
    caixaValorDiarios.appendChild(DivCaixa);

    const DivCodig = document.createElement('div');
    DivCodig.setAttribute("id", "cod");
    DivCodig.setAttribute("class", "divRec");
    DivCodig.innerHTML = umPum.codigo_produto;
    DivCaixa.appendChild(DivCodig);

    const DivNomeCliente = document.createElement('div');
    DivNomeCliente.setAttribute("id", "nom");
    DivNomeCliente.setAttribute("class", "divRec");
    DivNomeCliente.innerHTML = umPum.nome_produto;
    DivCaixa.appendChild(DivNomeCliente);

    const DivMerc = document.createElement('div');
    DivMerc.setAttribute("id", "merc");
    DivMerc.setAttribute("class", "divRec");
    DivMerc.innerHTML = umPum.nome_produto;
    DivCaixa.appendChild(DivMerc);

    const Divval = document.createElement('div');
    Divval.setAttribute("id", "val");
    Divval.setAttribute("class", "divRec");
    Divval.innerHTML = `<strong>R$</strong><p>${umPum.total}</p>`;
    DivCaixa.appendChild(Divval);

    const DivData = document.createElement('div');
    DivData.setAttribute("id", "dat");
    DivData.setAttribute("class", "divRec");
    DivData.innerHTML = new Date(umPum.data_venda).toLocaleDateString('pt-BR');
    DivCaixa.appendChild(DivData);

    TotalValor += parseFloat(umPum.total);
  });

  caixaTotalDia.innerHTML = `R$${TotalValor.toFixed(2)}`;
}

// Função para exibir dados de vendas mensais salvas
const exibirVendasMensais = (vendasMensais) => {
  caixaVendasMensal.innerHTML = "";
  let TotalValor = 0;

  vendasMensais.forEach(umPum => {
    const DivCaixa = document.createElement("div");
    DivCaixa.setAttribute("id", "ca");
    DivCaixa.setAttribute("class", "caPro");
    caixaVendasMensal.appendChild(DivCaixa);

    const DivCodig = document.createElement('div');
    DivCodig.setAttribute("id", "cod");
    DivCodig.setAttribute("class", "divRec");
    DivCodig.innerHTML = umPum.codigo_produto;
    DivCaixa.appendChild(DivCodig);

    const DivNomeCliente = document.createElement('div');
    DivNomeCliente.setAttribute("id", "nom");
    DivNomeCliente.setAttribute("class", "divRec");
    DivNomeCliente.innerHTML = umPum.nome_cliente;
    DivCaixa.appendChild(DivNomeCliente);

    const DivMerc = document.createElement('div');
    DivMerc.setAttribute("id", "merc");
    DivMerc.setAttribute("class", "divRec");
    DivMerc.innerHTML = umPum.nome_produto;
    DivCaixa.appendChild(DivMerc);

    const Divval = document.createElement('div');
    Divval.setAttribute("id", "val");
    Divval.setAttribute("class", "divRec");
    Divval.innerHTML = `<strong>R$</strong><p>${umPum.total}</p>`;
    DivCaixa.appendChild(Divval);

    const DivData = document.createElement('div');
    DivData.setAttribute("id", "dat");
    DivData.setAttribute("class", "divRec");
    DivData.innerHTML = new Date(umPum.data_venda).toLocaleDateString('pt-BR');
    DivCaixa.appendChild(DivData);

    TotalValor += parseFloat(umPum.total);
  });

  caixatotalMensal.innerHTML = `R$${TotalValor.toFixed(2)}`;
}

// Função para pegar e salvar as vendas diárias
const pegarVendasDiarias = () => {
  const endPoint = "http://mamutetech.shop/ProdutosMaisVendidos";
  const token = localStorage.getItem('token');
  fetch(endPoint, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(buscar => {
    const buscarDB = Object.values(buscar);
    const hoje = new Date().toLocaleDateString('pt-BR');
    const vendasDiarias = buscarDB.filter(umPum => {
      const dataFormatada = new Date(umPum.data_venda).toLocaleDateString('pt-BR');
      return dataFormatada === hoje;
    });

    // Salva no localStorage com chave específica para o tenantId
    localStorage.setItem(getStorageKey('vendasDiarias'), JSON.stringify(vendasDiarias));

    exibirVendasDiarias(vendasDiarias);
  });
}

// Função para pegar e salvar as vendas do mês
const vendasdoMes = () => {
  const endPoint = "http://mamutetech.shop/ProdutosMaisVendidos";
  const token = localStorage.getItem('token');
  fetch(endPoint, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(buscar => {
    const buscarDB = Object.values(buscar);
    const hoje = new Date();
    const mesAtual = hoje.getMonth();
    const anoAtual = hoje.getFullYear();
    const vendasMensais = buscarDB.filter(umPum => {
      const dataVenda = new Date(umPum.data_venda);
      const mesVenda = dataVenda.getMonth();
      const anoVenda = dataVenda.getFullYear();
      return mesVenda === mesAtual && anoVenda === anoAtual;
    });

    // Salva no localStorage com chave específica para o tenantId
    localStorage.setItem(getStorageKey('vendasMensais'), JSON.stringify(vendasMensais));

    exibirVendasMensais(vendasMensais);
  });
}

// Carrega dados salvos ao iniciar a página
document.addEventListener("DOMContentLoaded", () => {
  const vendasDiariasSalvas = localStorage.getItem(getStorageKey('vendasDiarias'));
  if (vendasDiariasSalvas) {
    exibirVendasDiarias(JSON.parse(vendasDiariasSalvas));
  }

  const vendasMensaisSalvas = localStorage.getItem(getStorageKey('vendasMensais'));
  if (vendasMensaisSalvas) {
    exibirVendasMensais(JSON.parse(vendasMensaisSalvas));
  }
});

botaoAtualiza.addEventListener("click", (evt) => {
  pegarVendasDiarias();
  vendasdoMes();
});