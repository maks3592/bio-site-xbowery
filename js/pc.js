(function(){
  const openBtn = document.getElementById("pcOpen");
  const root = document.getElementById("pc");
  if (!openBtn || !root || typeof PC === "undefined") return;

  const html = document.documentElement;
  const body = document.getElementById("pcBody");
  const typed = document.getElementById("pcTyped");
  const caret = document.getElementById("pcCaret");
  const info = document.getElementById("pcInfo");
  const ph = document.getElementById("pcPh");
  const end = document.getElementById("pcEnd");
  const behind = Array.from(document.querySelectorAll("main,.fl.win,.scatter"));
  const calm = matchMedia("(prefers-reduced-motion:reduce)");
  const CMD = "neofetch";

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  const lines = [];
  const add = n => { n.classList.add("ln"); info.appendChild(n); lines.push(n); return n; };

  const head = el("div", "pc-head");
  head.append(el("b", null, "xbowery"), el("span", "pc-at", "@"), el("b", null, "pc"));
  add(head);
  add(el("div", "pc-rule", "-".repeat(10)));

  const argb = (node, text) => {
    text.split(/(ARGB)/).forEach(part => {
      if (!part) return;
      node.appendChild(part === "ARGB" ? el("span", "pc-argb", part) : document.createTextNode(part));
    });
  };

  PC.forEach(item => {
    if (!item){ add(el("div", "pc-gap")); return; }
    const [key, val, subs] = item;
    const row = el("div", "pc-kv");
    row.appendChild(el("span", "pc-k", key));
    const v = el("span", "pc-v");
    argb(v, val);
    (subs || []).forEach(s => { const d = el("span", "pc-sub"); argb(d, s); v.appendChild(d); });
    row.appendChild(v);
    add(row);
  });

  PC_PHOTOS.forEach((src, i) => {
    const fig = el("figure", "pc-fig");
    fig.style.setProperty("--r", (i % 2 ? 1.4 : -1.6) + "deg");
    const img = new Image();
    img.alt = "";
    img.draggable = false;
    img.decoding = "async";
    img.addEventListener("load", () => { fig.classList.add("ok"); ph.classList.toggle("solo", ph.querySelectorAll(".ok").length === 1); });
    img.addEventListener("error", () => { fig.remove(); ph.classList.toggle("solo", ph.querySelectorAll(".ok").length === 1); });
    img.src = src;
    fig.appendChild(img);
    ph.appendChild(fig);
  });

  let timers = [];
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  const stop = () => { timers.forEach(clearTimeout); timers = []; };

  const showAll = () => {
    typed.textContent = CMD;
    caret.hidden = true;
    root.classList.add("run", "done");
    lines.forEach(n => n.classList.add("on"));
  };

  const play = () => {
    stop();
    typed.textContent = "";
    caret.hidden = false;
    root.classList.remove("run", "done");
    lines.forEach(n => n.classList.remove("on"));
    body.scrollTop = 0;
    if (calm.matches) return showAll();
    let t = 380;
    for (let i = 1; i <= CMD.length; i++){
      later(() => { typed.textContent = CMD.slice(0, i); }, t);
      t += 55 + Math.random() * 45;
    }
    t += 260;
    later(() => { caret.hidden = true; root.classList.add("run"); }, t);
    t += 140;
    lines.forEach((n, i) => later(() => n.classList.add("on"), t + i * 48));
    t += lines.length * 48 + 120;
    later(() => root.classList.add("done"), t);
  };

  let last = null;
  const open = () => {
    if (!root.hidden) return;
    last = document.activeElement;
    root.hidden = false;
    html.classList.add("pc-lock");
    behind.forEach(n => n.inert = true);
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add("show")));
    root.querySelector(".pc-x").focus({ preventScroll: true });
    play();
  };

  const close = () => {
    if (root.hidden || root.classList.contains("hide")) return;
    stop();
    root.classList.add("hide");
    root.classList.remove("show");
    behind.forEach(n => n.inert = false);
    html.classList.remove("pc-lock");
    setTimeout(() => {
      root.hidden = true;
      root.classList.remove("hide", "run", "done");
      (last || openBtn).focus({ preventScroll: true });
    }, calm.matches ? 0 : 320);
  };

  openBtn.addEventListener("click", open);
  root.addEventListener("click", e => { if (e.target.closest("[data-close]")) close(); });
  addEventListener("keydown", e => {
    if (root.hidden) return;
    if (e.key === "Escape"){ e.preventDefault(); close(); }
    else if (e.key === "Tab"){ e.preventDefault(); root.querySelector(".pc-x").focus(); }
  });
  end.addEventListener("click", play);
})();
