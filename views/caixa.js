const tenantId = localStorage.getItem('tenantId')
const userImagemUrl = localStorage.getItem('imagem_url')
const caixaCabesalho = document.querySelector("#caixaCabesalho")
const botaoSelecionar = document.querySelector("#botaoCaixa");
const valormercadoria = document.querySelector("#valormercadoria");
const inputCodigo = document.querySelector("#codInput");
const inputMercadoria = document.querySelector("#mercInput");
const nomeDoCliente = document.querySelector("#nomeInput");
const caixaSelecionado = document.querySelector("#MercadoriaEscolhida");
const botaoEnviar = document.querySelector("#botaoEnviar");
const receberMercadoriaCaixa = document.querySelector("#receberMercadoriaCaixa");
window.addEventListener("load", () => {
    carregarEstadoDivCaixa();
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
// usuario - vinicioB
// senha - 456789

let totalValor = 0

const salvarEstadoDivCaixa = () => {//função para salvar os dados no localstorage
    const divCaixaArray = Array.from(receberMercadoriaCaixa.children).map(div => ({
        id: div.id,
        innerHTML: div.innerHTML,
        produtoId: div.querySelector("#ind")?.innerHTML,
        nomeCliente: div.querySelector("#nom")?.innerHTML,
        codigo: div.querySelector("#cod")?.innerHTML,
        mercadoria: div.querySelector("#merc")?.innerHTML,
        valor: div.querySelector("#val p")?.innerHTML,
        quantidade: div.querySelector("#quant")?.innerHTML
    }));
    localStorage.setItem("divCaixa", JSON.stringify(divCaixaArray));
    localStorage.setItem("totalValor", totalValor.toFixed(2));
};

const carregarEstadoDivCaixa = () => {//carregar os dados do localstorage
    const estadoDivCaixa = JSON.parse(localStorage.getItem("divCaixa"));
    if (estadoDivCaixa) {
        receberMercadoriaCaixa.innerHTML = "";
        estadoDivCaixa.forEach(item => {
            const div = document.createElement("div");
            div.id = item.id;
            div.classList.add("caPro")
            div.innerHTML = item.innerHTML;
            div.querySelector("#ind").innerHTML = item.produtoId;
            div.querySelector("#nom").innerHTML = item.nomeCliente;
            div.querySelector("#cod").innerHTML = item.codigo;
            div.querySelector("#merc").innerHTML = item.mercadoria;
            div.querySelector("#val p").innerHTML = item.valor;
            div.querySelector("#quant").innerHTML = item.quantidade;

            const imgDelete = div.querySelector(".icolixeira");
            imgDelete.addEventListener("click", (evt) => {
                const parentDiv = evt.target.parentNode;
                const valorLixeira = Number(parentDiv.querySelector("#val p").innerText);

                totalValor -= valorLixeira;
                valormercadoria.innerHTML = totalValor.toFixed(2);

                parentDiv.remove();
                salvarEstadoDivCaixa();

                const dados = {
                    tenantId,
                    codigo: item.codigo,
                    mercadoria: item.mercadoria,
                    valor: item.valor
                };

                const cabecalho = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Tenant-ID": tenantId,
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(dados)
                };

                fetch("http://mamutetech.shop/inserirProduto", cabecalho)
                    .then(res => res.json())
                    .then(console.log);
            });

            receberMercadoriaCaixa.appendChild(div);
        });
        totalValor = parseFloat(localStorage.getItem("totalValor")) || 0;
        valormercadoria.innerHTML = totalValor.toFixed(2);
    }
};

window.addEventListener("load", carregarEstadoDivCaixa);

const buscarVendaPorCodigo = () => {
    const codigoVendas = Number(inputCodigo.value);
    const nomeCli02 = nomeDoCliente.value;
    const endpoint = `http://mamutetech.shop/buscarDB/codigo/${codigoVendas}`;
    const token = localStorage.getItem('token');

    fetch(endpoint, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(buscarProdutos => {
        const primeiraFila = buscarProdutos[0];

        const mensagem = document.querySelector("#mensagem")
       
       if(!buscarProdutos || buscarProdutos.length === 0){
             
             mensagem.innerText = "Sem mercadoria com esse codigo no estoque."
             mensagem.classList.add("mensagemEstilo")
             return
            }else{
             mensagem.innerHTML = ""
             mensagem.classList.remove("mensagemEstilo")
            }
           

        caixaSelecionado.innerHTML = `Codigo-<strong>${primeiraFila.codigo}</strong> Mercadoria-<strong> ${primeiraFila.mercadoria}</strong> Valor- R$<strong>${primeiraFila.valor}</strong>`;
        const DivCaixa = document.createElement("div");
        DivCaixa.setAttribute("id", "ca");
        DivCaixa.setAttribute("class", "caPro");
        receberMercadoriaCaixa.appendChild(DivCaixa);

        const DivInd = document.createElement('div');
        DivInd.setAttribute("id", "ind");
        DivInd.setAttribute("class", "divDiferente");
        DivInd.innerHTML = primeiraFila.produto_id;
        const produtoId = DivInd.innerHTML; 
        DivCaixa.appendChild(DivInd);

        fetch(`http://mamutetech.shop/mercadoriadeletarID/${produtoId}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            if (res.status === 200) {
                console.log("Registro excluido com sucesso");
            } else {
                console.error("Erro ao tentar excluir o registro", res.status);
            }
        });

        const DivNomeCliente = document.createElement('div');
        DivNomeCliente.setAttribute("id", "nom");
        DivNomeCliente.setAttribute("class", "divReceber");
        if(!nomeCli02){
          DivNomeCliente.innerHTML = "Sem Nome"
        }else{
          DivNomeCliente.innerHTML = nomeCli02; 
        }
        DivCaixa.appendChild(DivNomeCliente);

        const DivCodig = document.createElement('div');
        DivCodig.setAttribute("id", "cod");
        DivCodig.setAttribute("class", "divReceber");
        DivCodig.innerHTML = primeiraFila.codigo;
        DivCaixa.appendChild(DivCodig);
        console.log(primeiraFila.codigo)

        const DivMerc = document.createElement('div');
        DivMerc.setAttribute("id", "merc");
        DivMerc.setAttribute("class", "divReceber");
        DivMerc.innerHTML = primeiraFila.mercadoria;
        DivCaixa.appendChild(DivMerc);

        const Divval = document.createElement('div');
        Divval.setAttribute("id", "val");
        Divval.setAttribute("class", "divReceber");
        Divval.innerHTML = `<strong>R$</strong><p>${primeiraFila.valor}</p>`;
        DivCaixa.appendChild(Divval);

        const Divquantidade = document.createElement('div');
        Divquantidade.setAttribute("id", "quant");
        Divquantidade.setAttribute("class", "divReceber");
        Divquantidade.innerHTML = buscarProdutos.length;
        DivCaixa.appendChild(Divquantidade);

        const imgDelete = document.createElement('img');
        imgDelete.setAttribute("src", "imagem/delete.svg");
        imgDelete.setAttribute("id", "icolixeira");
        imgDelete.setAttribute("class", "icolixeira");
        DivCaixa.appendChild(imgDelete);

        imgDelete.addEventListener("click", (evt) => {
            const parentDiv = evt.target.parentNode;
            const valorLixeira = Number(parentDiv.querySelector("#val p").innerText);

            totalValor -= valorLixeira;
            valormercadoria.innerHTML = totalValor.toFixed(2);

            parentDiv.remove();
            salvarEstadoDivCaixa();

            const dados = {
                tenantId,
                codigo: primeiraFila.codigo,
                mercadoria: primeiraFila.mercadoria,
                valor: primeiraFila.valor
            };

            const cabecalho = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Tenant-ID": tenantId,
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(dados)
            };

            fetch("http://mamutetech.shop/inserirProduto", cabecalho)
                .then(res => res.json())
                .then(console.log);
        });

        totalValor += Number(primeiraFila.valor);
        valormercadoria.innerHTML = totalValor.toFixed(2);

        if (parseInt(Divquantidade.textContent) <= 5) {
            Divquantidade.classList.add("alertaquant");
        }
        salvarEstadoDivCaixa();
    });
};

const buscarVendaPorMercadoria = () => {
    const mercadoriaNome = inputMercadoria.value;
    const nomeCli02 = nomeDoCliente.value;
    const endpoint = `http://mamutetech.shop/buscarDB/mercadoria/${mercadoriaNome}`;
    const token = localStorage.getItem('token');

    fetch(endpoint, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
    .then(buscarProdutos => {
        const primeiraFila = buscarProdutos[0];

        if(!buscarProdutos || buscarProdutos.length === 0){
             
            mensagem.innerText = "Sem mercadoria com esse codigono no estoque."
            mensagem.classList.add("mensagemEstilo")
            return
           }else{
            mensagem.innerHTML = ""
            mensagem.classList.remove("mensagemEstilo")
           }

        caixaSelecionado.innerHTML = `Codigo-<strong>${primeiraFila.codigo}</strong> Mercadoria-<strong> ${primeiraFila.mercadoria}</strong> Valor- R$<strong>${primeiraFila.valor}</strong>`;
        const DivCaixa = document.createElement("div");
        DivCaixa.setAttribute("id", "ca");
        DivCaixa.setAttribute("class", "caPro");
        receberMercadoriaCaixa.appendChild(DivCaixa);

        const DivInd = document.createElement('div');
        DivInd.setAttribute("id", "ind");
        DivInd.setAttribute("class", "divDiferente");
        DivInd.innerHTML = primeiraFila.produto_id;
        const produtoId = DivInd.innerHTML; 
        console.log(produtoId);
        DivCaixa.appendChild(DivInd);

        fetch(`http://mamutetech.shop/mercadoriadeletarID/${produtoId}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            if (res.status === 200) {
                console.log("Registro excluido com sucesso");
            } else {
                console.error("Erro ao tentar excluir o registro", res.status);
            }
        });

        const DivNomeCliente = document.createElement('div');
        DivNomeCliente.setAttribute("id", "nom");
        DivNomeCliente.setAttribute("class", "divReceber");
        if(!nomeCli02){
            DivNomeCliente.innerHTML = "Sem Nome"
          }else{
            DivNomeCliente.innerHTML = nomeCli02; 
          }
        DivCaixa.appendChild(DivNomeCliente);

        const DivCodig = document.createElement('div');
        DivCodig.setAttribute("id", "cod");
        DivCodig.setAttribute("class", "divReceber");
        DivCodig.innerHTML = primeiraFila.codigo;
        DivCaixa.appendChild(DivCodig);

        const DivMerc = document.createElement('div');
        DivMerc.setAttribute("id", "merc");
        DivMerc.setAttribute("class", "divReceber");
        DivMerc.innerHTML = primeiraFila.mercadoria;
        DivCaixa.appendChild(DivMerc);

        const Divval = document.createElement('div');
        Divval.setAttribute("id", "val");
        Divval.setAttribute("class", "divReceber");
        Divval.innerHTML = `<strong>R$</strong><p>${primeiraFila.valor}</p>`;
        DivCaixa.appendChild(Divval);

        const Divquantidade = document.createElement('div');
        Divquantidade.setAttribute("id", "quant");
        Divquantidade.setAttribute("class", "divReceber");
        Divquantidade.innerHTML = buscarProdutos.length;
        DivCaixa.appendChild(Divquantidade);

        const imgDelete = document.createElement('img');
        imgDelete.setAttribute("src", "imagem/delete.svg");
        imgDelete.setAttribute("id", "icolixeira");
        imgDelete.setAttribute("class", "icolixeira");
        DivCaixa.appendChild(imgDelete);

        imgDelete.addEventListener("click", (evt) => {
            const parentDiv = evt.target.parentNode;
            const valorLixeira = Number(parentDiv.querySelector("#val p").innerText);

            totalValor -= valorLixeira;
            valormercadoria.innerHTML = totalValor.toFixed(2);

            parentDiv.remove();
            salvarEstadoDivCaixa();

            const dados = {
                tenantId,
                codigo: primeiraFila.codigo,
                mercadoria: primeiraFila.mercadoria,
                valor: primeiraFila.valor
            };

            const cabecalho = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Tenant-ID": tenantId,
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(dados)
            };

            fetch("http://mamutetech.shop/inserirProduto", cabecalho)
                .then(res => res.json())
                .then(console.log);
        });

        totalValor += Number(primeiraFila.valor);
        valormercadoria.innerHTML = totalValor.toFixed(2);

        if (parseInt(Divquantidade.textContent) <= 5) {
            Divquantidade.classList.add("alertaquant");
        }
        salvarEstadoDivCaixa();
    });
};
const calcularResultado = () =>{
  const valorRecebido = Number(ValorPago.value)
  const caixaValor = valormercadoria.textContent
  const ValorRecebidoValorMerca = valorRecebido - caixaValor
  valorCliente.innerHTML = `R$${ValorRecebidoValorMerca.toFixed(2)}`
 
}

const finalizarVendas = async () => {
    if (confirm("Deseja finalizar a Venda?")) {
        const estadoDivCaixa = JSON.parse(localStorage.getItem("divCaixa"))
        const caixas = [...document.querySelectorAll(".caPro")];
        const token = localStorage.getItem("token");
       if(estadoDivCaixa && estadoDivCaixa.length > 0)
            promises = caixas.map(async(umum) => {
            const nome = umum.querySelector("#nom").innerHTML
            const codigo = umum.querySelector("#cod").innerHTML
            const mercadoria = umum.querySelector("#merc").innerHTML
            const valor = umum.querySelector("#val p").innerHTML
            const ind = umum.querySelector("#ind").innerHTML
           console.log("aqui vem o ind animal" + ind)
            const dados = {
                nome_cliente: nome,
                nome_produto: mercadoria,
                codigo_produto: codigo,
                produto_id: ind,
                total: valor
            };

            const cabecalho = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Tenant-ID": tenantId,
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(dados)
            };

            try {
                const res = await fetch("http://mamutetech.shop/inserirDadosVendidos", cabecalho);
                const response = await res.json();
                console.log('Dados enviados para o banco:', response);
                umum.remove(); // Remover o elemento da DOM após o envio bem-sucedido
            } catch (error) {
                console.error('Erro ao enviar dados para o banco:', error);
            }
        });
        
        await Promise.all(promises); // Aguarde todas as promessas serem resolvidas

        localStorage.removeItem("divCaixa");
        localStorage.removeItem("totalValor");
        receberMercadoriaCaixa.innerHTML = "";
        totalValor = 0;
        valormercadoria.innerHTML = totalValor.toFixed(2);
    }
  
};

botaoSelecionar.addEventListener("click", () => {
    if (inputCodigo.value) {
        buscarVendaPorCodigo();
    } else if (inputMercadoria.value) {
        buscarVendaPorMercadoria();
    } else {
        alert("Por favor, insira um código ou uma mercadoria para buscar.");
    }
});

botaoCalcular.addEventListener("click",(evt)=>{
  calcularResultado()
  verImagem()
})

botaoEnviar.addEventListener("click",()=>{
    finalizarVendas()
   
});