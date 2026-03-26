let currentLang = localStorage.getItem("lang") || "fr";
let translations = {};

export function getCurrentLanguage() {
  return currentLang;
}

async function loadTranslations(lang) {
  try {
    const response = await fetch(`./i18n/${lang}.json`);

    if (!response.ok) {
      throw new Error(`Impossible de charger la langue: ${lang}`);
    }

    translations = await response.json();
  } catch (error) {
    console.error("Erreur de chargement des traductions :", error);
    translations = {};
  }
}

function getTranslation(key) {
  return key.split(".").reduce((obj, part) => obj?.[part], translations) || key;
}

export function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const translatedText = getTranslation(key);

    element.textContent = translatedText;
  });
}

export function updateLangUI(lang) {
  const currentLangLabel = document.getElementById("currentLang");

  if (currentLangLabel) {
    currentLangLabel.textContent = lang.toUpperCase();
  }

  document.querySelectorAll(".lang-item").forEach((button) => {
    button.classList.remove("is-active");

    if (button.dataset.lang === lang) {
      button.classList.add("is-active");
    }
  });
}

export async function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);

  await loadTranslations(lang);
  applyTranslations();
  updateLangUI(lang);
}

export async function initTranslations() {
  await loadTranslations(currentLang);
  applyTranslations();
  updateLangUI(currentLang);
}