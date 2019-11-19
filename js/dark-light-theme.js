function darkMode(remember) {
  // Set the theme to dark and optionally remember the preference.
  document.body.classList.remove("light");
  document.body.classList.add("dark");
  if (remember) {
    console.log("Saving theme preference as dark.");
    window.localStorage.setItem("theme-preference", "dark");
  }
}

function lightMode(remember) {
  // Set the theme to light and optionally remember the preference.
  document.body.classList.remove("dark");
  document.body.classList.add("light");
  if (remember) {
    console.log("Saving theme preference as light.");
    window.localStorage.setItem("theme-preference", "light");
  }
}

function setThemeFromHour() {
  // If the user has set no preference, do some rudimentary switching based on
  // hour of the day.
  var hour = new Date().getHours();
  var noPreference = window.matchMedia("(prefers-color-scheme:no-preference)")
    .matches;
  if (noPreference) {
    console.log("Setting theme based on hour.");
    if (hour > 18 && hour < 7) {
      darkMode();
    } else {
      lightMode();
    }
  } else {
    console.log("Setting theme based system preference.");
  }
}

// If the user has previously set either way, restore that.
var preference = window.localStorage.getItem("theme-preference");
switch (preference) {
  case "dark":
    console.log("Setting theme to dark based on user preference.");
    darkMode();
    break;
  case "light":
    console.log("Setting theme to light based on user preference.");
    lightMode();
    break;
  default:
    setThemeFromHour();
}
