document.addEventListener("DOMContentLoaded", () => {

  const flashcards = [
    { vraag: "Huis", antwoord: "House" },
    { vraag: "Boom", antwoord: "Tree" },
    { vraag: "Auto", antwoord: "Car" },
    { vraag: "Huis", antwoord: "House" },
    { vraag: "Boom", antwoord: "Tree" },
    { vraag: "Auto", antwoord: "Car" },
    { vraag: "Huis", antwoord: "House" },
    { vraag: "Boom", antwoord: "Tree" },
    { vraag: "Auto", antwoord: "Car" },
    { vraag: "Huis", antwoord: "House" },
    { vraag: "Boom", antwoord: "Tree" },
    { vraag: "Auto", antwoord: "Car" },
    { vraag: "Huis", antwoord: "House" },
    { vraag: "Boom", antwoord: "Tree" },
    { vraag: "Auto", antwoord: "Car" },
    { vraag: "Water", antwoord: "Water" }
  ];

  let currentIndex = 0;
  let wrongCards = [];
  let activeCards = [...flashcards]; // direct starten

  const cardFront = document.getElementById("cardFront");
  const cardBack = document.getElementById("cardBack");
  const flashcardEl = document.getElementById("flashcard");
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

  // Flashcard flip
  flashcardEl.addEventListener("click", () => {
    if (!flashcardEl.classList.contains("flipped")) {
      cardBack.textContent = activeCards[currentIndex].antwoord;
    }
    flashcardEl.classList.toggle("flipped");
  });

  // Quiz functies
  window.markCorrect = function() { nextCard(); }
  window.markWrong = function() { wrongCards.push(activeCards[currentIndex]); nextCard(); }
  window.repeatWrong = function() {
    activeCards = [...wrongCards];
    wrongCards = [];
    currentIndex = 0;
    loadCard();
    showSection("quiz");
  }

function loadCard() {
  const card = activeCards[currentIndex];
  cardFront.textContent = card.vraag;
  cardBack.textContent = "";
  flashcardEl.classList.remove("flipped");

  // Verberg resultaten-sectie onderdelen
  document.getElementById("wrongList").innerHTML = "";
  document.getElementById("repeatWrongBtn").classList.add("hidden");
  document.getElementById("repeatAllBtn").classList.add("hidden");
  document.getElementById("resultTitle").classList.add("hidden"); // verberg titel
}



  function nextCard() {
    currentIndex++;
    if (currentIndex >= activeCards.length) showResults();
    else loadCard();
  }
function showResults() {
  const list = document.getElementById("wrongList");
  const repeatWrongBtn = document.getElementById("repeatWrongBtn");
  const repeatAllBtn = document.getElementById("repeatAllBtn");
  const resultTitle = document.getElementById("resultTitle");

  list.innerHTML = "";
  repeatWrongBtn.classList.add("hidden");
  repeatAllBtn.classList.add("hidden");

  resultTitle.classList.remove("hidden"); // titel alleen zichtbaar in result

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

  showSection("result");
}

// functie om de hele quiz opnieuw te starten
window.repeatAll = function() {
  activeCards = [...flashcards];
  wrongCards = [];
  currentIndex = 0;
  loadCard();
  showSection("quiz");
};


  function showSection(id) {
    ["quiz","result"].forEach(sec => document.getElementById(sec).classList.add("hidden"));
    document.getElementById(id).classList.remove("hidden");
  }

  // direct quiz starten
  showSection("quiz");
  loadCard();

});
