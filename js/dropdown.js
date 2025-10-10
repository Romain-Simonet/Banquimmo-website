document.querySelectorAll(".dropdown > a").forEach(button => {
    button.addEventListener("click", e => {
      e.preventDefault(); // évite le lien direct
      const parent = button.parentElement;

      // Ferme les autres menus
      document.querySelectorAll(".dropdown").forEach(drop => {
        if (drop !== parent) drop.classList.remove("active");
      });

      // Bascule l'état du menu cliqué
      parent.classList.toggle("active");
    });
  });
