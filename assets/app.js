// assets/app.js
(() => {
  const ready = (fn) =>
    (document.readyState === "loading") ? document.addEventListener("DOMContentLoaded", fn) : fn();

  ready(() => {
    // Icônes Lucide (si présentes)
    if (window.lucide) window.lucide.createIcons();

    // Menu mobile
    const btn = document.getElementById('menuBtn');
    const menu = document.getElementById('mobileMenu');
    if (btn && menu) {
      btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
        const icon = btn.querySelector('i, svg');
        if (icon?.setAttribute) {
          icon.setAttribute('data-lucide', menu.classList.contains('hidden') ? 'menu' : 'x');
          if (window.lucide) window.lucide.createIcons();
        }
      });
      menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.add('hidden')));
    }

    // Année / MAJ
    const y = document.getElementById('year');
    if (y) y.textContent = new Date().getFullYear();
    const maj = document.getElementById('maj');
    if (maj) maj.textContent = new Date().toLocaleDateString('fr-FR');

    // ===== Cookie bar robuste =====
    const KEY = 'banquimmo_cookie_ok';
    const $bar = document.getElementById('cookie');
    const $accept = document.getElementById('cookieAccept');

    const hasConsent = () => {
      try { if (localStorage.getItem(KEY) === '1') return true; } catch {}
      return document.cookie.split('; ').some(c => c.startsWith(`${KEY}=1`));
    };

    const setConsent = () => {
      try { localStorage.setItem(KEY, '1'); } catch {}
      const exp = new Date(Date.now() + 180 * 24*60*60*1000).toUTCString(); // 180 jours
      document.cookie = `${KEY}=1; expires=${exp}; path=/; SameSite=Lax`;
    };

    const show = () => { if ($bar) $bar.classList.remove('hidden'); };
    const hide = () => { if ($bar) $bar.classList.add('hidden'); };

    if ($bar && $accept) {
      if (!hasConsent()) show();
      $accept.addEventListener('click', () => { setConsent(); hide(); });

      // Accessibilité : fermer au ESC (optionnel)
      $bar.addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(); });
    }

    // Petit utilitaire debug dans la console si besoin :
    window.__cookie_debug = {
      clear() { try { localStorage.removeItem(KEY); } catch{} document.cookie = `${KEY}=; Max-Age=0; path=/`; show(); },
      status() { return { localStorage: (()=>{try{return localStorage.getItem(KEY)}catch{return 'err'}})(), cookie: document.cookie }; }
    };
  });
})();

document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = document.getElementById("contactSubmit");
    const status = document.getElementById("contactStatus");

    submitBtn.disabled = true;
    submitBtn.textContent = "Envoi en cours...";

    const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form)
    });

    submitBtn.disabled = false;
    submitBtn.textContent = "Envoyer ma demande";

    if (response.ok) {
        status.classList.remove("hidden");
        status.textContent = "Message envoyé avec succès !";
        status.style.color = "green";
        form.reset();
    } else {
        status.classList.remove("hidden");
        status.textContent = "Erreur lors de l'envoi du message.";
        status.style.color = "red";
    }
});
