let todosOsQuizzes = [];

// (Provisório) Obter todos os Quizzes
axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes")
    .then((response) => {
        todosOsQuizzes = response.data;
        console.log(todosOsQuizzes);
        renderizarQuizzes(14933);
    }).catch((error) => {
        console.log("Erro ao obter todos os Quizzes");
    });

//Renderizar elementos na tela
function renderizarQuizzes(id) {
    let quizzClicado = (todosOsQuizzes.filter((q) => q.id === id))[0];
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
        let posicoesPerguntas = [];
        for(let k = 0; k < quizzClicado.questions[i].answers.length; k++){
            //EX: Se a qnt de respostas for 3, então cria array [0, 1, 2]
            posicoesPerguntas.push(k);
        }
        posicoesPerguntas.sort(comparador); // embaralha array

        //Adicionar respostas em posições aleatórias
        for(let j = 0; j < quizzClicado.questions[i].answers.length; j++){
            respostasQuizz += `
                <div class="resposta-quizz">
                    <img class="resposta-img"
                        src=${quizzClicado.questions[i].answers[posicoesPerguntas[j]].image}
                        alt="">
                    <div class="resposta-desc">${quizzClicado.questions[i].answers[posicoesPerguntas[j]].text}</div>
                </div>
            `

            //Pegar a resposta correta
            // pendente...
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