document.addEventListener("DOMContentLoaded", () => {

    // Sidebar
    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    menuBtn.addEventListener("click", () => {
        sidebar.classList.add("open");
        overlay.classList.add("active");
    });

    overlay.addEventListener("click", () => {
        sidebar.classList.remove("open");
        overlay.classList.remove("active");
    });

    // Dropdown
    const dropdownBtn = document.getElementById("dropdownBtn");
    const dropdownMenu = document.getElementById("dropdownMenu");
    dropdownBtn.addEventListener("click", () => {
        dropdownMenu.classList.toggle("hidden");
    });

    // Flashcards data
    const flashcardsData = {
        frans: [
            { vraag: "Huis", antwoord: "House" },
            { vraag: "Boom", antwoord: "Tree" },
            { vraag: "Auto", antwoord: "Car" },
            { vraag: "Water", antwoord: "Water" }
        ],
        spaans: [
            { vraag: "Casa", antwoord: "House" },
            { vraag: "Árbol", antwoord: "Tree" },
            { vraag: "Coche", antwoord: "Car" },
            { vraag: "Agua", antwoord: "Water" }
        ],
        engels: [
            { vraag: "House", antwoord: "Huis" },
            { vraag: "Tree", antwoord: "Boom" },
            { vraag: "Car", antwoord: "Auto" },
            { vraag: "Water", antwoord: "Water" }
        ]
    };

    let activeCards = [];
    let wrongCards = [];
    let currentIndex = 0;

    const cardFront = document.getElementById("cardFront");
    const cardBack = document.getElementById("cardBack");
    const flashcardEl = document.getElementById("flashcard");

    const correctBtn = document.getElementById("correctBtn");
    const wrongBtn = document.getElementById("wrongBtn");
    const repeatWrongBtn = document.getElementById("repeatWrongBtn");
    const repeatAllBtn = document.getElementById("repeatAllBtn");

    const homeSection = document.getElementById("home");
    const quizSection = document.getElementById("quiz");
    const resultSection = document.getElementById("result");
    const resultTitle = document.getElementById("resultTitle");
    const wrongList = document.getElementById("wrongList");
    const planningSection = document.getElementById("planning");

    // Hoofdmenu knoppen starten quiz
    const mainButtons = document.querySelectorAll("#home button[data-lang]");
    mainButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const lang = btn.getAttribute("data-lang");
            if (lang === "planning") {
                homeSection.classList.add("hidden");
                quizSection.classList.add("hidden");
                resultSection.classList.add("hidden");
                planningSection.classList.remove("hidden");
            } else {
                startQuiz(lang);
            }
        });
    });

    // Sidebar dropdown taal
    const langButtons = document.querySelectorAll(".language-btn");
    langButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const lang = btn.getAttribute("data-lang");
            startQuiz(lang);
        });
    });

    function startQuiz(lang) {
        homeSection.classList.add("hidden");
        planningSection.classList.add("hidden");
        resultSection.classList.add("hidden");
        activeCards = [...flashcardsData[lang]];
        wrongCards = [];
        currentIndex = 0;
        showFlashcards();
        loadCard();
        sidebar.classList.remove("open");
        overlay.classList.remove("active");
    }

    flashcardEl.addEventListener("click", () => {
        cardBack.textContent = activeCards[currentIndex].antwoord;
        flashcardEl.classList.toggle("flipped");
    });

    correctBtn.addEventListener("click", nextCard);
    wrongBtn.addEventListener("click", () => {
        wrongCards.push(activeCards[currentIndex]);
        nextCard();
    });

    repeatWrongBtn.addEventListener("click", () => {
        if (wrongCards.length === 0) return;
        activeCards = [...wrongCards];
        wrongCards = [];
        currentIndex = 0;
        showFlashcards();
        loadCard();
    });

    repeatAllBtn.addEventListener("click", () => {
        activeCards = [...flashcardsData.frans];
        wrongCards = [];
        currentIndex = 0;
        showFlashcards();
        loadCard();
    });

    function loadCard() {
        cardFront.textContent = activeCards[currentIndex].vraag;
        cardBack.textContent = "";
        flashcardEl.classList.remove("flipped");
        resultSection.classList.add("hidden");
        wrongList.innerHTML = "";
        repeatWrongBtn.classList.add("hidden");
        repeatAllBtn.classList.add("hidden");
        resultTitle.classList.add("hidden");
    }

    function nextCard() {
        currentIndex++;
        if (currentIndex >= activeCards.length) showResults();
        else loadCard();
    }

    function showResults() {
        quizSection.classList.add("hidden");
        resultSection.classList.remove("hidden");
        wrongList.innerHTML = "";
        resultTitle.classList.remove("hidden");

        if (wrongCards.length === 0) {
            wrongList.innerHTML = "<li>Alles juist! 🎉</li>";
            repeatAllBtn.classList.remove("hidden");
        } else {
            wrongCards.forEach(c => {
                const li = document.createElement("li");
                li.textContent = `${c.vraag} → ${c.antwoord}`;
                wrongList.appendChild(li);
            });
            repeatWrongBtn.classList.remove("hidden");
        }
    }

    function showFlashcards() {
        quizSection.classList.remove("hidden");
        resultSection.classList.add("hidden");
        planningSection.classList.add("hidden");
    }

});
