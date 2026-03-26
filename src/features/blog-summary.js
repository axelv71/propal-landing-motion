import { logStyled } from "../utils/logger.js";

function slugify(text) {
  return text
    .normalize("NFD") // Sépare les accents des caractères
    .replace(/[\u0300-\u036f]/g, "") // Supprime les marques diacritiques (accents)
    .toLowerCase()
    .trim()
    .replace(/['’"«»“”‘’,.():!?\[\]{}…]/g, "") // Supprime ponctuation classique
    .replace(/&/g, "-and-") // Version simple pour les éventuels "et"
    .replace(/\s+/g, "-") // Remplace tout espace (ou suite d'espaces) par -
    .replace(/-+/g, "-") // Réduit les tirets multiples
    .replace(/[^a-z0-9-]/g, "") // Supprime tout ce qui n'est pas a-z, 0-9 ou -
    .replace(/^-+/, "") // Suppression des - de début
    .replace(/-+$/, ""); // Suppression des - de fin
}

export default async function createBlogSummary() {
  logStyled("INIT", "Blog Summary");

  const summaryList = document.getElementById("summary-list");
  const blogContent = document.getElementById("blog-rich-text");

  if (!summaryList) {
    logStyled("ERROR", "Summary list not found");
    return;
  }
  if (!blogContent) {
    logStyled("ERROR", "Blog content not found");
    return;
  }

  // Remove all content from the summary list
  summaryList.innerHTML = "";

  // Get all H2 tags in the blog content
  const h2Tags = blogContent.querySelectorAll("h2");

  for (const h2Tag of h2Tags) {
    const textContent = h2Tag.textContent;
    const slug = slugify(textContent);

    // Change the id of the h2 tag to the slug
    h2Tag.id = slug;

    // Create a new li link element
    const li = document.createElement("li");
    li.classList.add("blog-link");
    li.innerHTML = `<a href="#${slug}">${textContent}</a>`;

    // Add the li to the summary list
    summaryList.appendChild(li);
  }
}
