// Obtendo o tenantId do localStorage
const tenantId = localStorage.getItem('tenantId');

if (!tenantId) {
    console.error('Tenant ID não encontrado no localStorage');
}
const userImagemUrl = localStorage.getItem('imagem_url')
const caixaCabesalho = document.querySelector("#caixaCabesalho")
const codigoProduto = document.querySelector("#numCodigo");
const cadastroMercadoria = document.querySelector("#txtMercadoria");
const precoMercadoria = document.querySelector("#numValor");
const botaoSelecionar = document.querySelector("#botaoEnviar");
const botaoFinalizar = document.querySelector("#botaoFinalizar");
const caixaMercadorias = document.querySelector("#caixaMercadorias");
const DivvalorTotal = document.querySelector("#DivvalorTotal");

// usuario - luanB
// senha - 5548

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

const limparDados = () => {
    codigoProduto.value = "";
    cadastroMercadoria.value = "";
    precoMercadoria.value = "";
    DivvalorTotal.innerHTML = "";
};

const contarProdutos = () => {
    const quantidadeDeProduto = document.querySelectorAll(".caPro");
    return quantidadeDeProduto.length;
};

const salvarDadosNoLocalStorage = () => {
    const produtos = [...document.querySelectorAll(".caPro")].map(produto => ({
        codigo: produto.querySelector("#cod").innerText,
        mercadoria: produto.querySelector("#merc").innerText,
        valor: produto.querySelector("#val").innerText
    }));
    localStorage.setItem('produtos', JSON.stringify(produtos));
};

const carregarDadosDoLocalStorage = () => {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    produtos.forEach(produto => adicionarProdutoNaTela(produto.codigo, produto.mercadoria, produto.valor));
    DivvalorTotal.innerHTML = contarProdutos();
};

const adicionarProdutoNaTela = (codigo, mercadoria, valor) => {
    const DivCaixa = document.createElement("div");
    DivCaixa.setAttribute("id", "ca");
    DivCaixa.setAttribute("class", "caPro");
    caixaMercadorias.appendChild(DivCaixa);

    const DivCodig = document.createElement('div');
    DivCodig.setAttribute("id", "cod");
    DivCodig.setAttribute("class", "divReceber");
    DivCodig.innerHTML = codigo;
    DivCaixa.appendChild(DivCodig);

    const DivMerc = document.createElement('div');
    DivMerc.setAttribute("id", "merc");
    DivMerc.setAttribute("class", "divReceber");
    DivMerc.innerHTML = mercadoria;
    DivCaixa.appendChild(DivMerc);

    const Divval = document.createElement('div');
    Divval.setAttribute("id", "val");
    Divval.setAttribute("class", "divReceber");
    Divval.innerHTML = valor;
    DivCaixa.appendChild(Divval);

    const imgDelete = document.createElement('img');
    imgDelete.setAttribute("src", "imagem/delete.svg");
    imgDelete.setAttribute("id", "icolixeira");
    imgDelete.setAttribute("class", "icolixeira");
    DivCaixa.appendChild(imgDelete);

    imgDelete.addEventListener("click", (evt) => {
        const totalCadastro = document.querySelector("#DivvalorTotal");
        const vendasLixeira = evt.target;
        vendasLixeira.parentNode.remove();
        const totalDeLinhas = contarProdutos();
        DivvalorTotal.innerHTML = totalDeLinhas;
        salvarDadosNoLocalStorage();
    });
   
};

const pesquisarProdutos = () => {
    const codigo = codigoProduto.value;
    const mercadoria = cadastroMercadoria.value;
    const valor = precoMercadoria.value;

    adicionarProdutoNaTela(codigo, mercadoria, valor);
    DivvalorTotal.innerHTML = contarProdutos();
    salvarDadosNoLocalStorage();
};

const enviarProdutosDB = () => {
    if (confirm("Deseja enviar Cadastro")) {
        const divsCaPro = [...document.querySelectorAll(".caPro")];
        divsCaPro.forEach(umum => {
            const codigo = umum.querySelector("#cod").innerHTML;
            const mercadoria = umum.querySelector("#merc").innerHTML;
            const valor = parseFloat(umum.querySelector("#val").innerHTML);

            console.log('Tenant ID recuperado:', tenantId);
            console.log(`tenantid-${tenantId} nome-${mercadoria} codigo-${codigo} preço-${valor}`);
            const dadosProdutos = {
                tenantId,  // Utilize o tenant_id do cliente
                mercadoria,
                codigo,
                valor
            };
            const cabecalhoProdutos = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Tenant-ID": tenantId
                },
                body: JSON.stringify(dadosProdutos)
            };
            const endpointProdutos = "http://mamutetech.shop/inserirProduto";
            fetch(endpointProdutos, cabecalhoProdutos)
                .then(res => res.json())
                .then(produtos => {
                    console.log(produtos)
                    limparDados();
                })
                .catch(error => {
                    console.error('Erro ao enviar dados', error);
                });
        });
        caixaMercadorias.innerHTML = "";
        localStorage.removeItem('produtos');
    } else {
        console.log("Cadastro não confirmado pelo usuário.");
    }
};

botaoEnviar.addEventListener("click", (evt) => {
    const codigo = codigoProduto.value;
    const mercadoria = cadastroMercadoria.value;
    const valor = precoMercadoria.value;
if(!codigo || !mercadoria || !valor){
    document.querySelector("#mess").innerText = "Preencha todos os Campos."
   

}else{
    pesquisarProdutos(); 
     document.querySelector("#mess").innerText = ""
}
   
});

botaoFinalizar.addEventListener("click", (evt) => {
    enviarProdutosDB();
});

document.addEventListener("DOMContentLoaded", carregarDadosDoLocalStorage);
