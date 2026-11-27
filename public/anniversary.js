const clock = document.querySelector(".clock");
const digits = clock.querySelectorAll("[data-unit]");
const anniversary = Date.parse(document.getElementById("anniversary-date").dateTime);
let timer;

function renderClock() {
  const seconds = Math.ceil((anniversary - Date.now()) / 1000);
  if (seconds <= 0) {
    clock.hidden = true;
    document.getElementById("clock-title").textContent = "一周年快乐，芙芙！";
    return;
  }
  const values = [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24,
    Math.floor(seconds / 60) % 60, seconds % 60];
  digits.forEach((digit, i) => { digit.textContent = String(values[i]).padStart(2, "0"); });
  clock.hidden = false;
  timer = setTimeout(renderClock, 1000 - (Date.now() % 1000));
}

document.addEventListener("visibilitychange", () => {
  clearTimeout(timer);
  if (!document.hidden) renderClock();
});
renderClock();
