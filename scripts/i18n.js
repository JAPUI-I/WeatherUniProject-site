let currentLang = localStorage.getItem("lang") || "fr";
let translations = {};

export function getCurrentLanguage() {
  return currentLang;
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

function translateKey(key) {
  return key
    .split(".")
    .reduce((obj, part) => obj?.[part], translations) || key;
}

export function applyTranslations() {
  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach((el) => {
    const key = el.dataset.i18n;
    el.textContent = translateKey(key);
  });
}

export function updateLangUI(lang) {
  updateCurrentLangLabel(lang);
  updateActiveLangButton(lang);
}

function updateCurrentLangLabel(lang) {
  const label = document.getElementById("currentLang");
  if (!label) return;

  label.textContent = lang.toUpperCase();
}

function updateActiveLangButton(lang) {
  const buttons = document.querySelectorAll(".lang-item");

  buttons.forEach((btn) => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle("is-active", isActive);
  });
}