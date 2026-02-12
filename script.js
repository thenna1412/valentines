const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");
const heartsContainer = document.querySelector(".hearts");
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

/* Move NO Button */
noBtn.addEventListener("mouseover", () => {
  const newX = Math.random() * 300;
  const newY = Math.random() * 250;

  noBtn.style.position = "relative";
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
});

/* YES Button */
yesBtn.addEventListener("click", () => {
  questionContainer.style.display = "none";
  heartLoader.style.display = "block";

  setTimeout(() => {
    heartLoader.style.display = "none";
    resultContainer.style.display = "block";
    gifResult.play();
    launchFireworks();
  }, 3000);
});

/* Hearts */
let heartCount = 0;
const maxHearts = 10;

function createHeart() {
  if (heartCount >= maxHearts) return;

  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "💖";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 15 + 15 + "px";
  heart.style.animationDuration = Math.random() * 6 + 6 + "s";

  heart.addEventListener("click", () => {
    heart.classList.add("burst");
    setTimeout(() => {
      heart.remove();
      heartCount--;
    }, 500);
  });

  heartsContainer.appendChild(heart);
  heartCount++;

  setTimeout(() => {
    if (heart.parentNode) {
      heart.remove();
      heartCount--;
    }
  }, 9000);
}

setInterval(createHeart, 1200);

/* Name Hearts */
function createNameHearts() {
  // const text = "Divya ❤️";

  for (let i = 0; i < text.length; i++) {
    const letter = document.createElement("div");
    letter.classList.add("heart");
    letter.innerHTML = text[i];

    letter.style.left = 30 + i * 5 + "vw";
    letter.style.top = "40vh";
    letter.style.fontSize = "30px";
    letter.style.animation = "none";

    heartsContainer.appendChild(letter);

    setTimeout(() => {
      letter.remove();
    }, 4000);
  }
}

setTimeout(createNameHearts, 3000);

/* Fireworks */
function launchFireworks() {
  for (let i = 0; i < 120; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: 2,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      speedX: (Math.random() - 0.5) * 10,
      speedY: (Math.random() - 0.5) * 10,
      alpha: 1
    });
  }
  animateFireworks();
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;
    p.alpha -= 0.02;

    if (p.alpha <= 0) {
      particles.splice(index, 1);
    }
  });

  if (particles.length > 0) {
    requestAnimationFrame(animateFireworks);
  }
}

/* Countdown */
const countdown = document.getElementById("countdown");
const weddingDate = new Date("April 30, 2026 00:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const gap = weddingDate - now;

  const days = Math.floor(gap / (1000 * 60 * 60 * 24));
  const hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  countdown.innerHTML =
    `🚨 Countdown to becoming my wife: <b>${days}</b> days and <b>${hours}</b> hours 😍💍<br>`
}, 1000);
