/**
 * Happy Birthday Mummy & Happy Teacher's Day!
 * Interactive Features, Audio Controller, Lightbox, Cake Animations & Falling Petals
 */

// --- 1. PHOTO DATA & NOTES ---
const galleryData = [
  {
    src: "WhatsApp Image 2026-09-03 at 16.13.27.jpeg",
    tag: "Inspiring Educator & Guru 👩‍🏫",
    title: "Grace, Wisdom & Dedication",
    description:
      "Standing gracefully at school in Harda, illuminating the lives of countless children! You don't merely teach subjects from textbooks; you impart integrity, values, compassion, and courage to every child who crosses your path. Seeing you so respected and honored as a teacher fills my heart with immense pride. Happy Teacher's Day to the most dedicated mentor in the universe!",
    quote: "“A good teacher can inspire hope, ignite the imagination, and instill a love of learning. You do that every single day.”",
    likes: 184
  },
  {
    src: "WhatsApp Image 2026-09-03 at 16.13.28 (1).jpeg",
    tag: "My Pillar & Best Friend 👭",
    title: "Standing Next to My Sunshine",
    description:
      "Standing next to you with our matching smiles is where I feel most cherished and secure. You understand my unspoken thoughts, calm my anxieties with a single touch, and believe in my dreams even before I believe in them myself. Thank you for being the sweetest confidante, greatest cheerleader, and purest blessing in my life.",
    quote: "“No matter how old I grow, holding your hand and seeing you smile will always be my happiest place.”",
    likes: 245
  },
  {
    src: "WhatsApp Image 2026-09-03 at 16.13.28.jpeg",
    tag: "The Light of Our World: MOM ✨",
    title: "The Radiant Heart of Our Home",
    description:
      "This photograph captures your pure warmth in front of the illuminated 'MOM' tree! You truly are the glowing light in our family, bringing cheer, endless patience, and elegance everywhere you step. May your life be filled with as much sparkle, radiant health, and delight as you bring to everyone around you!",
    quote: "“MOM: Made Of Magic. You brighten every single corner of our world.”",
    likes: 210
  }
];

let currentPhotoIndex = 0;
let candlesAreBlown = false;
let isCakeCut = false;
let loveCount = 108;

// --- 2. AUDIO PLAYBACK CONTROLLER ---
const bgAudio = document.getElementById("bgMusic");
const vinylDisc = document.getElementById("vinylDisc");
const musicStatusText = document.getElementById("musicStatusText");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");
const welcomeOverlay = document.getElementById("welcomeOverlay");
const btnEnter = document.getElementById("btnEnter");
const musicPill = document.getElementById("musicPill");
const musicToggleBtn = document.getElementById("musicToggleBtn");

function playAudio() {
  if (!bgAudio) return;
  bgAudio.play()
    .then(() => {
      vinylDisc.classList.add("spinning");
      musicStatusText.textContent = "Playing Melody 🎶";
      playIcon.style.display = "none";
      pauseIcon.style.display = "block";
    })
    .catch((err) => {
      console.warn("Audio autoplay blocked or format pending interaction:", err);
      musicStatusText.textContent = "Click to Play 🎵";
    });
}

function pauseAudio() {
  if (!bgAudio) return;
  bgAudio.pause();
  vinylDisc.classList.remove("spinning");
  musicStatusText.textContent = "Paused ⏸️";
  playIcon.style.display = "block";
  pauseIcon.style.display = "none";
}

function toggleAudio(e) {
  if (e) e.stopPropagation();
  if (bgAudio.paused) {
    playAudio();
  } else {
    pauseAudio();
  }
}

musicPill.addEventListener("click", toggleAudio);
musicToggleBtn.addEventListener("click", toggleAudio);

// Welcome Modal Enter Button
btnEnter.addEventListener("click", () => {
  welcomeOverlay.classList.add("hidden");
  playAudio();
  playSynthesizedCelebrationChime();
  fireConfettiBurst();
});

// --- 3. SYNTHESIZED SOUND EFFECTS (Zero dependency Web Audio API) ---
function playSynthesizedCelebrationChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.85);
    });
  } catch (e) {
    // AudioContext not allowed or supported
  }
}

