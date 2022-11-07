let idsQuizzesLocais = [];
let todosOsQuizzes = [];
let idUsuarioCadastrado;
let idUsuariosLocais;
let dadosCriacaoQuizz = { title: "", image: "", questions: [], levels: [] }; //lista com o quizz criado pelo usuário

//---------(Provisorio) Dinâmica das duas telas dos Quizzes do Usuário-------- //
const home = document.querySelector(".container")
const quizzesVazio= document.querySelector(".quizzes-usuario-vazio");
const quizzesUsuario=document.querySelector(".quizzes-usuario");
const quizzesGerais = document.querySelector(".todos-os-quizzes");

//------------Função que vai reinderizar quizzes do usuario, caso haja----------------//
function adicionarNovoQuizz(){
    dadosCriacaoQuizz = { title: "", image: "", questions: [], levels: [] };
    document.querySelector('.container').classList.add('escondido');
    document.querySelector('.adicionar-quizz').classList.remove('escondido');
}

//------------(Provisorio) Redirecionar para o quizz em questão --------------//

function iniciarQuizz(){
    home.classList.add("escondido");
}

//-------------Função que reinderiza Todos os quizzes do servidor -----------//
importarQuizzes();
renderizarTodosQuizzes();
function renderizarTodosQuizzes(resposta){
    todosOsQuizzes = resposta.data;
    
    // Verifica se há ids cadastrados no LocalStorage
    let idsQuizzesJSON = localStorage.getItem("idsQuizzes");
    let idsQuizzesLoc = JSON.parse(idsQuizzesJSON);
    if(idsQuizzesLoc){
        idsQuizzesLocais = idsQuizzesLoc;
    }
    
    for(let i=0; i<=50;i++){
        // QUizzes do usuário local
        if(idsQuizzesLocais.includes(todosOsQuizzes[i].id) ){
            quizzesVazio.classList.add("escondido");
            quizzesUsuario.classList.remove("escondido");
            quizzesUsuario.innerHTML+=`
            <div class="quizz" onclick="verificarQuizz(${todosOsQuizzes[i].id})"> 
                <img src="${todosOsQuizzes[i].image}"/>
                <div class="efeito-imagem"></div>
                <div class="titulo-quiz-home">${todosOsQuizzes[i].title}</div>
            </div>
            `
        }
        // Outros Quizes
        else{
            quizzesGerais.innerHTML+=`
            <div class="quizz" onclick="verificarQuizz(${todosOsQuizzes[i].id})"> 
                <img src="${todosOsQuizzes[i].image}"/>
                <div class="efeito-imagem"></div>
                <div class="titulo-quiz-home">${todosOsQuizzes[i].title}</div>
            </div>
            `
        }
    }
}

//--------------Função que busca Todos os quizzes do servidor --------------//
function importarQuizzes(){
    let promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(renderizarTodosQuizzes);
    promise.catch((error) => {alert("Erro ao obter todos os Quizzes")});
}

function voltarParaHome() {
    document.location.reload(true);
}