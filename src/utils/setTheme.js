/**
 * @param {"light" | "dark" | "os" | undefined} theme theme to set site to
 * @returns {"light" | "dark"} theme that user is currently using
 * @example
 * setTheme() // automatically sets theme based on preference or
 *            // system if no preference has been specified
 * setTheme("light") // set prefers light theme
 * setTheme("dark") // set prefers dark theme
 * setTheme("os") // removes preference
 */
export default function setTheme(theme) {
  const themeElement =
    document.querySelector("meta[name=theme-color]") || createThemeElement();
  if (!theme) {
    const stored = localStorage.getItem("harmony_theme");
    if (!stored) {
      if (prefersDark()) {
        setDark();
        return "dark";
      } else {
        setLight();
        return "light";
      }
    }
    if (stored === "dark") {
      setDark();
      return "light";
    }
    if (stored === "light") {
      setLight();
      return "dark";
    }
    return "test";
  } else if (theme === "os") {
    localStorage.removeItem("harmony_theme");
    return setTheme();
  } else if (theme === "dark") {
    setDark();
    localStorage.setItem("harmony_theme", "dark");
    return "dark";
  } else if (theme === "light") {
    setLight();
    localStorage.setItem("harmony_theme", "light");
    return "light";
  }
  function setLight() {
    themeElement.content = "white";
    document.documentElement.classList.remove("dark");
  }
  function setDark() {
    themeElement.content = "rgb(9, 9, 11)";
    document.documentElement.classList.add("dark");
  }
  function createThemeElement() {
    const el = document.createElement("meta");
    el.name = "theme-color";
    document.head.append(el);
    return el;
  }
  function prefersDark() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
}
