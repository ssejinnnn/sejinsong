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

function hideAll() {
  setLineState(t0, 0, 0, 0);
  setLineState(t1, 0, 0, 0);
  setLineState(t2, 0, 0, 0);
}

function updateIntro() {
  const rect = zone.getBoundingClientRect();
  const totalScroll = zone.offsetHeight - window.innerHeight;
  const scrolled = clamp(-rect.top, 0, totalScroll);
  const progress = totalScroll > 0 ? scrolled / totalScroll : 0;

  const root = document.documentElement;

  // 모바일에서 gap 조금 더 작게
  const isMobile = window.innerWidth <= 700;
  const startGap = isMobile ? 12 : 16;
  const endGap = isMobile ? 2 : 4;
  const gap = startGap - progress * (startGap - endGap);
  root.style.setProperty("--gap", `${Math.max(0, gap)}vw`);

  hideAll();

  // stage 0
  if (progress < 0.28) {
    setLineState(t0, 1, 0, 0);
  }

  // transition 0 -> 1
  else if (progress < 0.38) {
    const p = (progress - 0.28) / 0.10;
    setLineState(t0, 1 - p, -4 * p, 0);
    setLineState(t1, p, 4 - 4 * p, 0);
  }

  // stage 1
  else if (progress < 0.60) {
    setLineState(t1, 1, 0, 0);
  }

  // transition 1 -> 2
  else if (progress < 0.70) {
    const p = (progress - 0.60) / 0.10;
    setLineState(t1, 1 - p, -4 * p, 0);
    setLineState(t2, p, 4 - 4 * p, 0);
  }

  // stage 2
  else {
    setLineState(t2, 1, 0, 0);
  }
}

function onScroll() {
  updateIntro();
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);
window.addEventListener("load", onScroll);

if (modeBtn && onePage) {
  modeBtn.addEventListener("click", () => {
    onePage.classList.toggle("is-dark");
  });
}