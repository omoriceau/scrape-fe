// routes/+layout.server.js
import { content, slugIndex, fileIndex, languageIndex } from '$lib/server/markdown.js';
import { getPageByFilenameAndLang } from '$lib/markdown.js';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ url }) {
  const lang = url.pathname.startsWith('/fr') ? 'fr' : 'en'; // Basic language detection
  const homeSlug = lang === 'fr' ? 'home' : 'home';
  const currentPage = getPageByFilenameAndLang(homeSlug, lang);

  return {
    markdownData: {
      content,
      slugIndex,
      fileIndex,
      languageIndex,
      currentPage // Include currentPage in the layout data
    }
  };
}