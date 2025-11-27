// WOORDENLIJST - Bewaar de originele lijst apart om te kunnen herstarten
const origineleWoordenLijstData = [
    { frans: 'Bonjour', nederlands: 'Hallo' },
    { frans: 'Merci', nederlands: 'Bedankt' },
    { frans: 'Au revoir', nederlands: 'Tot ziens' },
    { frans: 'Pomme', nederlands: 'Appel' },
    { frans: 'Chien', nederlands: 'Hond' },
    { frans: 'Chat', nederlands: 'Kat' },
    { frans: 'Maison', nederlands: 'Huis' },
    { frans: 'Voiture', nederlands: 'Auto' },
    { frans: 'Fromage', nederlands: 'Kaas' },
    { frans: 'Parapluie', nederlands: 'Paraplu' },
];

let woordenLijst = []; // De actieve lijst die leegloopt tijdens de oefening
let huidigeKaartIndex;
let correctGeraden = 0;
let origineleLijstLengte = 0;

// Elementen uit de HTML halen
const cardElement = document.querySelector('.card');
const frontText = document.getElementById('card-front-text');
const backText = document.getElementById('card-back-text');
const correctCountEl = document.getElementById('correctCount');
const remainingCountEl = document.getElementById('remainingCount');
const controlsContainer = document.getElementById('controlsContainer');
const restartBtn = document.getElementById('restartBtn');


// Functie om de oefening te initialiseren of te herstarten
function restartExercise() {
    // Kopieer de originele data naar de actieve lijst
    woordenLijst = [...origineleWoordenLijstData];
    origineleLijstLengte = woordenLijst.length;
    correctGeraden = 0;
    
    // Toon de bedieningselementen en verberg de herstartknop
    controlsContainer.style.display = 'flex';
    restartBtn.style.display = 'none';

    toonWillekeurigeKaart();
}


// Functie om een willekeurige kaart te tonen
function toonWillekeurigeKaart() {
    // Check of er nog kaarten over zijn
    if (woordenLijst.length === 0) {
        frontText.textContent = "Klaar!";
        backText.textContent = "Alle woorden geoefend!";
        controlsContainer.style.display = 'none'; // Verberg knoppen
        restartBtn.style.display = 'block'; // Toon de herstartknop
        cardElement.classList.remove('flipped');
        updateProgress();
        return;
    }

    // Kies een willekeurige index uit de huidige lijst
    const randomIndex = Math.floor(Math.random() * woordenLijst.length);
    huidigeKaartIndex = randomIndex;
    const kaartData = woordenLijst[randomIndex];

    // Update de weergave van de kaart
    frontText.textContent = kaartData.frans;
    backText.textContent = kaartData.nederlands;
    
    // Zorg dat de kaart met de voorkant boven begint
    cardElement.classList.remove('flipped'); 
    updateProgress();
}

// Functie om de kaart om te draaien (gebruikt door de 'Omdraaien' knop of klikken)
function flipCard() {
    // Voeg een check toe zodat je niet kunt flippen als de oefening klaar is
    if (woordenLijst.length > 0) {
         cardElement.classList.toggle('flipped');
    }
}

// Functie voor als de kaart 'Juist' is
function handleCorrect() {
    if (woordenLijst.length === 0) return; // Voorkom actie als klaar
    // Verwijder de huidige kaart uit de lijst (splice verwijdert 1 element op de huidigeKaartIndex)
    woordenLijst.splice(huidigeKaartIndex, 1); 
    correctGeraden++;
    toonWillekeurigeKaart(); // Toon direct de volgende willekeurige kaart
}

// Functie voor als de kaart 'Fout' is
function handleIncorrect() {
     if (woordenLijst.length === 0) return; // Voorkom actie als klaar
    // De kaart blijft in de woordenLijst zitten, dus we tonen gewoon de volgende willekeurige kaart
    toonWillekeurigeKaart();
    // Optioneel: je kunt hier logica toevoegen om foute kaarten later vaker te laten terugkomen
}

// Functie om de voortgang bij te werken
function updateProgress() {
    correctCountEl.textContent = correctGeraden;
    // Het aantal resterende kaarten is de huidige lengte van de dynamische lijst
    remainingCountEl.textContent = woordenLijst.length; 
}


// Start de oefening wanneer de pagina geladen is
document.addEventListener('DOMContentLoaded', restartExercise);
