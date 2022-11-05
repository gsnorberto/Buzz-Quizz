//---------(Provisorio) Dinâmica das duas telas dos Quizzes do Usuário-------- //
const home = document.querySelector(".container")
const quizzesVazio= document.querySelector(".quizzes-usuario-vazio");
const quizzesUsuario=document.querySelector(".quizzes-usuario");
const quizzesGerais = document.querySelector(".todos-os-quizzes");

//------------Função que vai reinderizar quizzes do usuario, caso haja----------------//
function reconfigurarHomeUsuario(){
    
    quizzesVazio.classList.toggle("escondido");
    quizzesUsuario.classList.toggle("escondido");
}

//------------(Provisorio) Redirecionar para o quizz em questão --------------//

function iniciarQuizz(){
    home.classList.add("escondido");
}

//-------------Função que reinderiza Todos os quizzes do servidor -----------//
importarQuizzes();
reinderizarTodosQuizzes();
function reinderizarTodosQuizzes(resposta){
    console.log("resposta chegou");
    console.log(resposta.data);
    //supor que o quizz do usuario tenha id : 16629
    let idUsuario= ["16629"]
    for(let i=0; i<=50;i++){
        if(idUsuario.indexOf(String(resposta.data[i].id)) !== -1 ){
            quizzesVazio.classList.add("escondido");
            quizzesUsuario.classList.remove("escondido");
            quizzesUsuario.innerHTML+=`
            <div class="quizz" onclick="renderizarQuizzes(${resposta.data[i].id})"> 
                <img src="${resposta.data[i].image}"/>
                <div class="efeito-imagem"></div>
                <div class="titulo-quiz">${resposta.data[i].title}</div>
            </div>
            `
        }
        else{
            quizzesGerais.innerHTML+=`
            <div class="quizz" onclick="renderizarQuizzes(${resposta.data[i].id})"> 
                <img src="${resposta.data[i].image}"/>
                <div class="efeito-imagem"></div>
                <div class="titulo-quiz">${resposta.data[i].title}</div>
            </div>
            `
        }
    }
}
//--------------Função que busca Todos os quizzes do servidor --------------//

function importarQuizzes(){
    let promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(reinderizarTodosQuizzes);
    promise.catch((error) => {console.log("Erro ao obter todos os Quizzes")});
}

