const content = document.getElementById("page-content");
// load page content
async function loadPage(pageName) {
  try {
    const response = await fetch(`./pages/${pageName}.html`);

    if (!response.ok) {
      throw new Error(`Impossible de charger la page: ${pageName}`);
    }

    const html = await response.text();
    content.innerHTML = html;

  } catch (error) {
    content.innerHTML = "<p>Erreur de chargement de la page.</p>";
    console.error(error);
  }
}
// update active nav button
function setActiveNav(page) {
  document.querySelectorAll(".nav-button").forEach(btn => {
    btn.classList.remove("is-active");

    if (btn.dataset.page === page) {
      btn.classList.add("is-active");
    }
  });
}

// delegation allows us to handle clicks on dynamically loaded content without needing to reattach event listeners
document.addEventListener("click", (e) => {
  const button = e.target.closest("[data-page]");
  if (!button) return;

  const page = button.dataset.page;
  loadPage(page);
  setActiveNav(page);
});

// initial load
loadPage("home");
setActiveNav("home");
// Language selection logic
const langToggle = document.getElementById("langToggle");
const langDropdown = document.getElementById("langDropdown");
const currentLangLabel = document.getElementById("currentLang");

let currentLang = localStorage.getItem("lang") || "fr";

function updateLangUI(lang) {
  currentLangLabel.textContent = lang.toUpperCase();

  document.querySelectorAll(".lang-item").forEach(btn => {
    btn.classList.remove("is-active");

    if (btn.dataset.lang === lang) {
      btn.classList.add("is-active");
    }
  });
}

updateLangUI(currentLang);
// Handle language selection
document.addEventListener("click", (e) => {
  const langBtn = e.target.closest("[data-lang]");
  if (!langBtn) return;

  const lang = langBtn.dataset.lang;

  currentLang = lang;
  localStorage.setItem("lang", lang);

  updateLangUI(lang);

  langDropdown.classList.remove("open");

  // здесь позже будет applyTranslations(lang)
});
langToggle.addEventListener("click", () => {
  langDropdown.classList.toggle("open");
});
// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".lang-menu")) {
    langDropdown.classList.remove("open");
  }
});