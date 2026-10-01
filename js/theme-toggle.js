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
    document.documentElement.dataset.theme = theme;
    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark"
        ? profileConfig.labels.switchToLight
        : profileConfig.labels.switchToDark,
    );

    const themeIcon = document.createElement("i");
    themeIcon.className =
      theme === "dark"
        ? profileConfig.labels.themeIconLight
        : profileConfig.labels.themeIconDark;
    themeIcon.setAttribute("aria-hidden", "true");

    const themeLabel = document.createElement("span");
    themeLabel.textContent =
      theme === "dark"
        ? profileConfig.labels.useLight
        : profileConfig.labels.useDark;

    themeToggle.replaceChildren(themeIcon);

    if (shouldSave) {
      try {
        localStorage.setItem(savedThemeKey, theme);
      } catch {
        // The selected theme still applies for the current page view.
      }
    }
  }

  applyTheme(getSavedTheme());

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.dataset.theme;
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(nextTheme, true);
  });
}
