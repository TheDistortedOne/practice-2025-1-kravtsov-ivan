const questions = [{
        question: "Что такое API?",
        options: ["Антивирус", "Интерфейс для взаимодействия программ", "База данных"],
        correct: 1,
    },
    {
        question: "Что делает console.log()?",
        options: ["Удаляет переменные", "Выводит сообщение в консоль", "Запускает программу"],
        correct: 1,
    },
    {
        question: "Что такое Git?",
        options: ["Браузер", "Протокол HTTP", "Система контроля версий"],
        correct: 2,
    },
    {
        question: "Что такое Backend?",
        options: ["Клиентская часть", "Серверная часть", "Графический интерфейс"],
        correct: 1,
    },
    {
        question: "Что такое DOM?",
        options: ["Объектная модель документа", "Формат базы данных", "Программа для CSS"],
        correct: 0,
    },
    {
        question: "Что такое commit в Git?",
        options: ["Слияние веток", "Фиксация изменений", "Удаление файла"],
        correct: 1,
    },
    {
        question: "Что делает HTML?",
        options: ["Определяет структуру веб-страницы", "Хранит данные", "Обрабатывает запросы"],
        correct: 0,
    },
    {
        question: "Что означает термин 'bug'?",
        options: ["Оптимизация", "Ошибка", "Загрузка"],
        correct: 1,
    },
    {
        question: "Что делает CSS?",
        options: ["Сохраняет изображения", "Определяет стиль страницы", "Создаёт базы данных"],
        correct: 1,
    },
    {
        question: "Что такое loop?",
        options: ["Цикл", "Файл", "Браузер"],
        correct: 0,
    },
];

let selected = [];
const quizForm = document.getElementById("quiz-form");

function getRandomQuestions(qList, count) {
    const shuffled = [...qList].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function renderQuiz() {
    selected = getRandomQuestions(questions, 5);
    quizForm.innerHTML = ""; // очистка

    selected.forEach((q, i) => {
        const block = document.createElement("div");
        block.className = "question-block";
        block.innerHTML = `<p><strong>${i + 1}. ${q.question}</strong></p>` + q.options
            .map(
                (opt, j) =>
                `<label><input type="radio" name="q${i}" value="${j}"> ${opt}</label><br />`
            )
            .join("");
        quizForm.appendChild(block);
    });

    document.getElementById("result").textContent = "";
}

function checkAnswers() {
    let score = 0;

    selected.forEach((q, i) => {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value) === q.correct) {
            score++;
        }
    });

    const result = document.getElementById("result");
    result.textContent = `Правильных ответов: ${score} из ${selected.length}`;
    result.style.color = score === selected.length ? "green" : score === 0 ? "red" : "#333";

    if (score === selected.length) {
        setTimeout(() => {
            alert("Отлично! Загружается новая серия вопросов.");
            renderQuiz();
        }, 500);
    }
}

// первичная генерация при загрузке страницы
renderQuiz();