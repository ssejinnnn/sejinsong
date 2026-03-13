const zone = document.getElementById("scrollZone");
const t0 = document.getElementById("t0");
const t1 = document.getElementById("t1");
const t2 = document.getElementById("t2");
const onePage = document.getElementById("one");
const modeBtn = document.getElementById("modeBtn");

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function setLineState(el, opacity, y = 0) {
  el.style.opacity = opacity;
  el.style.transform = `translateY(${y}px)`;
  el.style.filter = `blur(0px)`;
}

function hideAll() {
  setLineState(t0, 0, 0);
  setLineState(t1, 0, 0);
  setLineState(t2, 0, 0);
}

function updateIntro() {
  const rect = zone.getBoundingClientRect();
  const totalScroll = zone.offsetHeight - window.innerHeight;
  const scrolled = clamp(-rect.top, 0, totalScroll);
  const progress = totalScroll > 0 ? scrolled / totalScroll : 0;

  const isMobile = window.innerWidth <= 700;
  const startGap = isMobile ? 12 : 16;
  const endGap = isMobile ? 2 : 4;
  const gap = startGap - progress * (startGap - endGap);
  document.documentElement.style.setProperty("--gap", `${Math.max(0, gap)}vw`);

  hideAll();

  // 0: sejin + song
  if (progress < 0.30) {
    setLineState(t0, 1, 0);
    return;
  }

  // 0 -> 1 transition
  if (progress < 0.36) {
    const p = (progress - 0.30) / 0.06;
    setLineState(t0, 1 - p, 0);
    setLineState(t1, p, 0);
    return;
  }

  // 1: se + so
  if (progress < 0.62) {
    setLineState(t1, 1, 0);
    return;
  }

  // 1 -> 2 transition
  if (progress < 0.68) {
    const p = (progress - 0.62) / 0.06;
    setLineState(t1, 1 - p, 0);
    setLineState(t2, p, 0);
    return;
  }

  // 2: s + s
  setLineState(t2, 1, 0);
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