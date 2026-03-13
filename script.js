const zone = document.getElementById("scrollZone");
const t0 = document.getElementById("t0");
const t1 = document.getElementById("t1");
const t2 = document.getElementById("t2");
const onePage = document.getElementById("one");
const modeBtn = document.getElementById("modeBtn");

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function setLineState(el, opacity, y, blur) {
  el.style.opacity = opacity;
  el.style.transform = `translateY(${y}px)`;
  el.style.filter = `blur(${blur}px)`;
}

function updateIntro() {
  const rect = zone.getBoundingClientRect();
  const totalScroll = zone.offsetHeight - window.innerHeight;
  const scrolled = clamp(-rect.top, 0, totalScroll);
  const progress = totalScroll > 0 ? scrolled / totalScroll : 0;

  const root = document.documentElement;

  // letters gather inward while scrolling
  const gap = 16 - progress * 12;
  root.style.setProperty("--gap", `${Math.max(0, gap)}vw`);

  // stage 0: sejin + song
  if (progress < 0.33) {
    const p = progress / 0.33;
    setLineState(t0, 1, 0, 0);
    setLineState(t1, p, 10 - p * 10, 1 - p);
    setLineState(t2, 0, 10, 1);
  }
  // stage 1: se + so
  else if (progress < 0.66) {
    const p = (progress - 0.33) / 0.33;
    setLineState(t0, 1 - p, p * -10, p);
    setLineState(t1, 1, 0, 0);
    setLineState(t2, p, 10 - p * 10, 1 - p);
  }
  // stage 2: s + s
  else {
    const p = (progress - 0.66) / 0.34;
    setLineState(t0, 0, -10, 1);
    setLineState(t1, 1 - p, p * -10, p);
    setLineState(t2, 1, 0, 0);
  }
}

function onScroll() {
  updateIntro();
}

window.addEventListener("scroll", onScroll);
window.addEventListener("resize", onScroll);
window.addEventListener("load", onScroll);

// theme toggle
if (modeBtn && onePage) {
  modeBtn.addEventListener("click", () => {
    onePage.classList.toggle("is-dark");
  });
}