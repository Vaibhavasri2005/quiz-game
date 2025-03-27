let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.getElementById('quiz-container');
const scoreDisplay = document.getElementById('score');
const nextButton = document.getElementById('next-button');

// Fetch questions from the backend
fetch('http://localhost:3000/questions')
    .then(response => response.json())
    .then(data => {
        const questions = data;
        
        function loadQuestion() {
            const question = questions[currentQuestionIndex];
            quizContainer.innerHTML = `
                <h2>${question.question}</h2>
                ${question.options.map((option, index) => 
                    `<button class="option" onclick="checkAnswer(${index})">${option}</button>`
                ).join('')}
            `;
        }

        loadQuestion();

        nextButton.onclick = () => {
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                loadQuestion();
            } else {
                alert("Quiz Over! Your final score: " + score);
            }
        };

        function checkAnswer(selectedIndex) {
            const question = questions[currentQuestionIndex];
            const selectedOption = question.options[selectedIndex];

            if (selectedOption === question.correctAnswer) {
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
                alert('Correct Answer!');
            } else {
                alert('Wrong Answer!');
            }
            nextButton.disabled = false;
        }
    })
    .catch(err => console.error("Error fetching questions: ", err));
