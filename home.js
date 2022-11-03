//---------(Provisorio) Dinâmica das duas telas dos Quizzes do Usuário-------- //
const quizzesVazio= document.querySelector(".quizzes-usuario-vazio");
const quizzesUsuario=document.querySelector(".quizzes-usuario");
function reconfigurarHomeUsuario(){
    
    quizzesVazio.classList.toggle("escondido");
    quizzesUsuario.classList.toggle("escondido");
}