// --- 4. CONFETTI & FIREWORKS (With Offline Graceful Fallback) ---
function fireConfettiBurst() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#c94b6d', '#f77f9e', '#d4af37', '#ffffff', '#ffccd5']
    });
  } else {
    fallbackConfetti(30);
  }
}

function fireHugeCelebration() {
  if (typeof confetti === "function") {
    const duration = 2.8 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#c94b6d', '#d4af37', '#ffffff', '#ff85a1']
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#c94b6d', '#d4af37', '#ffffff', '#ff85a1']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  } else {
    fallbackConfetti(80);
  }
}

function fallbackConfetti(count) {
  const colors = ['#c94b6d', '#d4af37', '#ffffff', '#ff85a1', '#70d6ff', '#ffd166'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.style.position = "fixed";
    el.style.zIndex = "9999";
    el.style.left = Math.random() * 100 + "vw";
    el.style.top = "-10px";
    el.style.width = Math.random() * 10 + 6 + "px";
    el.style.height = Math.random() * 8 + 6 + "px";
    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    el.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    el.style.pointerEvents = "none";
    el.style.transition = `transform ${Math.random() * 2 + 1.5}s ease-out, opacity 2s ease-out`;
    document.body.appendChild(el);

    requestAnimationFrame(() => {
      el.style.transform = `translate(${(Math.random() - 0.5) * 120}px, ${window.innerHeight + 50}px) rotate(${Math.random() * 720}deg)`;
      el.style.opacity = "0";
    });

    setTimeout(() => el.remove(), 2500);
  }
}

// --- 5. INTERACTIVE CAKE ACTIONS ---
const btnBlowCandles = document.getElementById("btnBlowCandles");
const btnCutCake = document.getElementById("btnCutCake");
const btnThrowConfetti = document.getElementById("btnThrowConfetti");
const blowText = document.getElementById("blowText");
const cutText = document.getElementById("cutText");
const cakeStatusMsg = document.getElementById("cakeStatusMsg");
const interactiveCake = document.querySelector(".interactive-cake");

btnBlowCandles.addEventListener("click", () => {
  const flames = document.querySelectorAll(".flame");
  const smokes = document.querySelectorAll(".smoke");

  if (!candlesAreBlown) {
    // Blow out
    flames.forEach(f => f.classList.add("blown-out"));
    smokes.forEach(s => {
      s.classList.remove("active");
      void s.offsetWidth; // trigger reflow
      s.classList.add("active");
    });
    candlesAreBlown = true;
    blowText.textContent = "Re-light Candles ✨";
    cakeStatusMsg.textContent = "🎉 Yay! Happy Birthday Mummy! Your wishes are on their way to the stars! 🌟";
    playSynthesizedCelebrationChime();
    fireHugeCelebration();
  } else {
    // Re-light
    flames.forEach(f => f.classList.remove("blown-out"));
    smokes.forEach(s => s.classList.remove("active"));
    candlesAreBlown = false;
    blowText.textContent = "Blow the Candles!";
    cakeStatusMsg.textContent = "✨ The candles are burning bright again! Make another wish! ✨";
    fireConfettiBurst();
  }
});

btnCutCake.addEventListener("click", () => {
  if (!isCakeCut) {
    interactiveCake.classList.add("sliced");
    isCakeCut = true;
    cutText.textContent = "Cake Served! 🍰";
    cakeStatusMsg.textContent = "🎂 Delicious! A sweet slice of love for the sweetest Mummy & Teacher!";
    playSynthesizedCelebrationChime();
    fireHugeCelebration();
  } else {
    cakeStatusMsg.textContent = "✨ Unlimited cake for Mummy today! Celebrate with all your heart! 💖";
    fireConfettiBurst();
  }
});

btnThrowConfetti.addEventListener("click", () => {
  fireHugeCelebration();
  cakeStatusMsg.textContent = "🎆 Double celebration fireworks for Mummy's Birthday & Teacher's Day!";
});

// --- 6. LOVE COUNTER & FLOATING HEARTS ---
const btnSendLove = document.getElementById("btnSendLove");
const loveCountEl = document.getElementById("loveCount");
const floatingHeartsContainer = document.getElementById("floatingHeartsContainer");

