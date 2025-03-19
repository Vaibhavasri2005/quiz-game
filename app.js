let currentQuestion = 0;
let score = 0;

const questions = [
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    },
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    }
];

function displayQuestion() {
    const questionElem = document.getElementById('question');
    const optionsElem = document.getElementById('options');
    optionsElem.innerHTML = '';

    const current = questions[currentQuestion];
    questionElem.textContent = current.question;

    current.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsElem.appendChild(button);
    });
}

function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestion].answer;
    if (selectedOption === correctAnswer) {
        score++;
    }
    document.getElementById('next-button').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        alert(`Game Over! Your score: ${score}`);
        resetGame();
    }
}

function resetGame() {
    currentQuestion = 0;
    score = 0;
    displayQuestion();
}

displayQuestion();
