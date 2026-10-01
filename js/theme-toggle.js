const themeToggle = document.querySelector(".theme-toggle");
const profileConfig = window.PROFILE_CONFIG;
const savedThemeKey = "profile-card-theme";
const validThemes = ["light", "dark"];

if (themeToggle && profileConfig) {
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
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark"
        ? profileConfig.labels.switchToLight
        : profileConfig.labels.switchToDark,
    );
    themeToggle.textContent =
      theme === "dark"
        ? profileConfig.labels.useLight
        : profileConfig.labels.useDark;

    if (shouldSave) {
      try {
        localStorage.setItem(savedThemeKey, theme);
      } catch {
        // The selected theme still applies for the current page view.
      }
    }

    return nextTheme;
  }

  applyTheme(getSavedTheme());

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme;
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(nextTheme, true);
  });
}
