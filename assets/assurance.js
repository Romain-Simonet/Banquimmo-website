// assets/assurance.js
(() => {
  const IFRAME_SELECTOR = "#comp-07d93f3014124dae40b1a5bf49309f48";
  const init = () => (typeof iFrameResize === "function") && iFrameResize({}, IFRAME_SELECTOR);

  // Charger le plugin si absent
  if (typeof iFrameResize !== "function") {
    const s = document.createElement('script');
    s.src = "https://banquimmo.iframe.assurdistribution.fr/assets/js/plugins/iframeResizer/iframeResizer.min.js";
    s.async = true;
    s.onload = init;
    document.head.appendChild(s);
  } else {
    init();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
