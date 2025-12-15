document.addEventListener("DOMContentLoaded", () => {

    // Sidebar elementen
    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    // Sidebar toggle
    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        overlay.classList.toggle("active");
    });

    overlay.addEventListener("click", () => {
        sidebar.classList.remove("open");
        overlay.classList.remove("active");
    });

    // Flashcard elementen
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

    // Planning knop
    const showPlanningBtn = document.getElementById("showPlanning");
    const planningSection = document.getElementById("planning");

    // Flashcard flip
    flashcardEl.addEventListener("click", () => {
        if (!flashcardEl.classList.contains("flipped")) {
            cardBack.textContent = activeCards[currentIndex].antwoord;
        }
        flashcardEl.classList.toggle("flipped");
    });

    // Start quiz Frans
    startFrench.addEventListener("click", () => {
        document.getElementById("home").classList.add("hidden"); // verberg hoofdmenu
        planningSection.classList.add("hidden");                 // verberg planning sectie
        activeCards = [...flashcards];
        wrongCards = [];
        currentIndex = 0;
        showFlashcards();
        loadCard();
    });

    // Juist/Fout knoppen
    correctBtn.addEventListener("click", nextCard);
    wrongBtn.addEventListener("click", () => {
        wrongCards.push(activeCards[currentIndex]);
        nextCard();
    });

    // Herhaal foute woorden
    repeatWrongBtn.addEventListener("click", () => {
        if(wrongCards.length === 0) return;
        activeCards = [...wrongCards];
        wrongCards = [];
        currentIndex = 0;
        showFlashcards();
        loadCard();
    });

    // Herhaal alles
    repeatAllBtn.addEventListener("click", () => {
        activeCards = [...flashcards];
        wrongCards = [];
        currentIndex = 0;
        showFlashcards();
        loadCard();
    });

    // Planning knop functionaliteit
    showPlanningBtn.addEventListener("click", () => {
        document.getElementById("home").classList.add("hidden");  // verberg hoofdmenu
        document.getElementById("quiz").classList.add("hidden");  // verberg quiz
        document.getElementById("result").classList.add("hidden"); // verberg resultaten
        planningSection.classList.remove("hidden");               // toon planning
    });

    // Laad een flashcard
    function loadCard() {
        const card = activeCards[currentIndex];
        cardFront.textContent = card.vraag;
        cardBack.textContent = "";
        flashcardEl.classList.remove("flipped");

        // Verberg resultaten tijdens quiz
        document.getElementById("result").classList.add("hidden");
        document.getElementById("wrongList").innerHTML = "";
        repeatWrongBtn.classList.add("hidden");
        repeatAllBtn.classList.add("hidden");
        document.getElementById("resultTitle").classList.add("hidden");
    }

    // Ga naar volgende kaart
    function nextCard() {
        currentIndex++;
        if (currentIndex >= activeCards.length) showResults();
        else loadCard();
    }

    // Toon resultaten / foute woorden
    function showResults() {
        // Verberg flashcards
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

    // Toon flashcards
    function showFlashcards() {
        document.getElementById("quiz").classList.remove("hidden");
        document.getElementById("result").classList.add("hidden");
        planningSection.classList.add("hidden");
    }

});
