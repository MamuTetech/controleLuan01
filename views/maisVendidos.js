const tenantId = localStorage.getItem('tenantId');
const token = localStorage.getItem('token');
if (!tenantId) {
    console.error('Tenant ID não encontrado no localStorage');
}
const userImagemUrl = localStorage.getItem('imagem_url')
const caixaCabesalho = document.querySelector("#caixaCabesalho")
const botaoMaisVendidos = document.querySelector("#botaoMaisVendidos");
const caixaMaisVendidos = document.querySelector("#caixaMaisVendidos");

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

const getStorageKey = (key) => `${tenantId}-${key}`;

const salvarDadosNoLocalStorage = (dados) => {
    localStorage.setItem(getStorageKey('produtosMaisVendidos'), JSON.stringify(dados));
}

const carregarDadosDoLocalStorage = () => {
    const dadosSalvos = localStorage.getItem(getStorageKey('produtosMaisVendidos'));
    return dadosSalvos ? JSON.parse(dadosSalvos) : [];
}

const exibirDadosNaTela = (dados) => {
    caixaMaisVendidos.innerHTML = '';
    const quantidadePorCombinacao = {};
    dados.forEach(item => {
        const key = `${item.codigo_produto}-${item.nome_produto}-${item.total}`;
        if (quantidadePorCombinacao[key]) {
            quantidadePorCombinacao[key]++;
        } else {
            quantidadePorCombinacao[key] = 1;
        }
    });
    const dadosComQuantidade = dados.map(item => {
        const key = `${item.codigo_produto}-${item.nome_produto}-${item.total}`;
        return { ...item, quantidade: quantidadePorCombinacao[key] };
    });
    dadosComQuantidade.sort((a, b) => b.quantidade - a.quantidade);

    const SomentePrimeiroDado = new Set();

    dadosComQuantidade.map((umum) => {
        const itemKey = `${umum.codigo_produto}-${umum.nome_produto}-${umum.total}`;
        if (!SomentePrimeiroDado.has(itemKey)) {
            SomentePrimeiroDado.add(itemKey);
            const quantidade = quantidadePorCombinacao[itemKey];
            
            const DivCaixa = document.createElement("div");
            DivCaixa.setAttribute("id", "ca");
            DivCaixa.setAttribute("class", "caPro");
            caixaMaisVendidos.appendChild(DivCaixa);

            const DivQuantidade = document.createElement('div');
            DivQuantidade.setAttribute("class", "divReceber");
            DivQuantidade.innerHTML = `Quantidade: ${quantidade}`;
            DivCaixa.appendChild(DivQuantidade);

            const DivCodig = document.createElement('div');
            DivCodig.setAttribute("id", "cod");
            DivCodig.setAttribute("class", "divReceber");
            DivCodig.innerHTML = umum.codigo_produto;
            DivCaixa.appendChild(DivCodig);

            const DivMerc = document.createElement('div');
            DivMerc.setAttribute("id", "merc");
            DivMerc.setAttribute("class", "divReceber");
            DivMerc.innerHTML = umum.nome_produto;
            DivCaixa.appendChild(DivMerc);

            const Divval = document.createElement('div');
            Divval.setAttribute("id", "val");
            Divval.setAttribute("class", "divReceber");
            Divval.innerHTML = `<strong>R$</strong><p>${umum.total}</p>`;
            DivCaixa.appendChild(Divval);
        }
    });
}

const ProdutosMaisMendidos = () => {
    const endPoint = "http://mamutetech.shop/ProdutosMaisVendidos";
    const token = localStorage.getItem('token');
    fetch(endPoint, {
        method: 'GET',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(receber => {
        const receberDoDB = Object.values(receber);
        salvarDadosNoLocalStorage(receberDoDB);
        exibirDadosNaTela(receberDoDB);
    });
}

botaoMaisVendidos.addEventListener("click", (evt) => {
    ProdutosMaisMendidos();
});

// Carregar dados do localStorage ao carregar a página
window.addEventListener('load', () => {
    const dadosSalvos = carregarDadosDoLocalStorage();
    if (dadosSalvos.length > 0) {
        exibirDadosNaTela(dadosSalvos);
    }
});