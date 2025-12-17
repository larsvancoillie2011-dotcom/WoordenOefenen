document.addEventListener("DOMContentLoaded", () => {

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const dropdownBtns = document.querySelectorAll(".dropdown-btn");
const setButtons = document.querySelectorAll(".set-btn");
const homeButtons = document.querySelectorAll(".menu-start");

const homeSection = document.getElementById("home");
const quizSection = document.getElementById("quiz");
const resultSection = document.getElementById("result");
const flashcardEl = document.getElementById("flashcard");
const cardFront = document.getElementById("cardFront");
const cardBack = document.getElementById("cardBack");

const correctBtn = document.getElementById("correctBtn");
const wrongBtn = document.getElementById("wrongBtn");
const repeatWrongBtn = document.getElementById("repeatWrongBtn");
const repeatAllBtn = document.getElementById("repeatAllBtn");
const wrongList = document.getElementById("wrongList");
const backHome = document.getElementById("backHome");

// Basic flashcards data (demo)
const flashcardsData = {
  frans: { g1: { s1: [{vraag:"Bonjour",antwoord:"Hallo"}]} },
  spaans: { g1: { s1: [{vraag:"Hola",antwoord:"Hallo"}]} },
  engels: { g1: { s1: [{vraag:"Hello",antwoord:"Hallo"}]} }
};

let activeCards = [];
let originalCards = [];
let wrongCards = [];
let currentIndex = 0;
let flipped = false;

// Sidebar open/close
menuBtn.addEventListener("click", () => {
  sidebar.classList.add("open");
  overlay.classList.add("active");
});
overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("active");
  dropdownBtns.forEach(d => { const c=d.nextElementSibling; if(c) c.classList.add("hidden"); });
});

// Dropdown toggle
dropdownBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    if(content) content.classList.toggle("hidden");
  });
});

// Start set from sidebar or home
function startSet(lang, group, set) {
  if(!flashcardsData[lang] || !flashcardsData[lang][group] || !flashcardsData[lang][group][set]) return;
  originalCards = [...flashcardsData[lang][group][set]];
  activeCards = [...originalCards];
  wrongCards = [];
  currentIndex = 0;
  flipped = false;
  homeSection.classList.add("hidden");
  resultSection.classList.add("hidden");
  quizSection.classList.remove("hidden");
  loadCard();
}

setButtons.forEach(btn => btn.addEventListener("click", () => {
  startSet(btn.dataset.lang, btn.dataset.group, btn.dataset.set);
  sidebar.classList.remove("open");
  overlay.classList.remove("active");
}));

homeButtons.forEach(btn => btn.addEventListener("click", () => {
  startSet(btn.dataset.lang, btn.dataset.group, btn.dataset.set);
}));

// Flashcard flip
flashcardEl.addEventListener("click", () => {
  flipped = !flipped;
  flashcardEl.classList.toggle("flipped", flipped);
  cardBack.textContent = flipped ? activeCards[currentIndex].antwoord : "";
});

// Correct / Wrong buttons
correctBtn.addEventListener("click", () => { nextCard(); });
wrongBtn.addEventListener("click", () => { wrongCards.push(activeCards[currentIndex]); nextCard(); });

function nextCard() {
  currentIndex++;
  if(currentIndex >= activeCards.length) showResults();
  else loadCard();
}

// Repeat buttons
repeatWrongBtn.addEventListener("click", () => {
  activeCards = [...wrongCards];
  originalCards = [...activeCards];
  wrongCards = [];
  currentIndex = 0;
  loadCard();
});
repeatAllBtn.addEventListener("click", () => {
  activeCards = [...originalCards];
  wrongCards = [];
  currentIndex = 0;
  loadCard();
});

// Back home
backHome.addEventListener("click", () => {
  quizSection.classList.add("hidden");
  resultSection.classList.add("hidden");
  homeSection.classList.remove("hidden");
});

// Load card
function loadCard() {
  if(!activeCards || activeCards.length===0) return;
  if(currentIndex >= activeCards.length) { showResults(); return; }
  cardFront.textContent = activeCards[currentIndex].vraag;
  cardBack.textContent = "";
  flipped = false;
  flashcardEl.classList.remove("flipped");
  quizSection.classList.remove("hidden");
  resultSection.classList.add("hidden");
  repeatWrongBtn.classList.add("hidden");
  repeatAllBtn.classList.add("hidden");
  wrongList.innerHTML = "";
}

// Show results
function showResults() {
  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");
  wrongList.innerHTML = "";
  if(!wrongCards || wrongCards.length===0){
    const li=document.createElement("li");
    li.textContent="Alles juist! 🎉";
    wrongList.appendChild(li);
    repeatAllBtn.classList.remove("hidden");
    repeatWrongBtn.classList.add("hidden");
  } else {
    wrongCards.forEach(w=>{
      const li=document.createElement("li");
      li.textContent=`${w.vraag} → ${w.antwoord}`;
      wrongList.appendChild(li);
    });
    repeatWrongBtn.classList.remove("hidden");
    repeatAllBtn.classList.remove("hidden");
  }
}

});
