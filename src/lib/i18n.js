//i18n.js - Type-safe version with reactive updates
import { browser } from '$app/environment';
import { writable, get } from 'svelte/store';

// Try the correct Paraglide imports - these are the standard function names
// @ts-ignore
import { setLanguageTag, languageTag, availableLanguageTags } from '$paraglide/runtime.js';

// Define the supported language type based on what Paraglide expects
/** @typedef {"en" | "fr"} SupportedLanguage */

// Create a reactive store for the current language
export const currentLanguage = writable(/** @type {SupportedLanguage} */ ('en'));

// Available languages - get from Paraglide or use the known supported ones
const SUPPORTED_LANGUAGES = /** @type {SupportedLanguage[]} */ (availableLanguageTags || ['en', 'fr']);

/**
 * Type guard to check if a string is a supported language
 * @param {string} lang 
 * @returns {lang is SupportedLanguage}
 */
function isSupportedLanguage(lang) {
  return SUPPORTED_LANGUAGES.includes(/** @type {SupportedLanguage} */ (lang));
}

// Language detection and management
export function detectLanguage() {
  if (browser) {
    // Try to get language from localStorage first
    const stored = localStorage.getItem('preferred-language');
    if (stored && isSupportedLanguage(stored)) {
      return /** @type {SupportedLanguage} */ (stored);
    }
    
    // Fall back to browser language
    const browserLang = navigator.language.split('-')[0];
    return isSupportedLanguage(browserLang) ? /** @type {SupportedLanguage} */ (browserLang) : 'en';
  }
  return 'en';
}

/**
 * @param {string} lang
 */
export function setLanguage(lang) {
  console.log('i18n.js: Setting language to:', lang);

  if (browser) {
    const currentLang = get(currentLanguage);

    if (currentLang === lang) {
      console.log('i18n.js: Language is already', lang);
      return;
    }

    // Validate and cast the language
    if (!isSupportedLanguage(lang)) {
      console.warn(`i18n.js: Language ${lang} is not supported. Supported languages:`, SUPPORTED_LANGUAGES);
      return;
    }

    const typedLang = /** @type {SupportedLanguage} */ (lang);

    localStorage.setItem('preferred-language', typedLang);

    // Set the locale for paraglide using the correct function name FIRST
    try {
      setLanguageTag(typedLang);
      console.log('i18n.js: Paraglide language tag set to', typedLang);
    } catch (error) {
      console.error('i18n.js: Error setting paraglide language tag:', error);
    }

    // Update the reactive store AFTER paraglide is updated
    currentLanguage.set(typedLang);

    // Force a tick to ensure all reactive statements update
    setTimeout(() => {
      // Dispatch a custom event for components that need to know about language changes
      window.dispatchEvent(new CustomEvent('languagechange', {
        detail: {
          language: typedLang,
          previousLanguage: currentLang
        }
      }));
    }, 0);

    console.log('i18n.js: Language change complete');
  }
}

/**
 * Get the current language
 * @returns {SupportedLanguage}
 */
export function getCurrentLanguage() {
  if (browser) {
    // Get from Paraglide if available, otherwise from store
    try {
      return languageTag() || get(currentLanguage);
    } catch (error) {
      console.error('i18n.js: Error getting language tag from paraglide:', error);
      return get(currentLanguage);
    }
  }
  return get(currentLanguage);
}

/**
 * Get available languages
 * @returns {SupportedLanguage[]}
 */
export function getAvailableLanguages() {
  return SUPPORTED_LANGUAGES;
}

// Initialize language
if (browser) {
  const detectedLang = detectLanguage();
  console.log('i18n.js: Detected language:', detectedLang);
  currentLanguage.set(detectedLang);
  
  try {
    setLanguageTag(detectedLang);
    console.log('i18n.js: Initial paraglide language tag set to', detectedLang);
  } catch (error) {
    console.error('i18n.js: Error setting initial paraglide language tag:', error);
  }
}