document.addEventListener("DOMContentLoaded", () => {
    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];

    async function fetchQuestions() {
        const response = await fetch("http://localhost:5000/questions");
        questions = await response.json();
        showQuestion();
    }

    function showQuestion() {
        if (currentQuestionIndex >= questions.length) {
            alert(`Game Over! Your Score: ${score}`);
            return;
        }

        const questionData = questions[currentQuestionIndex];
        document.getElementById("question").textContent = questionData.question;

        const optionsContainer = document.getElementById("options");
        optionsContainer.innerHTML = "";

        questionData.options.forEach(option => {
            const btn = document.createElement("button");
            btn.textContent = option;
            btn.onclick = () => checkAnswer(option, questionData.answer);
            optionsContainer.appendChild(btn);
        });
    }

    function checkAnswer(selected, correct) {
        const buttons = document.querySelectorAll("#options button");
        buttons.forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === correct) btn.classList.add("correct");
            else if (btn.textContent === selected) btn.classList.add("wrong");
        });

        setTimeout(() => {
            if (selected === correct) score++;
            document.getElementById("score").textContent = `Score: ${score}`;
            currentQuestionIndex++;
            showQuestion();
        }, 1000);
    }

    fetchQuestions();
});
