document.addEventListener("DOMContentLoaded", () => {

  // ELEMENTS
  const menuBtn = document.getElementById("menuBtn");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");

  const dropdownBtns = Array.from(document.querySelectorAll(".dropdown-btn"));
  const dropdownContents = Array.from(document.querySelectorAll(".dropdown-content"));
  const subDropdownBtns = Array.from(document.querySelectorAll(".sub-dropdown-btn"));
  const subContents = Array.from(document.querySelectorAll(".sub-content"));
  const setButtons = Array.from(document.querySelectorAll(".set-btn"));
  const homeButtons = Array.from(document.querySelectorAll("#home [data-lang][data-group][data-set]"));

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

  // FLASHCARDS DATA (per language -> group -> set)
  const flashcardsData = {
    frans: {
      g1: {
        s1: [{vraag:"Bonjour",antwoord:"Hallo"},{vraag:"Merci",antwoord:"Dank je"},{vraag:"S'il vous plaît",antwoord:"Alsjeblieft"}],
        s2: [{vraag:"Chat",antwoord:"Kat"},{vraag:"Chien",antwoord:"Hond"},{vraag:"Cheval",antwoord:"Paard"}],
        s3: [{vraag:"Maison",antwoord:"Huis"},{vraag:"Fenêtre",antwoord:"Ramen"},{vraag:"Porte",antwoord:"Deur"}]
      },
      g2: {
        s1: [{vraag:"Rouge",antwoord:"Rood"},{vraag:"Bleu",antwoord:"Blauw"},{vraag:"Vert",antwoord:"Groen"}],
        s2: [{vraag:"Grand",antwoord:"Groot"},{vraag:"Petit",antwoord:"Klein"},{vraag:"Jeune",antwoord:"Jong"}],
        s3: [{vraag:"Livre",antwoord:"Boek"},{vraag:"Stylo",antwoord:"Pen"},{vraag:"Table",antwoord:"Tafel"}]
      },
      g3: {
        s1: [{vraag:"Jour",antwoord:"Dag"},{vraag:"Nuit",antwoord:"Nacht"},{vraag:"Semaine",antwoord:"Week"}],
        s2: [{vraag:"Eau",antwoord:"Water"},{vraag:"Lait",antwoord:"Melk"},{vraag:"Jus",antwoord:"Sap"}],
        s3: [{vraag:"Amis",antwoord:"Vrienden"},{vraag:"Famille",antwoord:"Familie"},{vraag:"École",antwoord:"School"}]
      }
    },
    spaans: {
      g1: {
        s1: [{vraag:"Hola",antwoord:"Hallo"},{vraag:"Adiós",antwoord:"Dag"},{vraag:"Por favor",antwoord:"Alsjeblieft"}],
        s2: [{vraag:"Casa",antwoord:"Huis"},{vraag:"Puerta",antwoord:"Deur"},{vraag:"Ventana",antwoord:"Ramen"}],
        s3: [{vraag:"Gato",antwoord:"Kat"},{vraag:"Perro",antwoord:"Hond"},{vraag:"Pájaro",antwoord:"Vogel"}]
      },
      g2: {
        s1: [{vraag:"Rojo",antwoord:"Rood"},{vraag:"Azul",antwoord:"Blauw"},{vraag:"Verde",antwoord:"Groen"}],
        s2: [{vraag:"Grande",antwoord:"Groot"},{vraag:"Pequeño",antwoord:"Klein"},{vraag:"Joven",antwoord:"Jong"}],
        s3: [{vraag:"Libro",antwoord:"Boek"},{vraag:"Pluma",antwoord:"Pen"},{vraag:"Mesa",antwoord:"Tafel"}]
      },
      g3: {
        s1: [{vraag:"Día",antwoord:"Dag"},{vraag:"Noche",antwoord:"Nacht"},{vraag:"Semana",antwoord:"Week"}],
        s2: [{vraag:"Agua",antwoord:"Water"},{vraag:"Leche",antwoord:"Melk"},{vraag:"Jugo",antwoord:"Sap"}],
        s3: [{vraag:"Amigos",antwoord:"Vrienden"},{vraag:"Familia",antwoord:"Familie"},{vraag:"Escuela",antwoord:"School"}]
      }
    },
    engels: {
      g1: {
        s1: [{vraag:"House",antwoord:"Huis"},{vraag:"Home",antwoord:"Thuis"},{vraag:"Room",antwoord:"Kamer"}],
        s2: [{vraag:"Cat",antwoord:"Kat"},{vraag:"Dog",antwoord:"Hond"},{vraag:"Bird",antwoord:"Vogel"}],
        s3: [{vraag:"Car",antwoord:"Auto"},{vraag:"Bike",antwoord:"Fiets"},{vraag:"Bus",antwoord:"Bus"}]
      },
      g2: {
        s1: [{vraag:"Red",antwoord:"Rood"},{vraag:"Blue",antwoord:"Blauw"},{vraag:"Green",antwoord:"Groen"}],
        s2: [{vraag:"Big",antwoord:"Groot"},{vraag:"Small",antwoord:"Klein"},{vraag:"Young",antwoord:"Jong"}],
        s3: [{vraag:"Book",antwoord:"Boek"},{vraag:"Pen",antwoord:"Pen"},{vraag:"Table",antwoord:"Tafel"}]
      },
      g3: {
        s1: [{vraag:"Sun",antwoord:"Zon"},{vraag:"Moon",antwoord:"Maan"},{vraag:"Star",antwoord:"Ster"}],
        s2: [{vraag:"Water",antwoord:"Water"},{vraag:"Milk",antwoord:"Melk"},{vraag:"Juice",antwoord:"Sap"}],
        s3: [{vraag:"Friend",antwoord:"Vriend"},{vraag:"School",antwoord:"School"},{vraag:"City",antwoord:"Stad"}]
      }
    }
  };

  // STATE
  let activeCards = [];
  let originalCards = [];
  let wrongCards = [];
  let currentIndex = 0;
  let flipped = false;

  /* ---------- SIDEBAR OPEN/CLOSE ---------- */
  menuBtn.addEventListener("click", () => {
    sidebar.classList.add("open");
    overlay.classList.add("active");
    sidebar.setAttribute("aria-hidden", "false");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
    sidebar.setAttribute("aria-hidden", "true");
    // close all lists and restore main buttons
    dropdownContents.forEach(dc => dc.classList.add("hidden"));
    dropdownBtns.forEach(b => { b.style.display = "block"; });
    subContents.forEach(s => s.classList.add("hidden"));
  });

  /* ---------- MAIN DROPDOWN BEHAVIOUR ---------- */
  dropdownBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const content = dropdownContents.find(d => d.dataset.parent === id);
      if (!content) return;
      const isClosed = content.classList.contains("hidden");
      // close all
      dropdownContents.forEach(d => d.classList.add("hidden"));
      subContents.forEach(s => s.classList.add("hidden"));
      // toggle clicked
      if (isClosed) content.classList.remove("hidden");
      // visually hide other main buttons to focus
      dropdownBtns.forEach(b => {
        if (b !== btn) {
          b.style.display = "none";
          const other = dropdownContents.find(d => d.dataset.parent === b.dataset.id);
          if (other) other.style.display = "none";
        } else {
          b.style.display = "block";
          content.style.display = "";
        }
      });
    });
  });

  /* ---------- SUB-DROPDOWNS ---------- */
  subDropdownBtns.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      const parent = btn.nextElementSibling; // the .sub-content
      // close sibling sub-contents within same language area
      const parentBlock = btn.parentElement;
      parentBlock.querySelectorAll('.sub-content').forEach(sc => {
        if (sc !== parent) sc.classList.add('hidden');
      });
      parent.classList.toggle('hidden');
    });
  });

  /* ---------- START SET (sidebar + home) ---------- */
  function startSelected(lang, group, set) {
    if (!flashcardsData[lang] || !flashcardsData[lang][group] || !flashcardsData[lang][group][set]) {
      console.warn("Onbekende set:", lang, group, set);
      return;
    }
    originalCards = [...flashcardsData[lang][group][set]];
    activeCards = [...originalCards];
    wrongCards = [];
    currentIndex = 0;
    flipped = false;
    showFlashcards();
    loadCard();
  }

  // sidebar set buttons
  setButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      const group = btn.dataset.group;
      const set = btn.dataset.set;
      startSelected(lang, group, set);
      // close sidebar and restore
      sidebar.classList.remove("open");
      overlay.classList.remove("active");
      dropdownContents.forEach(dc => dc.classList.add("hidden"));
      dropdownBtns.forEach(b => b.style.display = "block");
      subContents.forEach(s => s.classList.add("hidden"));
      sidebar.setAttribute("aria-hidden", "true");
    });
  });

  // home menu buttons
  homeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      const group = btn.dataset.group;
      const set = btn.dataset.set;
      startSelected(lang, group, set);
    });
  });

  /* ---------- FLASHCARD BEHAVIOUR ---------- */
  flashcardEl.addEventListener("click", () => {
    if (!activeCards || activeCards.length === 0) return;
    flipped = !flipped;
    flashcardEl.classList.toggle("flipped", flipped);
    if (flipped) {
      cardBack.textContent = activeCards[currentIndex].antwoord;
    } else {
      cardBack.textContent = "";
    }
  });

  // keyboard flip
  flashcardEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      flashcardEl.click();
    }
  });

  correctBtn.addEventListener("click", () => {
    if (!activeCards || activeCards.length === 0) return;
    currentIndex++;
    if (currentIndex >= activeCards.length) showResults();
    else loadCard();
  });

  wrongBtn.addEventListener("click", () => {
    if (!activeCards || activeCards.length === 0) return;
    wrongCards.push(activeCards[currentIndex]);
    currentIndex++;
    if (currentIndex >= activeCards.length) showResults();
    else loadCard();
  });

  /* ---------- REPEAT BUTTONS ---------- */
  repeatWrongBtn.addEventListener("click", () => {
    if (wrongCards.length === 0) return;
    activeCards = [...wrongCards];
    originalCards = [...activeCards];
    wrongCards = [];
    currentIndex = 0;
    showFlashcards();
    loadCard();
  });

  repeatAllBtn.addEventListener("click", () => {
    if (!originalCards || originalCards.length === 0) return;
    activeCards = [...originalCards];
    wrongCards = [];
    currentIndex = 0;
    showFlashcards();
    loadCard();
  });

  // back to home
  if (backHome) {
    backHome.addEventListener("click", () => {
      quizSection.classList.add("hidden");
      resultSection.classList.add("hidden");
      homeSection.classList.remove("hidden");
    });
  }

  /* ---------- CORE FUNCTIONS ---------- */
  function loadCard() {
    if (!activeCards || activeCards.length === 0) {
      showResults();
      return;
    }
    if (currentIndex >= activeCards.length) {
      showResults();
      return;
    }
    const item = activeCards[currentIndex];
    cardFront.textContent = item.vraag;
    cardBack.textContent = "";
    flipped = false;
    flashcardEl.classList.remove("flipped");
    quizSection.classList.remove("hidden");
    resultSection.classList.add("hidden");
    repeatWrongBtn.classList.add("hidden");
    repeatAllBtn.classList.add("hidden");
    wrongList.innerHTML = "";
  }

  function showResults() {
    quizSection.classList.add("hidden");
    resultSection.classList.remove("hidden");
    wrongList.innerHTML = "";
    if (!wrongCards || wrongCards.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Alles juist! 🎉";
      wrongList.appendChild(li);
      repeatAllBtn.classList.remove("hidden");
      repeatWrongBtn.classList.add("hidden");
    } else {
      wrongCards.forEach(w => {
        const li = document.createElement("li");
        li.textContent = `${w.vraag} → ${w.antwoord}`;
        wrongList.appendChild(li);
      });
      repeatWrongBtn.classList.remove("hidden");
      repeatAllBtn.classList.remove("hidden");
    }
  }

  function showFlashcards() {
    homeSection.classList.add("hidden");
    resultSection.classList.add("hidden");
    quizSection.classList.remove("hidden");
  }

  // initial state
  quizSection.classList.add("hidden");
  resultSection.classList.add("hidden");
});
