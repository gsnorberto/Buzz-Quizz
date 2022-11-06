let idUsuariosLocais;
//Validação da tela 3.1 ao apertar no botão de seguir

const infosBasicas = document.querySelector('.infos-basicas');
const criarPerguntas = document.querySelector('.criar-perguntas');
const criarNiveis = document.querySelector('.criar-niveis');

//lista com o quizz criado pelo usuário
let dadosCriacaoQuizz = { title: "", image: "", questions: [], levels: [] };

//verifica se a string é um url
function verificaUrl(termo) {
    try {
        let url = new URL(termo);
        return true;
    } catch (err) {
        return false;
    }
}

let numPerguntas; //numero de perguntas do quizz
let numNiveis = 2; //numero de niveis do quizz
let titulo; //titulo do Quizz
let url; //url da imagem do quizz


function validarInformacoes() {

    let tituloQuizz = (document.querySelector(".titulo-quizz")).value;
    let urlQuizz = (document.querySelector(".url-quizz")).value;
    let qntPerguntas = (document.querySelector(".qntd-perguntas")).value;
    let qntNiveis = (document.querySelector(".qntd-niveis")).value;

    numPerguntas = qntPerguntas;
    numNiveis = qntNiveis;
    titulo = tituloQuizz;
    url = urlQuizz;


    if (tituloQuizz.length < 20 || tituloQuizz.length > 65) {
        console.log('que');
        return alert("Preencha o título corretamente");
    } else if (qntPerguntas < 3) {
        return alert("Preencha o número de perguntas corretamente");
    } else if (qntNiveis < 2) {
        return alert("Preencha o número de níveis corretamente");
    } else if (urlQuizz !== '') {
        if (verificaUrl(urlQuizz) === true) {
            dadosCriacaoQuizz.title = tituloQuizz;
            dadosCriacaoQuizz.image = urlQuizz;
            infosBasicas.classList.add('escondido');
            criarPerguntas.classList.remove('escondido');
            inserirPerguntas();
        } else {
            alert("Preencha o url corretamente");
        }
    }
}

console.log(dadosCriacaoQuizz);

//insere o número de Perguntas escolhido pelo usuário na 1ª tela
function inserirPerguntas() {
    const espaco = document.querySelector('.espaco-perguntas');
    for (let i = 0; numPerguntas > i; i++) {
        espaco.innerHTML += `
        <div class="caixa-pergunta n${i + 1}" onclick="editarPergunta(this)">
        <p>Pergunta ${i + 1}</p>
        <button><img src="./Vector.svg"></button>
    </div>
    
    <form class="n${i + 1} escondido">
        <div class="caixa 1">
            <p>Pergunta ${i + 1}</p>
            <input type="text" class="texto-pergunta" placeholder="Texto da pergunta">
            <input type="text" class="cor-fundo" placeholder="Cor de fundo da pergunta">
        </div>
        <div class="caixa 2">
            <p>Resposta correta</p>
            <input type="text" class="resposta-certa" placeholder="Resposta correta">
            <input type="text" class="url-imagem" placeholder="URL da imagem">
        </div>
        <div class="caixa 3">
            <p>Respostas incorretas</p>
            <input type="text" class="resposta-errada 1" placeholder="Resposta incorreta 1">
            <input type="text" class="url-imagem" placeholder="URL da imagem 1">
        </div>
        <div class="caixa 4">
            <input type="text" class="resposta-errada 2" placeholder="Resposta incorreta 2">
            <input type="text" class="url-imagem" placeholder="URL da imagem 2">
        </div>
        <div class="caixa 5">
            <input type="text" class="resposta-errada 3" placeholder="Resposta incorreta 3">
            <input type="text" class="url-imagem" placeholder="URL da imagem 3">
        </div>
    </form>
        `;
    }
}

//função para abrir o formulário de perguntas ao clicar no ícone de editar
function editarPergunta(item) {
    const listaClasses = item.classList;
    let classe = listaClasses[1];

    const formulario = document.querySelector(`form.${classe}`);

    formulario.classList.remove('escondido');
    item.classList.add('escondido');
}


// função para validar o formulário de perguntas criadas
function validarPerguntas() {

    let quizzQuestion = [];

    const form = [];
    for (let i = 0; numPerguntas > i; i++) {
        let formulario = document.querySelector(`form.n${i + 1}`);
        form.push(formulario);
    }

    const padrao = new RegExp("^#([A-Fa-f0-9]{6})$");

    for (let i = 0; form.length > i; i++) {
        if ((form[i][0].value).length < 20) {
            console.log('titulo invalido');
            alert('Preencha a pergunta corretamente');
            return;
        } else if (padrao.test(form[i][1].value) === false) {
            console.log('cor invalida');
            alert('Preencha a cor corretamente');
            return;
        } else if ((form[i][2].value) === '' || (form[i][3].value) === '') {
            console.log("ta vazio a resposta correta");
            alert("Preencha a resposta corretamente");
            return;
        } else if ((form[i][4].value) === '' && (form[i][6].value) === '' && (form[i][8].value) === '') {
            console.log('ta vazia todas as respostas erradas');
            alert('Preencha alguma das respostas erradas pelo menos');
            return;
        } else if (form[i][3] !== '') {
            if (verificaUrl(form[i][3].value) === false) {
                console.log('eita');
                alert('Preencha a url corretamente');
                return;
            }
        } else if (form[i][5] !== '') {
            if (verificaUrl(form[i][5].value) === false) {
                console.log('eita');
                alert('Preencha a url corretamente');
                return;
            }
        } else if (form[i][7] !== '') {
            if (verificaUrl(form[i][7].value) === false) {
                console.log('eita');
                alert('Preencha a url corretamente');
                return;
            }
        } else if (form[i][9] !== '') {
            if (verificaUrl(form[i][9].value) === false) {
                console.log('eita');
                alert('Preencha a url corretamente');
                return;
            }
        }

        quizzQuestion.push({
            title: form[i][0].value,
            color: form[i][1].value,
            answers: [
                {
                    title: form[i][2].value,
                    color: form[i][3].value,
                    isCorrectAnswer: true
                },
                {
                    title: form[i][4].value,
                    color: form[i][5].value,
                    isCorrectAnswer: false
                },
                {
                    title: form[i][6].value,
                    color: form[i][7].value,
                    isCorrectAnswer: false

                },
                {
                    title: form[i][8].value,
                    color: form[i][9].value,
                    isCorrectAnswer: false
                }
            ]
        });

    }

    dadosCriacaoQuizz.questions.push(quizzQuestion);
    mudarTelaNiveis();
}


