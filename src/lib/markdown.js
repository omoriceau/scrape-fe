// Client-side markdown utilities that work with server-processed data

let content = {};
let slugIndex = {};
let fileIndex = {};
let languageIndex = {};

/**
 * Initialize markdown data from server
 * @param {Object} data - Pre-processed markdown data from server
 */
export function initializeMarkdownData(data) {
  content = data.content;
  slugIndex = data.slugIndex;
  fileIndex = data.fileIndex;
  languageIndex = data.languageIndex;
}

/**
 * Get a page by its slug
 * @param {string} slug - The page slug
 * @returns {Object|null} - The page object or null if not found
 */
export function getPage(slug) {
  return slugIndex[slug] || null;
}

/**
 * Get a page by filename and language with fallback
 * @param {string} filename - The file name (without extension)
 * @param {string} lang - The target language
 * @returns {Object|null} - The page object or null if not found
 */
export function getPageByFilenameAndLang(filename, lang) {
  if (fileIndex[filename] && fileIndex[filename][lang]) {
    return fileIndex[filename][lang];
  }

  // Fallback to base language (e.g., 'en' from 'en-ca')
  const baseLang = lang.split('-')[0];
  if (fileIndex[filename] && fileIndex[filename][baseLang]) {
    return fileIndex[filename][baseLang];
  }

  // Fallback to any available language
  const langs = Object.keys(fileIndex[filename] || {});
  return langs.length ? fileIndex[filename][langs[0]] : null;
}

/**
 * Get all pages for a specific language
 * @param {string} lang - The language code
 * @returns {Array} - Array of page objects
 */
export function getPagesByLanguage(lang) {
  return languageIndex[lang] || [];
}

/**
 * Get all available languages
 * @returns {Array} - Array of language codes
 */
export function getAvailableLanguages() {
  console.log(languageIndex, ">>>>>")
  return Object.keys(languageIndex);
}

/**
 * Get all pages with their language variants
 * @returns {Object} - Object with filename as key and language variants as value
 */
export function getAllPagesWithVariants() {
  return fileIndex;
}

/**
 * Switch language for a given page
 * @param {Object} currentPage - The current page object
 * @param {string} targetLang - The target language
 * @returns {Object|null} - The target page or null if not available
 */
export function switchLanguage(currentPage, targetLang) {
  return getPageByFilenameAndLang(currentPage.filename, targetLang);
}

/**
 * Get page navigation (previous/next pages in the same language)
 * @param {Object} currentPage - The current page object
 * @returns {Object} - Object with prev and next page references
 */
export function getPageNavigation(currentPage) {
  const pagesInLang = getPagesByLanguage(currentPage.lang);
  const currentIndex = pagesInLang.findIndex(page => page.slug === currentPage.slug);
  
  return {
    prev: currentIndex > 0 ? pagesInLang[currentIndex - 1] : null,
    next: currentIndex < pagesInLang.length - 1 ? pagesInLang[currentIndex + 1] : null
  };
}

// Export for debugging
export { content, slugIndex, fileIndex, languageIndex };