const userImagemUrl = localStorage.getItem('imagem_url')
const caixaCabesalho = document.querySelector("#caixaCabesalho")
const codigo = document.querySelector("#numCodigo")
const Mercadoria = document.querySelector("#txtMercadoria")
const botaoPesquisar = document.querySelector("#botaoPesquisar")
const caixaProdutos = document.querySelector("#caixaProdutos")
const quantidadePro = document.querySelector(".quantidadeProdutos")
const quantidadeProdutos = document.querySelector("#QuantidadeP")
const receberProdutos = document.querySelector("#receberProdutos")

window.addEventListener("load", () => {
  mostrarImagemPerfil(); // Função para mostrar a imagem de perfil
});

const mostrarImagemPerfil = () => {

  const userImagemUrl = localStorage.getItem('userImagemUrl'); // Correção na chave do localStorage
  if (userImagemUrl) {
      const userImg = document.createElement('img');
      userImg.src = `http://http://mamutetech.shop${userImagemUrl}`; // URL completa para buscar a imagem do backend
      userImg.style.width = '150px'; // Configurar o tamanho da imagem
      userImg.alt = 'Imagem de perfil';
      caixaCabesalho.appendChild(userImg);
      console.log(userImagemUrl);
  } else {
      console.log("URL da imagem não encontrada no localStorage");
  }
}

const buscarCodigosDB = () =>{
  caixaProdutos.innerHTML = ""
    const codigoBd = Number(codigo.value)
      if(codigoBd){
           const endpoint = `http://http://mamutetech.shop/buscarDB/codigo/${codigoBd}`
           const token = localStorage.getItem('token')
     fetch(endpoint, {
      headers: {
        'Authorization':`Bearer ${token}`
      }
     })  
    .then(res => res.json())
    .then(receber=>{ 
      console.log(receber)
       if(receber.length === 0){
        alert("dados não encontrado ou não cadastrado")
        return
       }
        const receberDB = Object.values(receber)
        console.log(receberDB.length)
        //mostrar na quantidadeproduto a quantidade de produtos
       
        quantidadeProdutos.innerHTML = receber.length
        if(receber.length <= 5){

          quantidadePro.classList.add("produstoRepor")
          quantidadePro.innerHTML = `Qantidade</br><strong>${receber.length}</strong>Fazer pedido`
         
        }else if(receber.length >= 6){
          quantidadeProdutos.innerHTML = ""
          quantidadePro.classList.remove("produstoRepor")
          quantidadePro.innerHTML = `Qantidade</br><strong>${receber.length}`
         
        }
       const receberBancoDados = receberDB.filter((umum)=>{
        //caixas de paragrafos
        
      
      
        //div codigo
        const DivOrganisa = document.createElement("div")
        DivOrganisa.setAttribute("id","DivOrganisa")
        DivOrganisa.setAttribute("class","DivOrganisa")
        caixaProdutos.appendChild(DivOrganisa)
        
        const DivCod = document.createElement("div")
        DivCod.setAttribute("id","dadosCod01")
        DivCod.setAttribute("class","dadosDB") 
        DivCod.innerHTML = `${umum.codigo}`
        DivOrganisa.appendChild(DivCod)
      

       //Div Mercadoria
       const DivMercadoria = document.createElement("div")
       DivMercadoria.setAttribute("id","dadosCod02")
       DivMercadoria.setAttribute("class","dadosDB") 
       DivMercadoria.innerHTML = `${umum.mercadoria}`
       DivOrganisa.appendChild(DivMercadoria)

       //Div preço
       const DivPreco = document.createElement("div")
       DivPreco.setAttribute("id","dadosCod03")
       DivPreco.setAttribute("class","dadosDB") 
       DivPreco.innerHTML = `${umum.valor}`
       DivOrganisa.appendChild(DivPreco)
      
       
       })
          
       
    })
    .finally(()=>{
      codigo.value = ""
    })
      }
    
}

    
      
const buscarMercadoriasBD =()=>{
    caixaProdutos.innerHTML = ""
    const mercadoriaBd = Mercadoria.value
       if(mercadoriaBd){
        const endpoint = `http://http://mamutetech.shop/buscarDB/mercadoria/${mercadoriaBd}`
        const token = localStorage.getItem('token')
        fetch(endpoint, {
          headers: {
            'Authorization':`Bearer ${token}`
          }
        })  
       .then(res => res.json())
       .then(receber=>{ 
        if(receber.length === 0){
          alert("dados não encontrado ou não cadastrado")
          return
         }
        const receberDB = Object.values(receber)
        const quantidadeIndice = receberDB.length
         //mostrar na quantidadeproduto a quantidade de produtos
         quantidadeProdutos.innerHTML = receber.length
         if(receber.length <= 5){
          quantidadePro.classList.add("produstoRepor")
          quantidadePro.innerHTML = `Qantidade</br><strong>${receber.length}</strong>Fazer pedido`
         }else if(receber.length >= 6){
          quantidadeProdutos.innerHTML = ""
          quantidadePro.classList.remove("produstoRepor")
          quantidadePro.innerHTML = `Qantidade</br><strong>${receber.length}`
         }
        
        const receberBancoDados02 = receberDB.filter((umum)=>{
        
          //div codigo
          const DivOrganisa = document.createElement("div")
          DivOrganisa.setAttribute("id","DivOrganisa")
          DivOrganisa.setAttribute("class","DivOrganisa")
           
          const DivCod = document.createElement("div")
          DivCod.setAttribute("id","dadosCod01")
          DivCod.setAttribute("class","dadosDB") 
          DivCod.innerHTML = `${umum.codigo}`
          DivOrganisa.appendChild(DivCod)
          caixaProdutos.appendChild(DivOrganisa)
  
         //Div Mercadoria
         const DivMercadoria = document.createElement("div")
         DivMercadoria.setAttribute("id","dadosCod02")
         DivMercadoria.setAttribute("class","dadosDB") 
         DivMercadoria.innerHTML = `${umum.mercadoria}`
         DivOrganisa.appendChild(DivMercadoria)
  
         //Div preço
         const DivPreco = document.createElement("div")
         DivPreco.setAttribute("id","dadosCod03")
         DivPreco.setAttribute("class","dadosDB") 
         DivPreco.innerHTML = `${umum.valor}`
         DivOrganisa.appendChild(DivPreco)
          })
        })
        .finally(()=>{
          Mercadoria.value = ""
        })
      }
}
  
      botaoPesquisar.addEventListener("click", (evt)=>{ 
        buscarCodigosDB()
        buscarMercadoriasBD()

      }) 

     


 