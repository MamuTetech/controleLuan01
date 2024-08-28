let usuario = document.querySelector("#usuario_txt")
let senha = document.querySelector("#password")
let botaoConectar = document.querySelector("#botaoConectar")

const liberar = () =>{
const endpoint01 = `http://mamutetech.shop/usuariosenha/usuario`
 const promise1 = fetch(endpoint01)
.then(res => res.json())
.then(data=>Object.values(data))
   
    
const endPoint02 =  `http://mamutetech.shop/usuariosenha/senha`
const promise2 = fetch(endPoint02)
.then(res => res.json())
.then(data=> Object.values(data))
   
 return Promise.all([promise1, promise2])
}

//parte de remoção da tela
const loginpopup = document.querySelector(".loginpopup")
const janelaLoginpopup = document.querySelector(".janelaLoginpopup")
const caixalogin = document.querySelector(".caixalogin")
const editorInput = document.querySelector(".editorInput")
const botaoEscondet = document.getElementById("botaoConectar")
const labelLog = document.querySelector(".labelLog")
const inputElement = document.getElementById("password")


botaoConectar.addEventListener("click",(evt)=>{
  liberar().then(([promise1, promise2])=>{
    const usu = usuario.value
    const sen = senha.value
    console.log(usu)
    console.log(sen)
    console.log(promise1)
    console.log(promise2)

  const usuarioPess = promise1[0].usuario
    const senhaPess = promise2[0].senha
    if(usu === usuarioPess && sen === senhaPess){
     inputElement.remove()
     labelLog.remove()
     loginpopup.remove()
     janelaLoginpopup.remove()
     caixalogin.remove()
     editorInput.remove()
     botaoEscondet.remove()

    }
  })
})