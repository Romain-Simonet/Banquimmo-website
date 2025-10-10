// ====================================================================
// 🚀 SCRIPT GLOBAL - BANQUIMMO
// Gère : 
//   - Le slider automatique des partenaires
//   - Le scroll manuel avec les flèches
//   - Le "shrink" du header au défilement
// ====================================================================

document.addEventListener("DOMContentLoaded", () => {

  // ================================================================
  // 🟦 SLIDER DES PARTENAIRES
  // ================================================================
  const slider = document.querySelector(".slider");
  const leftArrow = document.querySelector(".arrow.left");
  const rightArrow = document.querySelector(".arrow.right");
  const scrollStep = 300;
  let autoScroll; // référence pour setInterval

  if (slider && leftArrow && rightArrow) {

    // --- Défilement manuel ---
    rightArrow.addEventListener("click", () => {
      slider.scrollBy({ left: scrollStep, behavior: "smooth" });
    });

    leftArrow.addEventListener("click", () => {
      slider.scrollBy({ left: -scrollStep, behavior: "smooth" });
    });

    // --- Défilement automatique ---
    function startAutoScroll() {
      autoScroll = setInterval(() => {
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth) {
          slider.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          slider.scrollBy({ left: scrollStep, behavior: "smooth" });
        }
      }, 2500); // 2.5 secondes entre chaque mouvement
    }

    // --- Pause auto-scroll au survol ---
    slider.addEventListener("mouseenter", () => clearInterval(autoScroll));
    slider.addEventListener("mouseleave", startAutoScroll);

    // --- Lancer l’auto-scroll au chargement ---
    startAutoScroll();
  }

  // ================================================================
  // 🟨 HEADER "SHRINK" AU SCROLL
  // ================================================================
  const header = document.getElementById("main-header");

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("shrink");
      } else {
        header.classList.remove("shrink");
      }
    });
  }

});
