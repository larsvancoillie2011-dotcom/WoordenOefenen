document.addEventListener("DOMContentLoaded", () => {

    // Sidebar toggle
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

    // Flashcards
    const flashcards = [
        { vraag: "Huis", antwoord: "House" },
        { vraag: "Boom", antwoord: "Tree" },
        { vraag: "Auto", antwoord: "Car" },
        { vraag: "Water", antwoord: "Water" }
    ];

    let currentIndex = 0;
    let wrongCards = [];
    let activeCards = [];

    const cardFront = document.getElementById("cardFront");
    const cardBack = document.getElementById("cardBack");
    const flashcardEl = document.getElementById("flashcard");

    const startFrench = document.getElementById("startFrench");
    const correctBtn = document.getElementById("correctBtn");
    const wrongBtn = document.getElementById("wrongBtn");
    const repeatWrongBtn = document.getElementById("repeatWrongBtn");
    const repeatAllBtn = document.getElementById("repeatAllBtn");

    const showPlanningBtn = document.getElementById("showPlanning");
    const planningSection = document.getElementById("planning");

    flashcardEl.addEventListener("click", () => {
        if (!flashcardEl.classList.contains("flipped")) {
            cardBack.textContent = activeCards[currentIndex].antwoord;
        }
        flashcardEl.classList.toggle("flipped");
    });

    startFrench.addEventListener("click", () => {
        document.getElementById("home").classList.add("hidden");
        planningSection.classList.add("hidden");
        activeCards = [...flashcards];
        wrongCards = [];
        currentIndex = 0;
        showFlashcards();
        loadCard();
    });

    correctBtn.addEventListener("click", nextCard);
    wrongBtn.addEventListener("click", () => {
        wrongCards.push(activeCards[currentIndex]);
        nextCard();
    });

    repeatWrongBtn.addEventListener("click", () => {
        if(wrongCards.length === 0) return;
        activeCards = [...wrongCards];
        wrongCards = [];
        currentIndex = 0;
        showFlashcards();
        loadCard();
    });

    repeatAllBtn.addEventListener("click", () => {
        activeCards = [...flashcards];
        wrongCards = [];
        currentIndex = 0;
        showFlashcards();
        loadCard();
    });

    showPlanningBtn.addEventListener("click", () => {
        document.getElementById("home").classList.add("hidden");
        document.getElementById("quiz").classList.add("hidden");
        document.getElementById("result").classList.add("hidden");
        planningSection.classList.remove("hidden");
    });

    function loadCard() {
        const card = activeCards[currentIndex];
        cardFront.textContent = card.vraag;
        cardBack.textContent = "";
        flashcardEl.classList.remove("flipped");
        document.getElementById("result").classList.add("hidden");
        document.getElementById("wrongList").innerHTML = "";
        repeatWrongBtn.classList.add("hidden");
        repeatAllBtn.classList.add("hidden");
        document.getElementById("resultTitle").classList.add("hidden");
    }

    function nextCard() {
        currentIndex++;
        if (currentIndex >= activeCards.length) showResults();
        else loadCard();
    }

    function showResults() {
        document.getElementById("quiz").classList.add("hidden");
        const list = document.getElementById("wrongList");
        list.innerHTML = "";
        document.getElementById("resultTitle").classList.remove("hidden");
        document.getElementById("result").classList.remove("hidden");

        if (wrongCards.length === 0) {
            list.innerHTML = "<li>Alles juist! 🎉</li>";
            repeatAllBtn.classList.remove("hidden");
        } else {
            wrongCards.forEach(c => {
                const li = document.createElement("li");
                li.textContent = `${c.vraag} → ${c.antwoord}`;
                list.appendChild(li);
            });
            repeatWrongBtn.classList.remove("hidden");
        }
    }

    function showFlashcards() {
        document.getElementById("quiz").classList.remove("hidden");
        document.getElementById("result").classList.add("hidden");
        planningSection.classList.add("hidden");
    }

});