btnSendLove.addEventListener("click", (e) => {
  loveCount += 1;
  loveCountEl.textContent = loveCount;
  btnSendLove.style.transform = "scale(0.96)";
  setTimeout(() => { btnSendLove.style.transform = ""; }, 150);

  // Spawn floating hearts
  for (let i = 0; i < 4; i++) {
    createFloatingHeart();
  }
  fireConfettiBurst();
});

function createFloatingHeart() {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  const heartIcons = ["❤️", "💖", "🌸", "💕", "✨", "🥰", "🌷"];
  heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];

  const randomX = (Math.random() - 0.5) * 160;
  heart.style.setProperty("--tx", `${randomX}px`);
  heart.style.left = `calc(50% + ${(Math.random() - 0.5) * 60}px)`;
  heart.style.bottom = "20px";

  floatingHeartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1800);
}

// --- 7. LIGHTBOX MODAL FOR PHOTOS & NOTES ---
const lightboxModal = document.getElementById("lightboxModal");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTag = document.getElementById("lightboxTag");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxText = document.getElementById("lightboxText");
const lightboxQuote = document.getElementById("lightboxQuote");
const photoCounter = document.getElementById("photoCounter");
const photoLikeCount = document.getElementById("photoLikeCount");

function openLightbox(index) {
  currentPhotoIndex = index;
  updateLightboxContent();
  lightboxModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightboxModal.classList.remove("active");
  document.body.style.overflow = "";
}

function navigateLightbox(direction) {
  currentPhotoIndex = (currentPhotoIndex + direction + galleryData.length) % galleryData.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const item = galleryData[currentPhotoIndex];
  lightboxImage.src = item.src;
  lightboxImage.alt = item.title;
  lightboxTag.textContent = item.tag;
  lightboxTitle.textContent = item.title;
  lightboxText.textContent = item.description;
  lightboxQuote.textContent = item.quote;
  photoCounter.textContent = `${currentPhotoIndex + 1} / ${galleryData.length}`;
  photoLikeCount.textContent = `❤️ ${item.likes} Loves`;
}

function likeCurrentPhoto() {
  galleryData[currentPhotoIndex].likes += 1;
  photoLikeCount.textContent = `❤️ ${galleryData[currentPhotoIndex].likes} Loves`;
  fireConfettiBurst();
}

// Keyboard navigation
window.addEventListener("keydown", (e) => {
  if (!lightboxModal.classList.contains("active")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") navigateLightbox(-1);
  if (e.key === "ArrowRight") navigateLightbox(1);
});

// Navigation scroll helper
function scrollToSection(sectionId) {
  const target = document.getElementById(sectionId);
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
}

// Highlight active nav item on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll(".page-section");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSection = "";
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) {
      currentSection = sec.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("data-target") === currentSection) {
      link.classList.add("active");
    }
  });
});

// --- 8. FALLING ROSE PETALS BACKGROUND CANVAS ---
(function initPetalsCanvas() {
  const canvas = document.getElementById("petalsCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const petalsCount = 28;
  const petals = [];

  const petalColors = [
    "rgba(255, 182, 193, 0.45)",
    "rgba(244, 143, 177, 0.4)",
    "rgba(240, 98, 146, 0.35)",
    "rgba(255, 209, 220, 0.5)"
  ];

  for (let i = 0; i < petalsCount; i++) {
    petals.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 9 + 8,
      speedX: Math.random() * 1.5 - 0.75,
      speedY: Math.random() * 1.2 + 0.8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.025,
      color: petalColors[Math.floor(Math.random() * petalColors.length)]
    });
  }

  function drawPetal(petal) {
    ctx.save();
    ctx.translate(petal.x, petal.y);
    ctx.rotate(petal.rotation);
    ctx.fillStyle = petal.color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(petal.size / 2, -petal.size / 2, petal.size, 0, 0, petal.size * 1.3);
    ctx.bezierCurveTo(-petal.size, 0, -petal.size / 2, -petal.size / 2, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  function animatePetals() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;

      if (p.y > height + 20) {
        p.y = -20;
        p.x = Math.random() * width;
      }
      if (p.x > width + 20) p.x = -20;
      if (p.x < -20) p.x = width + 20;

      drawPetal(p);
    }

    requestAnimationFrame(animatePetals);
  }

  animatePetals();
})();
