import { browser } from '$app/environment';
import { setLocale, getLocale } from '../paraglide/runtime.js';

// Language detection and management
export function detectLanguage() {
  if (browser) {
    // Try to get language from localStorage first
    const stored = localStorage.getItem('preferred-language');
    if (stored && ['en', 'fr'].includes(stored)) {
      return stored;
    }
    
    // Fall back to browser language
    const browserLang = navigator.language.split('-')[0];
    return ['en', 'fr'].includes(browserLang) ? browserLang : 'en';
  }
  return 'en';
}

export function setLanguage(lang) {
  if (browser) {
    localStorage.setItem('preferred-language', lang);
    setLocale(lang);
  }
}

// Initialize language
if (browser) {
  const detectedLang = detectLanguage();
  setLocale(detectedLang);
}