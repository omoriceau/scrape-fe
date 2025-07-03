<!-- /src/lib/components/LanguageSwitcher.svelte -->
<script>
  import { switchLanguage, getAvailableLanguages } from '$lib/markdown.js';
  import { goto } from '$app/navigation';
  import { setLanguage, currentLanguage } from '$lib/i18n.js';
  import { page } from '$app/stores';

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

    // Get current path without language prefix
    let currentPath = $page.url.pathname;
    
    // Remove existing language prefix if present
    if (currentPath.startsWith('/fr/')) {
      currentPath = currentPath.substring(3);
    } else if (currentPath.startsWith('/fr')) {
      currentPath = currentPath.substring(3);
    }
    
    // Handle root path
    if (currentPath === '/fr' || currentPath === '') {
      currentPath = '/';
    }

    // Build new path with language prefix
    let newPath;
    if (targetLang === 'en') {
      // English is the default, no prefix needed
      newPath = currentPath === '/' ? '/' : currentPath;
    } else {
      // Add language prefix for non-English languages
      newPath = `/${targetLang}${currentPath === '/' ? '' : currentPath}`;
    }

    console.log('LanguageSwitcher: Navigating to', newPath);
    
    // Navigate to the new path
    await goto(newPath, { invalidateAll: true });
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
        {languageNames[$currentLanguage] || $currentLanguage}
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