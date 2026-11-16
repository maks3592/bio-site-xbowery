(function(){
  if (typeof COUNTER_HOST === "undefined" || location.hostname !== COUNTER_HOST) return;
  const KEY = "xb_counted_countapi";
  try { if (localStorage.getItem(KEY) === "1") return; } catch (e) { return; }
  fetch("https://countapi.mileshilliard.com/api/v1/hit/maks3592-bio-site-xbowery-visits", { keepalive: true })
    .then(r => { if (r.ok) try { localStorage.setItem(KEY, "1"); } catch (e) {} })
    .catch(() => {});
})();
