<script>
  import { switchLanguage, getAvailableLanguages } from '$lib/markdown.js';
  import { goto } from '$app/navigation';
  import { setLanguage } from '$lib/i18n.js';
  import * as m from '../../paraglide/messages.js';

  export let currentPage;

  const availableLanguages = getAvailableLanguages();
  
  // Define language names directly since the specific message functions don't exist
  const languageNames = {
    'en': 'English',
    'fr': 'Français',
    'es': 'Español',
    'de': 'Deutsch',
    'it': 'Italiano',
    'pt': 'Português',
    'ru': 'Русский',
    'ja': '日本語',
    'ko': '한국어',
    'zh': '中文'
  };

  async function handleLanguageSwitch(targetLang) {
    console.log(currentPage);
    if (!currentPage || targetLang === currentPage.lang) return;

    // Update UI language
    setLanguage(targetLang);

    const targetPage = switchLanguage(currentPage, targetLang);
    if (targetPage) {
      await goto(`/${targetPage.slug}`);
    } else {
      // If page doesn't exist in target language, go to home page in that language
      console.warn(`Page not available in ${targetLang}, redirecting to home`);
      
      // Try to find a home page in the target language
      const homeSlug = targetLang === 'fr' ? 'accueil' : 'home';
      await goto(`/${homeSlug}`);
    }
  }
</script>

{#if availableLanguages.length > 1}
  <div class="language-switcher">
    <details class="dropdown dropdown-end">
      <summary class="btn btn-ghost btn-sm gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.605 0 3.192.083 4.75.371m-4.75-.371v15.75m0-15.75c-1.92-.025-5.75 0-5.75 0s-3.83-.025-5.75 0v15.75s3.83.025 5.75 0 5.75 0 5.75 0" />
        </svg>
        {languageNames[currentPage?.lang] || currentPage?.lang || m.language()}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </summary>
      <ul class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 z-50">
        {#each availableLanguages as lang}
          <li>
            <button 
              class="justify-start {lang === currentPage?.lang ? 'active' : ''}"
              on:click={() => handleLanguageSwitch(lang)}
              disabled={lang === currentPage?.lang}
            >
              <span class="text-sm font-medium">
                {languageNames[lang] || lang}
              </span>
              {#if lang === currentPage?.lang}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ml-auto">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              {/if}
            </button>
          </li>
        {/each}
      </ul>
    </details>
  </div>
{/if}

<style>
  .dropdown-content {
    margin-top: 0.5rem;
  }
  
  .dropdown summary::-webkit-details-marker {
    display: none;
  }
  
  .menu li button.active {
    @apply bg-primary text-primary-content;
  }
  
  .menu li button:disabled {
    @apply opacity-75 cursor-default;
  }
</style>