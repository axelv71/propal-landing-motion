import initLiveStats from "./features/live-stats.js";
import initPosthog from "./features/posthog.js";

initPosthog();

document.addEventListener("DOMContentLoaded", () => {
  // Ne lance initLiveStats() que si on est à la racine du site
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html" ||
    window.location.pathname === "/landing" ||
    window.location.pathname === "/eng" ||
    window.location.pathname === "/eng/home-v3" ||
    window.location.pathname === "/fr" ||
    window.location.pathname === "/fr/home-v3"
  ) {
    initLiveStats();
  }
});
