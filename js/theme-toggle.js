const themeToggle = document.querySelector(".theme-toggle");
const savedThemeKey = "profile-card-theme";
const validThemes = ["light", "dark"];

function getSavedTheme() {
  try {
    const savedTheme = localStorage.getItem(savedThemeKey);

    return validThemes.includes(savedTheme) ? savedTheme : "light";
  } catch {
    return "light";
  }
}

function applyTheme(theme, shouldSave = false) {
  const nextTheme = theme === "dark" ? "light" : "dark";

  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
  themeToggle.textContent = `Use ${nextTheme} theme`;

  if (shouldSave) {
    try {
      localStorage.setItem(savedThemeKey, theme);
    } catch {
      // The theme still works for this page view if storage is unavailable.
    }
  }
}

applyTheme(getSavedTheme());

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(nextTheme, true);
});
