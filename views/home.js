const userImagemUrl = localStorage.getItem('imagem_url')
const caixaCabesalho = document.querySelector("#caixaHomeImagem")
const caixaImagem = document.querySelector("#caixaImagens");
const caichaRecepcaoDaHora = document.querySelector("#caichaRecepcaoDaHora");
const divHora = document.querySelector("#divHora");
const divImagem = document.querySelector("#divImagem");
const botaoTeste = document.querySelector("#botaoTeste");

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

const fotoDia = () => {
    const img = document.createElement("img");
    img.setAttribute("src", "imagem/imagemBomDia.png");
    img.setAttribute("alt", "Imagem do Bom Dia");
    img.setAttribute("class", "divImagem");
    divImagem.appendChild(img);
};

const fotoTarde = () => {
    const img = document.createElement("img");
    img.setAttribute("src", "imagem/imagemDaTarde.png");
    img.setAttribute("alt", "Imagem da Tarde");
    img.setAttribute("class", "divImagem");
    divImagem.appendChild(img);
};

const fotoNoite = () => {
    const img = document.createElement("img");
    img.setAttribute("src", "imagem/imagemDaNoite.jpg");
    img.setAttribute("alt", "Imagem da Noite");
    img.setAttribute("class", "divImagem");
    divImagem.appendChild(img);
};

let periodoAtual = "";

const atualizarHoraEImagem = () => {
    const dataHoje = new Date();
    let horas = dataHoje.getHours();
    let minutos = dataHoje.getMinutes();
    let segundos = dataHoje.getSeconds();

    horas = horas < 10 ? "0" + horas : horas;
    minutos = minutos < 10 ? "0" + minutos : minutos;
    segundos = segundos < 10 ? "0" + segundos : segundos;
    const HoraAtual = `${horas}:${minutos}:${segundos}`;
    divHora.innerHTML = HoraAtual;

    let novoPeriodo;
    if (horas < 12) {
        novoPeriodo = "manha";
        caichaRecepcaoDaHora.innerHTML = "Bom Dia";
    } else if (horas < 18) {
        novoPeriodo = "tarde";
        caichaRecepcaoDaHora.innerHTML = "Boa Tarde";
    } else {
        novoPeriodo = "noite";
        caichaRecepcaoDaHora.innerHTML = "Boa Noite";
    }

    if (novoPeriodo !== periodoAtual) {
        divImagem.innerHTML = ""; // Limpa a divImagem antes de adicionar uma nova imagem
        if (novoPeriodo === "manha") {
            fotoDia();
        } else if (novoPeriodo === "tarde") {
            fotoTarde();
        } else {
            fotoNoite();
        }
        periodoAtual = novoPeriodo;
    }
};

botaoTeste.addEventListener("click", () => {
    fotoDia();
});

atualizarHoraEImagem(); // Atualizar a hora e a imagem imediatamente ao carregar a página
setInterval(atualizarHoraEImagem, 1000); // Atualizar a cada segundo para a hora e imagem



