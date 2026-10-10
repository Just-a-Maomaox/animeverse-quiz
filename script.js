const questions = [
    {
        id: 1,
        anime: "Naruto",
        question: "Who is the main character of Naruto?",
        choices: [
            "Sasuke Uchiha",
            "Naruto Uzumaki",
            "Kakashi Hatake",
            "Itachi Uchiha"
        ],
        answer: "Naruto Uzumaki"
    },
    {
        id: 2,
        anime: "One Piece",
        question: "What is the name of Luffy's pirate crew?",
        choices: [
            "Red Hair Pirates",
            "Whitebeard Pirates",
            "Straw Hat Pirates",
            "Blackbeard Pirates"
        ],
        answer: "Straw Hat Pirates"
    },
    {
        id: 3,
        anime: "Death Note",
        question: "What is the name of the Shinigami who drops the Death Note?",
        choices: [
            "Ryuk",
            "Rem",
            "Light",
            "L"
        ],
        answer: "Ryuk"
    },
    {
        id: 4,
        anime: "Demon Slayer",
        question: "What is the name of Tanjiro's sister?",
        choices: [
            "Shinobu",
            "Mitsuri",
            "Kanao",
            "Nezuko"
        ],
        answer: "Nezuko"
    },
    {
        id: 5,
        anime: "Attack on Titan",
        question: "Who is Eren Yeager's childhood friend?",
        choices: [
            "Jean Kirstein",
            "Armin Arlert",
            "Reiner Braun",
            "Levi Ackerman"
        ],
        answer: "Armin Arlert"
    }
];

const questionElement = document.getElementById("question");
const numberElement = document.getElementById("question-number");
const choicesElement = document.getElementById("answer-choices");
const progressElement = document.getElementById("progress");
const submitButton = document.getElementById("submit-btn");
const feedbackElement = document.getElementById("feedback");

let currentQuestion = 0;
let score = 0;
let submitted = false;

function showQuestion() {
    const current = questions[currentQuestion];

    questionElement.textContent = current.question;
    numberElement.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    progressElement.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    choicesElement.innerHTML = "";
    feedbackElement.textContent = "";
    submitted = false;
    submitButton.textContent = "Submit Answer";
    submitButton.disabled = false;

    current.choices.forEach((choice, index) => {
        const label = document.createElement("label");
        label.className = "answer-option";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = choice;
        radio.id = `answer-${index}`;

        const text = document.createElement("span");
        text.textContent = choice;

        label.appendChild(radio);
        label.appendChild(text);
        choicesElement.appendChild(label);
    });
}

submitButton.addEventListener("click", () => {
    if (submitted) {
        currentQuestion++;

        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResults();
        }

        return;
    }

    const selected = document.querySelector(
        'input[name="answer"]:checked'
    );

    if (!selected) {
        feedbackElement.textContent = "Please select an answer!";
        return;
    }

    submitted = true;
    submitButton.textContent = "Next Question";

    if (selected.value === questions[currentQuestion].answer) {
        score++;
        feedbackElement.textContent = "Correct! Well done!";
    } else {
        feedbackElement.textContent =
            `Incorrect! The correct answer is ${questions[currentQuestion].answer}.`;
    }

    document.querySelectorAll('input[name="answer"]').forEach(input => {
        input.disabled = true;
    });

    progressElement.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;
});

function showResults() {
    document.querySelector(".quiz-container").innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your score: ${score} / ${questions.length}</p>
        <p>You got ${Math.round(score / questions.length * 100)}% correct.</p>
        <button id="restart-btn">Play Again</button>
    `;

    document.getElementById("restart-btn").addEventListener("click", () => {
        currentQuestion = 0;
        score = 0;

        document.querySelector(".quiz-container").innerHTML = `
            <h2>Anime Trivia Quiz</h2>
            <p id="question-number"></p>
            <div class="progress-bar"><div id="progress"></div></div>
            <h3 id="question"></h3>
            <div id="answer-choices" class="answer-choices"></div>
            <button id="submit-btn">Submit Answer</button>
            <p id="feedback"></p>
        `;

        // Refresh the page to reset all quiz elements.
        location.reload();
    });
}

showQuestion();