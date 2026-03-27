import initLiveStats from "./features/live-stats.js";
import initPosthog from "./features/posthog.js";
import createBlogSummary from "./features/blog-summary.js";

initPosthog();

document.addEventListener("DOMContentLoaded", () => {
  const hasLiveStatsElements =
    document.getElementById("totalProposals") &&
    document.getElementById("totalOpportunities") &&
    document.getElementById("totalProposalAccepted");

  // Ne lance initLiveStats() que si on est à la racine du site
  if (
    hasLiveStatsElements &&
    (window.location.pathname === "/" ||
      window.location.pathname === "/index.html" ||
      window.location.pathname === "/landing" ||
      window.location.pathname === "/eng" ||
      window.location.pathname === "/eng/home-v3" ||
      window.location.pathname === "/fr" ||
      window.location.pathname === "/fr/home-v3" ||
      window.location.pathname === "/eng/book-a-demo" ||
      window.location.pathname === "/fr/book-a-demo" ||
      window.location.pathname === "/eng/pricing" ||
      window.location.pathname === "/fr/pricing")
  ) {
    initLiveStats();
  }

  if (window.location.pathname.includes("/blog/")) {
    createBlogSummary();
  }
});
