/**
 *
 * @param {"light" | "dark"} theme theme to set site to
 */
export default function setTheme(theme) {
  const themeElement =
    document.querySelector("meta[name=theme-color]") || createThemeElement();
  if (theme === "light") {
    themeElement.content = "white";
    document.body.classList.remove("dark")
  } else if (theme === "dark") {
    themeElement.content = "rgb(9, 9, 11)";
    document.body.classList.add("dark")
  }
  function createThemeElement() {
    const el = document.createElement("meta");
    el.name = "theme-color";
    document.head.append(el);
    return el;
  }
}
