// assets/simulateur.js
(() => {
  const el = id => document.getElementById(id);
  const prix = el('prix');
  if (!prix) return; // pas sur cette page

  const EUR = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
  const prixRange = el('prixRange');
  const duree = el('duree'); const dureeRange = el('dureeRange');
  const taux = el('taux');   const tauxRange = el('tauxRange');
  const assur = el('assur'); const assurRange = el('assurRange');

  const mensualiteTotale = el('mensualiteTotale');
  const mensAssur = el('mensAssur');
  const coutTotalCredit = el('coutTotalCredit');
  const coutAssurTotal = el('coutAssurTotal');

  function sync(a, b) {
    if (!a || !b) return;
    a.addEventListener('input', () => { b.value = a.value; compute(); });
    b.addEventListener('input', () => { a.value = b.value; compute(); });
  }
  sync(prix, prixRange);
  sync(duree, dureeRange);
  sync(taux, tauxRange);
  sync(assur, assurRange);

  const resetBtn = el('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      prix.value = 300000; prixRange.value = 300000;
      duree.value = 25;     dureeRange.value = 25;
      taux.value = 3.90;    tauxRange.value = 3.90;
      assur.value = 0.30;   assurRange.value = 0.30;
      compute();
    });
  }

  function compute() {
    const P = Math.max(0, Number(prix.value || 0)); // montant emprunté
    const years = Number(duree.value || 0);
    const n = Math.max(1, Math.round(years * 12));
    const i = Number(taux.value || 0) / 100 / 12;
    const ia = Number(assur.value || 0) / 100 / 12;

    const mHors = i > 0 ? P * (i / (1 - Math.pow(1 + i, -n))) : (P / n);
    const mAssur = P * ia;
    const mTot = mHors + mAssur;

    let balance = P, totalInterets = 0;
    for (let k = 1; k <= n; k++) {
      const interet = balance * i;
      const principal = mHors - interet;
      balance = Math.max(0, balance - principal);
      totalInterets += interet;
    }
    const totalAssur = mAssur * n;
    const totalCredit = totalInterets + totalAssur;

    if (mensualiteTotale) mensualiteTotale.textContent = EUR.format(mTot || 0);
    if (mensAssur)        mensAssur.textContent        = EUR.format(mAssur || 0);
    if (coutTotalCredit)  coutTotalCredit.textContent  = EUR.format(totalCredit || 0);
    if (coutAssurTotal)   coutAssurTotal.textContent   = EUR.format(totalAssur || 0);
  }

  compute();
})();
