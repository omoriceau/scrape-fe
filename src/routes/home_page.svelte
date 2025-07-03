<!-- routes/+page.svelte -->
<script>
  import { getPagesByLanguage, getAvailableLanguages } from '$lib/markdown.js';
  import * as m from '$paraglide/messages.js';
  import { setLanguage, currentLanguage } from '$lib/i18n.js';
  import { onMount } from 'svelte';
  import { invalidateAll } from '$app/navigation';
  
  const languages = getAvailableLanguages();
  let previousLanguage = $currentLanguage;
  let messageKey = 0; // Force re-render of messages
  
  // Make these reactive to language changes
  $: {
    // Re-run this block whenever currentLanguage changes
    console.log('Current language changed to:', $currentLanguage);
    
    // Force reload data when language changes
    if (previousLanguage !== $currentLanguage) {
      console.log('Language changed from', previousLanguage, 'to', $currentLanguage);
      previousLanguage = $currentLanguage;
      
      // Force invalidate all data
      invalidateAll();
      
      // Force re-render by updating a reactive variable
      messageKey = Date.now();
    }
    
    // Get all pages for display
    allPages = [];
    languages.forEach(lang => {
      const pages = getPagesByLanguage(lang);
      allPages = [...allPages, ...pages];
    });
    
    // Group pages by language
    pagesByLanguage = {};
    languages.forEach(lang => {
      pagesByLanguage[lang] = getPagesByLanguage(lang);
    });

    // Find home pages for quick access
    homePages = {
      en: allPages.find(page => page.slug === 'home' && page.lang === 'en'),
      fr: allPages.find(page => page.slug === 'accueil' && page.lang === 'fr')
    };
  }
  
  // Initialize these as reactive variables
  let allPages = [];
  let pagesByLanguage = {};
  let homePages = {};

  const languageNames = {
    'en': 'English',
    'fr': 'Français',
    'es': 'Español',
    'de': 'Deutsch',
    'it': 'Italiano',
  };

  // Handle language change with better debugging
  function handleLanguageChange(lang) {
    console.log('Button clicked, changing to:', lang);
    setLanguage(lang);
    
    // Force a complete reload of the page data
    setTimeout(() => {
      console.log('Language after change:', $currentLanguage);
      invalidateAll();
    }, 100);
  }

  onMount(() => {
    console.log('Component mounted, current language:', $currentLanguage);
    previousLanguage = $currentLanguage;
  });
</script>

<svelte:head>
  <title>{m.site_title()} - {m.site_description()}</title>
  <meta name="description" content={m.site_tagline({ name: 'Svelte' })} />
</svelte:head>

