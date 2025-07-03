<script>
  import { switchLanguage, getAvailableLanguages } from '$lib/markdown.js';
  import { goto } from '$app/navigation';
  import { setLanguage, currentLanguage } from '$lib/i18n.js';
  import { page } from '$app/stores';
  import * as m from '$paraglide/messages.js';

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

  /**
   * @param {string} targetLang
   */
  async function handleLanguageSwitch(targetLang) {
    console.log('LanguageSwitcher: Switching to', targetLang);
    console.log('LanguageSwitcher: Current page', currentPage);
    
    if (targetLang === $currentLanguage) {
      console.log('LanguageSwitcher: Already on target language');
      return;
    }

    // Update UI language first
    setLanguage(targetLang);

    // If we're on the home page (root path), just reload in the new language
    if ($page.url.pathname === '/') {
      // Stay on the home page, just with the new language
      console.log('LanguageSwitcher: Staying on home page with new language');
      return;
    }

    // If we have a current page, try to find its equivalent in the target language
    if (currentPage) {
      const targetPage = switchLanguage(currentPage, targetLang);
      if (targetPage) {
        console.log('LanguageSwitcher: Found target page', targetPage);
        await goto(`/${targetPage.slug}`);
        return;
      }
    }
    
    // If page doesn't exist in target language, reload current page with new language
    // This will show the content in the new language even if the specific page doesn't exist
    console.log(`LanguageSwitcher: Page not available in ${targetLang}, staying on current page`);
    
    // Instead of redirecting, just reload the current page
    // The language change will be reflected in the UI
    // If you want to force a reload, you can use:
    // window.location.reload();
  }

  // React to language changes from other components
  $: {
    console.log('LanguageSwitcher: Current language changed to', $currentLanguage);
  }
</script>

{#if availableLanguages.length > 1}
  <div class="language-switcher">
    <details class="dropdown dropdown-end">
      <summary class="btn btn-ghost btn-sm gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.605 0 3.192.083 4.75.371m-4.75-.371v15.75m0-15.75c-1.92-.025-5.75 0-5.75 0s-3.83-.025-5.75 0v15.75s3.83.025 5.75 0 5.75 0 5.75 0" />
        </svg>
        <!-- Use the reactive current language instead of currentPage.lang -->
        {languageNames[$currentLanguage] || $currentLanguage || m.language()}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3 h-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </summary>
      <ul class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-40 z-50">
        {#each availableLanguages as lang}
          <li>
            <button 
              class="justify-start {lang === $currentLanguage ? 'active' : ''}"
              on:click={() => handleLanguageSwitch(lang)}
              disabled={lang === $currentLanguage}
            >
              <span class="text-sm font-medium">
                {languageNames[lang] || lang}
              </span>
              {#if lang === $currentLanguage}
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