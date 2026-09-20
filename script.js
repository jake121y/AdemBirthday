const photoNames = Array.from({ length: 40 }, (_, i) => `photos/photo${i + 1}.jpg`);
const gallery = document.getElementById("gallery");

photoNames.forEach((src, index) => {
  const slot = document.createElement("div");
  slot.className = "photo-slot";

  const img = document.createElement("img");
  img.src = src;
  img.alt = `Adem memory ${index + 1}`;
  img.loading = "lazy";
  img.onclick = () => openLightbox(src, `Memory ${index + 1}`);

  const placeholder = document.createElement("div");
  placeholder.className = "placeholder";
  placeholder.innerHTML = `
    <span class="number">📷 ${index + 1}</span>
    <strong>Add photo ${index + 1}</strong>
    <span>Put your picture in the photos folder.</span>
  `;

  img.onerror = () => {
    img.style.display = "none";
    slot.appendChild(placeholder);
  };

  slot.appendChild(img);
  gallery.appendChild(slot);
});

function startCelebration() {
  document.querySelector(".message").scrollIntoView({ behavior: "smooth" });
  launchConfetti(100);
}

function blowCandles() {
  const cake = document.querySelector(".cake");
  const result = document.getElementById("wishResult");

  cake.style.transform = "scale(1.18) rotate(-4deg)";
  result.textContent = "🎉 May your wish come true, Adem! 🎉";
  launchConfetti(180);

  setTimeout(() => cake.style.transform = "scale(1)", 650);
}

function openLightbox(src, caption) {
  const lightbox = document.getElementById("lightbox");
  document.getElementById("lightboxImage").src = src;
  document.getElementById("lightboxCaption").textContent = caption;
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox(event) {
  if (event && event.target && event.target.id === "lightboxImage") return;
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
});

function goToFinalPage() {
  window.location.href = "final.html";
}

function launchConfetti(amount = 100) {
  const pieces = ["🎉", "✨", "🎈", "⭐", "💜", "💗", "💛", "🥳"];

  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.textContent = pieces[Math.floor(Math.random() * pieces.length)];
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.fontSize = (12 + Math.random() * 16) + "px";
    piece.style.animationDuration = (2.5 + Math.random() * 3.5) + "s";
    piece.style.animationDelay = Math.random() * .8 + "s";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 7000);
  }
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: .12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

window.addEventListener("load", () => {
  setTimeout(() => launchConfetti(55), 400);
});
