//---------(Provisorio) Dinâmica das duas telas dos Quizzes do Usuário-------- //
const quizzesVazio= document.querySelector(".quizzes-usuario-vazio");
const quizzesUsuario=document.querySelector(".quizzes-usuario");
function reconfigurarHomeUsuario(){
    
    quizzesVazio.classList.toggle("escondido");
    quizzesUsuario.classList.toggle("escondido");
}

//------------(Provisorio) Redirecionar para o quizz em questão --------------//
const body= document.querySelector("body");
function iniciarQuizz(){
    body.classList.add("escondido");
}