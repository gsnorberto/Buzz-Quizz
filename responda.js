let todosOsQuizzes = [];
let respostasCorretas = [];
let quizzClicado = {}; // Todas as informações do Quizz

// (Provisório) Obter todos os Quizzes
axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    .then((response) => {
        todosOsQuizzes = response.data;
        console.log(todosOsQuizzes);
        renderizarQuizzes(15230);
    }).catch((error) => {
        console.log("Erro ao obter todos os Quizzes");
    });

//Renderizar elementos na tela
function renderizarQuizzes(id) {
    quizzClicado = (todosOsQuizzes.filter((q) => q.id === id))[0];
    console.log(quizzClicado);

    //Título do quizz: ok
    document.querySelector('.responda .imagem-topo').innerHTML = `
        <img src=${quizzClicado.image} alt="">
        <h1> ${quizzClicado.title} </h1>
    `

    //Organizar aleatoriamente as respostas de cada pergunta
    function comparador() {
        return Math.random() - 0.5;
    }

    //PERGUNTAS
    for(let i = 0; i < quizzClicado.questions.length; i++) {
        //RESPOSTA QUIZZ
        let respostasQuizz = "";

        //Posicionar respostas aleatoriamente
        let posicoesRespostas = [];
        for(let k = 0; k < quizzClicado.questions[i].answers.length; k++){
            //EX: Se a qnt de respostas for 3, então cria array [0, 1, 2]
            posicoesRespostas.push(k);
        }
        posicoesRespostas.sort(comparador); // embaralha array

        //Adicionar respostas em posições aleatórias
        for(let j = 0; j < quizzClicado.questions[i].answers.length; j++){
            //Resposta renderizada em posição de forma aleatória
            let res = quizzClicado.questions[i].answers[posicoesRespostas[j]];

            respostasQuizz += `
                <div id="${i}${posicoesRespostas[j]}" onclick="verificarResposta(${posicoesRespostas[j]}, ${i})" class="resposta-quizz">
                    <img class="resposta-img"
                        src=${res.image}
                        alt="">
                    <div class="resposta-desc">${res.text}</div>
                </div>
            `

            //Pegar a resposta correta
            let respostaVerdadeira = res.isCorrectAnswer;
            if(respostaVerdadeira){
                respostasCorretas.push(posicoesRespostas[j]);
            }
        }

        //PERGUNTA QUIZZ - RENDERIZAR NA TELA
        document.querySelector('.area-quizz').innerHTML += `
            <div class="quizz">
                <div class="pergunta-quizz" style="background-color: ${quizzClicado.questions[i].color}">
                    ${quizzClicado.questions[i].title} 
                </div>
                <div class="respostas-quizz">
                    ${respostasQuizz}
                </div>
            </div>
        `

    }

    
    //Tirar oculto da tag area quizz
    // pendente.... 
}

function verificarResposta(resClicada, numDaQuestao){
    //Resposta verdadeira
    if(respostasCorretas[numDaQuestao] == resClicada){
        
        console.log("Acertou")
    } else { //Resposta verdadeira
        console.log("Errou")
    }

    //Marcar respostas certas e erradas
    for(let i = 0; i < quizzClicado.questions[numDaQuestao].answers.length; i++){
        //resposta certa
        if(respostasCorretas[numDaQuestao] == i){
            document.getElementById(`${numDaQuestao}${i}`).style.color = "#009C22";
        } else { // resposta errada
            document.getElementById(`${numDaQuestao}${i}`).style.color = "#FF4B4B";
        }

        //Diminui a opacidade dos itens não clicados
        if(resClicada !== i){
            document.getElementById(`${numDaQuestao}${i}`).style.opacity = "0.3";
        }

        document.getElementById(`${numDaQuestao}${i}`).removeAttribute("onclick");
    }
}