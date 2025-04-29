// import { generate } from "random-words";

const words = [
  "JABŁKO", "SAMOCHÓD", "ZEGAREK", "KWIATEK", "KOMPUTER", "PROGRAM", "SZKOŁA", "OKULARY", "SŁOWNIK", "PIŁKA",
  "DRUKARKA", "GITARA", "KSIĄŻKA", "LATAWIEC", "TORNISTER", "TELEFON", "PILOTKA", "BIBLIOTEKA", "ZESZYT", "POJAZD",
  "ZABAWEK", "SŁONECZKO", "KALKULATOR", "LAMPA", "POMIDOR", "OGÓREK", "TRUSKAWKA", "WANILIA", "CIĘŻARÓWKA", "FOTELIK",
  "EKRANIK", "PĘDZEL", "BASENIK", "LUSTRO", "GŁOŚNIK", "MALOWANKA", "KREDKI", "ZAMRAŻARKA", "ŻYRANDOL", "WIRUS",
  "KALENDARZ", "NOTATNIK", "GARNITUR", "CHOINKA", "PODUSZKA", "PRZYJACIEL", "WIATR", "WIATRACZEK", "APARAT", "KUCHNIA",
  "SMAKOWITY", "BATERIA", "ZAKŁADKA", "TELEWIZOR", "PRZYCISK", "ŁADOWARKA", "ODKURZACZ", "BAWÓŁ", "LUSTERKO", "DZIECKO",
  "MIŚZCZ", "PĘDZIDEŁKO", "KSIĘŻYC", "GWIAZDA", "ROWEREK", "KOMPAS", "INTERNET", "ZADANIE", "PIESZCZOCH", "NAUCZYCIEL",
  "FOTOGRAF", "KAMERA", "TABLICA", "KREDENS", "ŁÓŻECZKO", "CHODNIK", "TĘCZA", "DZBANKI", "RĘKAWICA", "BAGIETKA",
  "ZBIORNIK", "TORNADO", "PRZEJŚCIE", "WIADOMOŚĆ", "SKLEPIK", "NARZĘDZIA", "PODRĘCZNIK", "MYSZKA", "GAŁĄZKA", "GROSZEK",
  "KAPELUSZ", "PORTFEL", "KUBECZEK", "WĘDLINA", "ZEGARMISTRZ", "PIERNIK", "CZYTNIK", "ZAMKNIĘCIE", "WĘGIEL", "FOTOGRAFIA"
];

const alphabet = "AĄBCĆDEĘFGHIJKLŁMNŃOÓPRSŚTUVWXYZŹŻ";

let word = "";
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrong = 6;

const canvas = document.getElementById("hangman-canvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 300;

function startGame() {
  word = words[Math.floor(Math.random() * words.length)];
  // word = generate();
  guessedLetters = [];
  wrongGuesses = 0;
  drawCanvas();
  createWordDisplay();
  createKeyboard();
  setMessage("");
  saveState();
}

function cancelGame() {
  localStorage.removeItem("hangman-state");
  location.reload();
}

function createWordDisplay() {
  const container = document.getElementById("word-container");
  container.innerHTML = "";
  for (const letter of word) {
    const box = document.createElement("div");
    box.className = "letter-box";
    box.textContent = guessedLetters.includes(letter) ? letter : "";
    container.appendChild(box);
  }
}

function createKeyboard() {
  const keyboard = document.getElementById("keyboard");
  keyboard.innerHTML = "";
  for (const letter of alphabet) {
    const btn = document.createElement("button");
    btn.textContent = letter;
    btn.className = "key";
    if (guessedLetters.includes(letter)) {
      btn.classList.add("used");
      btn.disabled = true;
    }
    btn.onclick = () => handleGuess(letter);
    keyboard.appendChild(btn);
  }
}

function handleGuess(letter) {
  if (guessedLetters.includes(letter)) return;
  guessedLetters.push(letter);

  if (word.includes(letter)) {
    createWordDisplay();
    if (isWin()) {
      setMessage("Gratulacje! Wygrałeś!");
      endGame();
    }
  } else {
    wrongGuesses++;
    drawCanvas();
    if (wrongGuesses >= maxWrong) {
      setMessage("Przegrana! Hasło: " + word);
      endGame();
    }
  }
  createKeyboard();
  saveState();
}

function isWin() {
  return [...word].every(letter => guessedLetters.includes(letter));
}

function drawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;
  // szubienica
  ctx.beginPath();
  ctx.moveTo(50, 250);
  ctx.lineTo(200, 250);
  ctx.moveTo(100, 250);
  ctx.lineTo(100, 50);
  ctx.lineTo(200, 50);
  ctx.lineTo(200, 80);
  ctx.stroke();

  if (wrongGuesses > 0) { // głowa
    ctx.beginPath();
    ctx.arc(200, 100, 20, 0, Math.PI * 2);
    ctx.stroke();
  }
  if (wrongGuesses > 1) { // tułów
    ctx.beginPath();
    ctx.moveTo(200, 120);
    ctx.lineTo(200, 180);
    ctx.stroke();
  }
  if (wrongGuesses > 2) { // lewa ręka
    ctx.beginPath();
    ctx.moveTo(200, 140);
    ctx.lineTo(170, 160);
    ctx.stroke();
  }
  if (wrongGuesses > 3) { // prawa ręka
    ctx.beginPath();
    ctx.moveTo(200, 140);
    ctx.lineTo(230, 160);
    ctx.stroke();
  }
  if (wrongGuesses > 4) { // lewa noga
    ctx.beginPath();
    ctx.moveTo(200, 180);
    ctx.lineTo(170, 210);
    ctx.stroke();
  }
  if (wrongGuesses > 5) { // prawa noga
    ctx.beginPath();
    ctx.moveTo(200, 180);
    ctx.lineTo(230, 210);
    ctx.stroke();
  }
}

function setMessage(msg) {
  document.getElementById("message").textContent = msg;
}

function endGame() {
  const keys = document.querySelectorAll(".key");
  keys.forEach(key => key.disabled = true);
  localStorage.removeItem("hangman-state");
}

function saveState() {
  const state = {
    word,
    guessedLetters,
    wrongGuesses
  };
  localStorage.setItem("hangman-state", JSON.stringify(state));
}

function loadState() {
  const state = JSON.parse(localStorage.getItem("hangman-state"));
  if (state) {
    word = state.word;
    guessedLetters = state.guessedLetters;
    wrongGuesses = state.wrongGuesses;
    drawCanvas();
    createWordDisplay();
    createKeyboard();
    if (isWin()) setMessage("Gratulacje! Wygrałeś!");
    else if (wrongGuesses >= maxWrong) setMessage("Przegrana! Hasło: " + word);
  } else {
    startGame();
  }
}

window.onload = loadState;
