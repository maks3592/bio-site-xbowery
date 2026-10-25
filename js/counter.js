(function(){
  if (typeof COUNTER_HOST === "undefined" || location.hostname !== COUNTER_HOST) return;
  const KEY = "xb_counted";
  try { if (localStorage.getItem(KEY) === "1") return; } catch (e) { return; }
  fetch("https://abacus.jasoncameron.dev/hit/" + COUNTER_HOST + "/views", { keepalive: true })
    .then(r => { if (r.ok) try { localStorage.setItem(KEY, "1"); } catch (e) {} })
    .catch(() => {});
})();
