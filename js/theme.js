const themeStorageKey = "theme";
const pageRoot = document.documentElement;
const systemThemePreference = window.matchMedia("(prefers-color-scheme: dark)");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

const readStoredTheme = () => {
  try {
    const storedTheme = window.localStorage.getItem(themeStorageKey);
    if (storedTheme === "light" || storedTheme === "dark") return storedTheme;
    if (storedTheme !== null) window.localStorage.removeItem(themeStorageKey);
  } catch {
    return null;
  }
  return null;
};

const applyTheme = theme => {
  pageRoot.dataset.theme = theme;

  if (themeColorMeta) {
    themeColorMeta.content = theme === "dark" ? "#111b18" : "#f6f7f4";
  }

  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  themeToggle.setAttribute("aria-pressed", String(theme === "dark"));

  const themeIcon = themeToggle.querySelector(".theme-toggle__icon");
  if (themeIcon) themeIcon.textContent = theme === "dark" ? "☾" : "☼";
};

const initialTheme = readStoredTheme();
let hasManualThemeChoice = initialTheme !== null;
applyTheme(initialTheme ?? (systemThemePreference.matches ? "dark" : "light"));

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  if (!themeToggle) return;

  applyTheme(pageRoot.dataset.theme);
  themeToggle.addEventListener("click", () => {
    const nextTheme = pageRoot.dataset.theme === "dark" ? "light" : "dark";
    hasManualThemeChoice = true;
    applyTheme(nextTheme);

    try {
      window.localStorage.setItem(themeStorageKey, nextTheme);
    } catch {
      // Keep the selected theme active for this page even when storage is unavailable.
    }
  });
});

systemThemePreference.addEventListener("change", event => {
  if (hasManualThemeChoice || readStoredTheme() !== null) return;
  applyTheme(event.matches ? "dark" : "light");
});
