//Validação da tela 3.1 ao apertar no botão de seguir

function validarInformacoes(){

    let tituloQuizz = (document.querySelector(".titulo-quizz")).value
    let urlQuizz = (document.querySelector(".url-quizz")).value
    let qntPerguntas = (document.querySelector(".qntd-perguntas")).value
    let qntNiveis = (document.querySelector(".qntd-niveis")).value

    let urlPadrao = new RegExp("^((http(s?):\/\/(www.)?[a-z]+.com\/)|(magnet:\?xt=urn:btih:))")
    
    if (tituloQuizz.length < 20 || tituloQuizz.length > 65){
        return alert("Preencha os dados corretamente")
    } else if(urlPadrao.test(urlQuizz) === false){
        return alert("Preencha os dados corretamente")
    } else if (qntPerguntas < 3){
        return alert("Preencha os dados corretamente")
    } else if (qntNiveis < 2) {
        return alert("Preencha os dados corretamente")
    }
}
