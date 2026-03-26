(function () {
  const body = document.body;
  const modeToggle = document.getElementById("modeToggle");
  const savedTheme = localStorage.getItem("site-theme");

  if (savedTheme === "dark") {
    body.classList.add("dark");
  }

  if (modeToggle) {
    modeToggle.addEventListener("click", () => {
      body.classList.toggle("dark");
      localStorage.setItem(
        "site-theme",
        body.classList.contains("dark") ? "dark" : "light"
      );
    });
  }
})();