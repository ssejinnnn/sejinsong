(function () {
  const body = document.body;
  const modeToggle = document.getElementById("modeToggle");
  const savedTheme = localStorage.getItem("morae-theme");

  if (savedTheme === "light") {
    body.classList.add("light");
  }

  if (modeToggle) {
    modeToggle.addEventListener("click", () => {
      body.classList.toggle("light");

      localStorage.setItem(
        "morae-theme",
        body.classList.contains("light") ? "light" : "dark"
      );
    });
  }
})();