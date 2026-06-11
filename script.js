// Banco de perguntas focado no Agrinho 2026
const quizData = [
    {
        question: "O Brasil é um dos maiores produtores de alimentos do mundo, mas importa grande parte dos fertilizantes (NPK). Qual é uma alternativa sustentável para reduzir essa dependência?",
        options: [
            "Aumentar o uso de adubação química sem controle.",
            "Utilizar biofertilizantes, fixação biológica de nitrogênio e rochagem.",
            "Substituir toda a plantação por florestas nativas de uma só vez.",
            "Proibir a produção de culturas que exigem muitos nutrientes."
        ],
        correct: 1
    },
    {
        question: "Para evitar o desmatamento ilegal e manter o 'Agro-Forte', qual estratégia permite aumentar a produção sem abrir novas áreas de mata nativa?",
        options: [
            "Aumentar o desmatamento apenas em áreas de cerrado.",
            "Deixar a terra descansar por décadas sem produzir nada.",
            "Intensificar a produção em pastagens degradadas e usar a Integração Lavoura-Pecuária-Floresta (ILPF).",
            "Abandonar o uso de tecnologia e maquinários no campo."
        ],
        correct: 2
    },
    {
        question: "A agricultura de precisão ajuda no equilíbrio entre produção e meio ambiente porque:",
        options: [
            "Aplica fertilizantes e defensivos apenas na quantidade exata e no local necessário, evitando desperdícios.",
            "Garante que todas as plantas cresçam exatamente com o mesmo tamanho físico.",
            "Elimina a necessidade de qualquer tipo de manejo ou cuidado com o solo.",
            "Serve apenas para monitorar o clima através de satélites sem alterar o manejo."
        ],
        correct: 0
    },
    {
        question: "O que diz o Código Florestal Brasileiro sobre a preservação nas propriedades rurais?",
        options: [
            "Toda propriedade rural deve ser transformada em reserva ecológica integral.",
            "Não há obrigatoriedade de preservação se a produção for de grãos.",
            "O produtor pode desmatar 100% se usar fertilizantes orgânicos.",
            "Exige a manutenção da Reserva Legal e a proteção das Áreas de Preservação Permanente (APPs), como margens de rios."
        ],
        correct: 3
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");
const progress = document.getElementById("progress");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const scoreText = document.getElementById("score-text");
const feedbackText = document.getElementById("feedback-text");

function loadQuestion() {
    resetState();
    let currentQuestion = quizData[currentQuestionIndex];
    questionText.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    
    // Atualiza a barra de progresso
    const progressPercentage = ((currentQuestionIndex) / quizData.length) * 100;
    progress.style.width = `${progressPercentage}%`;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(button, index));
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

function selectOption(selectedBtn, optionIndex) {
    const correctAnswerIndex = quizData[currentQuestionIndex].correct;
    const allButtons = optionsContainer.querySelectorAll(".option-btn");

    // Desabilita todos os botões para o usuário não clicar de novo
    allButtons.forEach(btn => btn.disabled = true);

    if (optionIndex === correctAnswerIndex) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("wrong");
        // Mostra a resposta correta para aprendizado
        allButtons[correctAnswerIndex].classList.add("correct");
    }

    nextButton.style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    progress.style.width = "100%";
    quizScreen.style.display = "none";
    resultScreen.style.display = "block";
    scoreText.innerText = `${score} / ${quizData.length}`;
    
    if (score === quizData.length) {
        feedbackText.innerText = "Incrível! Você domina o equilíbrio entre produção e sustentabilidade! 🌱🚜";
    } else if (score >= quizData.length / 2) {
        feedbackText.innerText = "Bom trabalho! Você entende os desafios do agro do futuro. 🌾";
    } else {
        feedbackText.innerText = "Vale a pena revisar os conteúdos sobre o agro sustentável para ajudar o nosso futuro! 🌎";
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizScreen.style.display = "block";
    resultScreen.style.display = "none";
    loadQuestion();
}

// Inicia o quiz ao carregar a página
loadQuestion();
