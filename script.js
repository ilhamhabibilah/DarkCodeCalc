let display = document.getElementById('display');
let currentInput = '';

function appendNumber(number) {
  if (currentInput === '0' && number !== '.') {
    currentInput = number;
  } else {
    currentInput += number;
  }
  updateDisplay();
}

function appendOperator(operator) {
  if (currentInput === '') return;
  const lastChar = currentInput[currentInput.length - 1];
  if ('+-*/'.includes(lastChar)) {
    currentInput = currentInput.slice(0, -1) + operator;
  } else {
    currentInput += operator;
  }
  updateDisplay();
}

function clearDisplay() {
  currentInput = '';
  updateDisplay();
}

function calculateResult() {
  try {
    currentInput = eval(currentInput).toString();
  } catch {
    currentInput = 'Error';
  }
  updateDisplay();
}

function updateDisplay() {
  display.textContent = currentInput || '0';
}

// === MATRIX BACKGROUND EFFECT ===
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// Ukuran layar
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const chars = '01';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#39ff14';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 50);
