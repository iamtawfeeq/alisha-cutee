// ==========================================================================
// Urdu Poetry Database
// ==========================================================================
const poems = [
  {
    urdu: "تم مسکراؤ تو موسم بھی خوبصورت لگتا ہے",
    trans: "When you smile, even the seasons seem beautiful.",
    author: "Dedicated to Alisha ♡"
  },
  {
    urdu: "تم ہو تو ہر خواب حسین لگتا ہے ، ورنہ زندگی میں ایک ادھورا سا قصہ ہے",
    trans: "With you, every dream feels enchanting; without you, life is but an incomplete tale.",
    author: "Dedicated to Alisha ♡"
  },
  {
    urdu: "تیرے چہرے کی چمک چاند کو شرماتی ہے ، تیری باتوں میں سکونِ قلب کی راحت ہے",
    trans: "The radiance of your grace shames the moon, and your words bring pure solace to the heart.",
    author: "Dedicated to Alisha ♡"
  },
  {
    urdu: "دعا ہے رب سے کہ ہر خوشی تیرے قدم چومے ، تیرے دامن میں ہمیشہ سکون کی خوشبو ہو",
    trans: "My prayer to the Lord is that joy kisses your footsteps, and peace ever perfumes your days.",
    author: "Dedicated to Alisha ♡"
  },
  {
    urdu: "ستاروں سے بھری رات بھی تیری مسکراہٹ کے آگے مدہم ہے",
    trans: "Even a starlit night dims before the gentle light of your smile.",
    author: "Dedicated to Alisha ♡"
  }
];

let currentPoemIndex = 0;
let ameenCount = 0;

// ==========================================================================
// Initialization
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initPetals();
  initEnvelope();
  initCarouselDots();
  renderPoem();
});

// ==========================================================================
// Envelope Interaction
// ==========================================================================
function initEnvelope() {
  const waxSeal = document.getElementById("waxSeal");
  const letterPreview = document.getElementById("letterPreview");
  const complimentSection = document.getElementById("complimentSection");

  if (waxSeal && letterPreview) {
    letterPreview.addEventListener("click", () => {
      letterPreview.classList.add("hidden");
      complimentSection.classList.remove("hidden");
      createCelebrationPetals();
    });
  }
}

function enterWebsite() {
  const overlay = document.getElementById("welcomeOverlay");
  if (overlay) {
    overlay.classList.add("fade-out");
  }
}

// ==========================================================================
// Shayari Carousel
// ==========================================================================
function initCarouselDots() {
  const dotsContainer = document.getElementById("carouselDots");
  if (!dotsContainer) return;
  dotsContainer.innerHTML = "";

  poems.forEach((_, idx) => {
    const dot = document.createElement("div");
    dot.className = `dot ${idx === currentPoemIndex ? "active" : ""}`;
    dot.onclick = () => goToPoem(idx);
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  const dots = document.querySelectorAll(".carousel-dots .dot");
  dots.forEach((dot, idx) => {
    if (idx === currentPoemIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function renderPoem() {
  const urduEl = document.getElementById("poemUrdu");
  const transEl = document.getElementById("poemTrans");
  const authorEl = document.getElementById("poemAuthor");

  if (!urduEl || !transEl) return;

  urduEl.style.opacity = 0;
  transEl.style.opacity = 0;

  setTimeout(() => {
    urduEl.innerText = poems[currentPoemIndex].urdu;
    transEl.innerText = `"${poems[currentPoemIndex].trans}"`;
    if (authorEl) authorEl.innerText = `— ${poems[currentPoemIndex].author}`;

    urduEl.style.opacity = 1;
    transEl.style.opacity = 1;
  }, 200);

  updateDots();
}

function nextPoem() {
  currentPoemIndex = (currentPoemIndex + 1) % poems.length;
  renderPoem();
}

function prevPoem() {
  currentPoemIndex = (currentPoemIndex - 1 + poems.length) % poems.length;
  renderPoem();
}

function goToPoem(idx) {
  currentPoemIndex = idx;
  renderPoem();
}

function copyCurrentPoem() {
  const poem = poems[currentPoemIndex];
  const text = `${poem.urdu}\n${poem.trans}\n\n— Dedicated to Alisha ♡`;

  navigator.clipboard.writeText(text).then(() => {
    showToast("Urdu Shayari copied to clipboard! ♡");
  }).catch(() => {
    showToast("Copied! ♡");
  });
}

function showToast(msg) {
  const toast = document.getElementById("toastNotify");
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

// ==========================================================================
// Lightbox Gallery
// ==========================================================================
function openLightbox(src, caption) {
  const modal = document.getElementById("lightboxModal");
  const img = document.getElementById("lightboxImg");
  const cap = document.getElementById("lightboxCaption");

  if (modal && img) {
    img.src = src;
    cap.innerText = caption || "Alisha ♡";
    modal.classList.add("active");
  }
}

function closeLightbox(e) {
  const modal = document.getElementById("lightboxModal");
  if (modal) {
    modal.classList.remove("active");
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// ==========================================================================
// Send Ameen Interactive Effect
// ==========================================================================
function sendAmeen() {
  ameenCount++;
  const countEl = document.getElementById("ameenCount");
  if (countEl) countEl.innerText = ameenCount;

  // Floating heart particles
  for (let i = 0; i < 4; i++) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    const icons = ["♡", "♥", "☾", "✨"];
    heart.innerText = icons[Math.floor(Math.random() * icons.length)];
    heart.style.left = `${50 + (Math.random() * 20 - 10)}%`;
    heart.style.bottom = "20%";
    heart.style.animationDuration = `${1.2 + Math.random() * 0.8}s`;
    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 2000);
  }

  showToast("Ameen! May Allah accept every prayer. ♡");
}

// ==========================================================================
// Ambient Falling Rose Petals Canvas
// ==========================================================================
function initPetals() {
  const canvas = document.getElementById("petals-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const petalsCount = 28;
  const petals = [];

  for (let i = 0; i < petalsCount; i++) {
    petals.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: Math.random() * 1 - 0.5,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 1.5 - 0.75,
      opacity: Math.random() * 0.5 + 0.3,
      color: Math.random() > 0.3 ? "#f472b6" : "#fbcfe8"
    });
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    petals.forEach((p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      // Draw rose petal curve
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, 0, 0, p.size);
      ctx.bezierCurveTo(-p.size, 0, -p.size / 2, -p.size / 2, 0, 0);
      ctx.fill();

      ctx.restore();

      p.y += p.speedY;
      p.x += Math.sin(p.y * 0.01) + p.speedX;
      p.rotation += p.rotSpeed;

      if (p.y > h + 20) {
        p.y = -20;
        p.x = Math.random() * w;
      }
      if (p.x > w + 20) p.x = -20;
      if (p.x < -20) p.x = w + 20;
    });

    requestAnimationFrame(draw);
  }

  draw();
}

function createCelebrationPetals() {
  for (let i = 0; i < 8; i++) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.innerText = "🌸";
    heart.style.left = `${30 + Math.random() * 40}%`;
    heart.style.bottom = "40%";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1800);
  }
}
