(function(){
  const ageEl = document.getElementById("age");
  const calcAge = () => {
    const msk = new Date(Date.now() + 3 * 3600 * 1000);
    const y = msk.getUTCFullYear(), mo = msk.getUTCMonth(), d = msk.getUTCDate(), h = msk.getUTCHours();
    let age = y - BIRTH_YEAR;
    if (mo < BIRTH_MONTH || (mo === BIRTH_MONTH && (d < BIRTH_DAY || (d === BIRTH_DAY && h < BIRTH_HOUR_MSK)))) age -= 1;
    ageEl.textContent = age;
  };
  calcAge();
  setInterval(calcAge, 60000);
  const tgOn = !!(SHOW_TG && TG_USER);
  document.getElementById("tgWrap").hidden = !tgOn;
  document.getElementById("links").classList.toggle("single", !tgOn);
  if (TG_USER){
    document.getElementById("tg").href = "https://t.me/" + TG_USER;
    document.getElementById("tgSub").textContent = "@" + TG_USER;
  }
  document.getElementById("st").href = "https://steamcommunity.com/id/" + STEAM_ID;
  document.getElementById("stSub").textContent = "steamcommunity.com/id/" + STEAM_ID;
})();
