import { initTranslations, setLanguage } from "./i18n.js";

const content = document.getElementById("page-content");

async function loadPage(pageName) {
  try {
    const response = await fetch(`./pages/${pageName}.html`);

    if (!response.ok) {
      throw new Error(`Impossible de charger la page: ${pageName}`);
    }

    const html = await response.text();
    content.innerHTML = html;

    await initTranslations();
  } catch (error) {
    content.innerHTML = "<p>Erreur de chargement de la page.</p>";
    console.error(error);
  }
}

function setActiveNav(page) {
  document.querySelectorAll(".nav-button").forEach((btn) => {
    btn.classList.remove("is-active");

    if (btn.dataset.page === page) {
      btn.classList.add("is-active");
    }
  });
}

document.addEventListener("click", async (e) => {
  const pageBtn = e.target.closest("[data-page]");
  if (pageBtn) {
    const page = pageBtn.dataset.page;
    await loadPage(page);
    setActiveNav(page);
    return;
  }

  const langBtn = e.target.closest("[data-lang]");
  if (langBtn) {
    const lang = langBtn.dataset.lang;
    await setLanguage(lang);

    const langDropdown = document.getElementById("langDropdown");
    if (langDropdown) {
      langDropdown.classList.remove("open");
    }
  }
});

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
