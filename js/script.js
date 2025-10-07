const slider = document.querySelector(".slider");
const leftArrow = document.querySelector(".arrow.left");
const rightArrow = document.querySelector(".arrow.right");

const scrollStep = 300;
let autoScroll; // pour gérer l'auto défilement

// --- CLIC SUR LES FLECHES ---
rightArrow.addEventListener("click", () => {
  slider.scrollBy({ left: scrollStep, behavior: "smooth" });
});

leftArrow.addEventListener("click", () => {
  slider.scrollBy({ left: -scrollStep, behavior: "smooth" });
});

// --- AUTO-DEFILEMENT ---
function startAutoScroll() {
  autoScroll = setInterval(() => {
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
      slider.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      slider.scrollBy({ left: scrollStep, behavior: "smooth" });
    }
  }, 3000);
}

// --- Stop auto scroll au survol (meilleur UX) ---
slider.addEventListener("mouseenter", () => clearInterval(autoScroll));
slider.addEventListener("mouseleave", startAutoScroll);

// --- Lancer ---
startAutoScroll();
