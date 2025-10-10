// --- Menu Burger ---
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobile-menu");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// --- Sous-menus mobiles ---
const dropdowns = document.querySelectorAll(".dropdown-mobile > a");

dropdowns.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const parent = link.parentElement;
    parent.classList.toggle("open");
  });
});