<div class="hero bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl mb-12">
  <div class="hero-content text-center py-16">
    <div class="max-w-md">
      <!-- Force reactivity with key -->
      {#key messageKey}
        <h1 class="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {m.site_title()}
        </h1>
        <p class="py-6 text-lg opacity-80">
          {m.site_tagline({ name: 'Svelte' })}
        </p>
        <div class="flex gap-4 justify-center">
          <div class="badge badge-primary badge-lg">{m.badge_svelte_version()}</div>
          <div class="badge badge-secondary badge-lg">{m.badge_multi_language()}</div>
          <div class="badge badge-accent badge-lg">{m.badge_markdown()}</div>
        </div>
      {/key}
      
      <!-- Quick language access with better event handling -->
      {#if homePages.en || homePages.fr}
        <div class="flex gap-4 justify-center mt-6">
          {#if homePages.en}
            <button 
              on:click={() => handleLanguageChange('en')} 
              class="btn btn-primary btn-sm"
              class:btn-outline={$currentLanguage !== 'en'}
            >
              <!-- Force reactivity for button text -->
              {#key messageKey}
                {m.view_in_english()}
              {/key}
            </button>
          {/if}
          {#if homePages.fr}
            <button 
              on:click={() => handleLanguageChange('fr')} 
              class="btn btn-secondary btn-sm"
              class:btn-outline={$currentLanguage !== 'fr'}
            >
              <!-- Force reactivity for button text -->
              {#key messageKey}
                {m.view_in_french()}
              {/key}
            </button>
          {/if}
        </div>
        
        <!-- Debug info (remove in production) -->
        <div class="mt-4 text-sm opacity-60">
          Current language: {$currentLanguage}
        </div>
      {/if}
    </div>
  </div>
</div>

<!-- Rest of your component remains the same... -->
{#if allPages.length > 0}
  <div class="grid gap-8">
    <div class="text-center">
      <h2 class="text-3xl font-bold mb-4">{m.available_content()}</h2>
      <p class="text-lg opacity-70 mb-8">{m.explore_content()}</p>
    </div>

    {#each languages as lang}
      {#if pagesByLanguage[lang] && pagesByLanguage[lang].length > 0}
        <div class="card bg-base-200">
          <div class="card-body">
            <h3 class="card-title text-xl mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.605 0 3.192.083 4.75.371m-4.75-.371v15.75m0-15.75c-1.92-.025-5.75 0-5.75 0s-3.83-.025-5.75 0v15.75s3.83.025 5.75 0 5.75 0 5.75 0" />
              </svg>
              {languageNames[lang] || lang}
              <div class="badge badge-neutral">{pagesByLanguage[lang].length}</div>
            </h3>
            
            <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {#each pagesByLanguage[lang] as currentPage}
                <a href="/{currentPage.slug}" class="card card-compact bg-base-100 shadow hover:shadow-lg transition-shadow">
                  <div class="card-body">
                    <h4 class="card-title text-lg">{currentPage.meta.title || currentPage.slug}</h4>
                    {#if currentPage.meta.description}
                      <p class="text-sm opacity-70">{currentPage.meta.description}</p>
                    {/if}
                    <div class="card-actions justify-end mt-2">
                      <div class="badge badge-ghost badge-sm">{currentPage.lang}</div>
                      {#if currentPage.meta.date}
                        <div class="badge badge-ghost badge-sm">{new Date(currentPage.meta.date).toLocaleDateString()}</div>
                      {/if}
                    </div>
                  </div>
                </a>
              {/each}
            </div>
          </div>
        </div>
      {/if}
    {/each}
  </div>
{:else}
  <div class="hero bg-base-200 rounded-2xl">
    <div class="hero-content text-center py-16">
      <div class="max-w-md">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 mx-auto mb-4 opacity-50">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <h2 class="text-2xl font-bold mb-4">{m.no_content_found()}</h2>
        <p class="opacity-70">
          {m.no_content_description()}
        </p>
      </div>
    </div>
  </div>
{/if}

<div class="mt-16 p-6 bg-base-200 rounded-2xl">
  <h3 class="text-2xl font-bold mb-4">{m.features()}</h3>
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    <div class="flex items-start gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-primary mt-1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.605 0 3.192.083 4.75.371m-4.75-.371v15.75m0-15.75c-1.92-.025-5.75 0-5.75 0s-3.83-.025-5.75 0v15.75s3.83.025 5.75 0 5.75 0 5.75 0" />
      </svg>
      <div>
        <h4 class="font-semibold">{m.multilingual_support()}</h4>
        <p class="text-sm opacity-70">{m.multilingual_description()}</p>
      </div>
    </div>
    
    <div class="flex items-start gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-secondary mt-1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
      <div>
        <h4 class="font-semibold">{m.markdown_processing()}</h4>
        <p class="text-sm opacity-70">{m.markdown_description()}</p>
      </div>
    </div>
    
    <div class="flex items-start gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-accent mt-1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
      </svg>
      <div>
        <h4 class="font-semibold">{m.modern_ui()}</h4>
        <p class="text-sm opacity-70">{m.modern_ui_description()}</p>
      </div>
    </div>
    
    <div class="flex items-start gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-success mt-1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
      <div>
        <h4 class="font-semibold">{m.fast_performance()}</h4>
        <p class="text-sm opacity-70">{m.fast_performance_description()}</p>
      </div>
    </div>
    
    <div class="flex items-start gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-warning mt-1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
      <div>
        <h4 class="font-semibold">{m.responsive_design()}</h4>
        <p class="text-sm opacity-70">{m.responsive_design_description()}</p>
      </div>
    </div>
    
    <div class="flex items-start gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-error mt-1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
      <div>
        <h4 class="font-semibold">{m.developer_friendly()}</h4>
        <p class="text-sm opacity-70">{m.developer_friendly_description()}</p>
      </div>
    </div>
  </div>
</div>