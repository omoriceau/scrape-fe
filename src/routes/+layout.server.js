// routes/+layout.server.js
import { content, slugIndex, fileIndex, languageIndex } from '$lib/server/markdown.js';
import { getPageByFilenameAndLang } from '$lib/markdown.js';

/** @type {import('./$types').LayoutServerLoad} */
export function load({ url, request, cookies }) {
  // Try multiple sources for language detection
  let lang = 'en'; // default
  
  // 1. Check URL path first
  if (url.pathname.startsWith('/fr')) {
    lang = 'fr';
  } 
  // Add more languages as needed
  
  // 2. Check for language in search params (fallback)
  const langParam = url.searchParams.get('lang');
  if (langParam) {
    lang = langParam;
  }
  
  // 3. Check cookies for persistent language preference
  const cookieLang = cookies.get('language');
  if (cookieLang && !url.pathname.match(/^\/(fr)/)) {
    lang = cookieLang;
  }
  
  // 4. Check Accept-Language header as last resort
  if (!cookieLang && !langParam && !url.pathname.match(/^\/(fr|es)/)) {
    const acceptLang = request.headers.get('accept-language');
    if (acceptLang) {
      const preferredLang = acceptLang.split(',')[0].split('-')[0];
      if (['fr', 'es'].includes(preferredLang)) {
        lang = preferredLang;
      }
    }
  }
    
  const homeSlug = lang === 'fr' ? 'home' : 'home';
  const currentPage = getPageByFilenameAndLang(homeSlug, lang);

  return {
    markdownData: {
      content,
      slugIndex,
      fileIndex,
      languageIndex,
      currentPage,
      detectedLanguage: lang // Pass the detected language to the client
    }
  };
}