//função para abri a tela de criação de niveis

function mudarTelaNiveis() {
    criarPerguntas.classList.add('escondido');
    criarNiveis.classList.remove('escondido');
    inserirNiveis();
}

// insere o número de níveis escolhidos pelo usuário 

function inserirNiveis() {
    const espacoNiveis = document.querySelector(".espaco-niveis");
    console.log(espacoNiveis);
    for (let i = 0; numNiveis > i; i++) {
        espacoNiveis.innerHTML += `
    <div class="caixa-nivel z${i + 1}" onclick="editarPergunta(this)">
        <p>Nível ${i + 1}</p>
        <button><img src="./Vector.svg"></button>
    </div>
    <form class="z${i + 1} escondido">
        <p>Nível ${i + 1}</p>
        <input type="text" class="titulo-quizz" placeholder="Título do nível">
        <input type="number" class="acerto-minimo" placeholder="% de acerto mínima">
        <input type="text" class="url-nivel" placeholder="URL da imagem do nível">
        <input type="text" class="descrição-nivel" placeholder="Descrição do nível">
    </form>
    `;
    }
}

//função para validar as informações dos níveis
function validarNiveis() {

    let quizzNivel = [];

    const form = [];
    for (let i = 0; numNiveis > i; i++) {
        let formulario = document.querySelector(`form.n${i + 1}`);
        form.push(formulario);
    }

    for (let i = 0; form.length > i; i++) {
        if ((form[i][0].value).length < 20) {
            console.log('titulo invalido');
            alert('Preencha o título do nível corretamente');
            return;
        }
        else if (Number((form[i][1].value)) >= 100 || Number((form[i][1].value)) < 0) {
            console.log("% inválida");
            alert("Porcentagem mínima inválida");
            return;
        }
        else if (verificaUrl(form[i][2].value) === false) {
            console.log("url inválida");
            alert("Preencha a url corretamente");
            return;
        }
        else if (form[i][3].length < 30) {
            console.log("Descrição invalida");
            alert("Preencha a descrição corretamente");
            return;
        }

        quizzNivel.push({
            title: form[i][0].value,
            image: form[i][2].value,
            text: form[i][3].value,
            minValue: form[i][1].value
        });

    }

    dadosCriacaoQuizz.levels.push(quizzNivel);

    let listaBool = [];
    for (let i = 0; form.length > i; i++) {
        if (Number((form[i][1].value)) === 0) {
            listaBool.push(true);
        }
    }
    if (listaBool.length === 0) {
        console.log("uma porcentagem zero, ao menos");
        alert("Pelo menos um nível com a porcentagem de acerto igual a 0%");
    }
    else {
        criarNiveis.classList.add('escondido');
    }
}



//Adicionar quizzes no local storage para renderizar no espaço quizzes-usuario  
function adicionarQuizzServidor() {
    const enviandoQuizz = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", dadosCriacaoQuizz);
    enviandoQuizz.then(adicionarQuizzesDoUsuario);
    enviandoQuizz.catch((erro) => { console.log("erro ao enviar"); });
}

function adicionarQuizzesDoUsuario(resposta) {
    let idUsuarioCadastrado = resposta.data[0].id;
    let idsQuizzesJSON = localStorage.getItem("idsQuizzes");
    idUsuariosLocais = JSON.parse(idsQuizzesJSON);
    if (idUsuariosLocais) {
        idUsuariosLocais.push(idUsuarioCadastrado);
    }
    else {
        idUsuariosLocais = [idUsuarioCadastrado];
    }
    idsQuizzesJSON = JSON.stringify(idUsuariosLocais);
    localStorage.setItem("idsQuizzes", idsQuizzesJSON);
}

//insere quizz criado na tela de sucesso 

function inserirQuizzCriado() {
    const espacoQuizzCriado = document.querySelector(".quizz-criado");
    espacoQuizzCriado.innerHTML = `
        <h1>Seu quizz está pronto!</h1>
        <div class="quizz"> 
            <img src="${dadosCriacaoQuizz.image}"/>
            <div class="efeito-imagem"></div>
            <div class="titulo-quiz">${dadosCriacaoQuizz.title}</div>
        </div>
        <button class='acessar-quizz' onclick="renderizarQuizzes()" >Acessar Quizz</button>
        <button class="voltar-home">Voltar pra home</button>
    `;
    espacoQuizzCriado.classList.remove("escondido");
}

// função acessar home 
function volarHome() {
    home.classList.remove("escondido");
}




