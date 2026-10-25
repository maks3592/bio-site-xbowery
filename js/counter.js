(function(){
  const box = document.getElementById("visits");
  const num = document.getElementById("visitsNum");
  if (!box || !num || typeof COUNTER_HOST === "undefined") return;
  const API = "https://abacus.jasoncameron.dev";
  const NS = COUNTER_HOST;
  const live = location.hostname === NS;
  let seen = false;
  try { seen = localStorage.getItem("xb_seen") === "1"; } catch (e) {}

  const show = n => {
    box.hidden = false;
    const calm = matchMedia("(prefers-reduced-motion:reduce)").matches;
    if (calm || n < 2) { num.textContent = n; return; }
    const t0 = performance.now(), dur = Math.min(1600, 500 + n * 12);
    const step = t => {
      const k = Math.min(1, (t - t0) / dur);
      num.textContent = Math.round(n * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (live) fetch(API + "/hit/" + NS + "/views", { keepalive: true }).catch(() => {});
  const first = live && !seen;
  fetch(API + (first ? "/hit/" : "/get/") + NS + "/unique")
    .then(r => r.ok ? r.json() : null)
    .then(d => {
      if (!d || typeof d.value !== "number") return;
      if (first) try { localStorage.setItem("xb_seen", "1"); } catch (e) {}
      show(d.value);
    })
    .catch(() => {});
})();
