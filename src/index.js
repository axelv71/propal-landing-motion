import initPosthog from "./features/posthog.js";
import createBlogSummary from "./features/blog-summary.js";

initPosthog();

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.includes("/blog/")) {
    createBlogSummary();
  }
});
