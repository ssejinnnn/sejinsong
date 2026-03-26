const modeToggle = document.getElementById("modeToggle");

if (modeToggle) {
  modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}