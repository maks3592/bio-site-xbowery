(function(){
  if (typeof COUNTER_HOST === "undefined" || location.hostname !== COUNTER_HOST) return;
  fetch("https://abacus.jasoncameron.dev/hit/" + COUNTER_HOST + "/views", { keepalive: true }).catch(() => {});
})();
