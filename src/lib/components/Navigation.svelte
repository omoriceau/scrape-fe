<!-- Navigation.svelte -->
<script>
  import { currentLanguage } from '$lib/i18n.js';
  import LanguageSwitcher from './LanguageSwitcher.svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  import * as m from '$paraglide/messages.js';

  export let currentPage = null;
  
  // React to language changes
  $: {
    //console.log('Navigation.svelte: Current language is', $currentLanguage);
  }
</script>

<nav class="site-nav sticky top-0 z-40 backdrop-blur-sm bg-base-100/80">
  <div class="container mx-auto">
    <div class="navbar-start">
      <a href="/" class="navbar-brand">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <!-- This will now update reactively when language changes -->
        {m.site_title()}
      </a>
    </div>

    <div class="navbar-center hidden md:flex">
      <!-- Add navigation menu items here if needed -->
    </div>

    <div class="navbar-end gap-2">
      <a href="/register" class="btn btn-ghost btn-sm rounded-btn">Register</a>
      <ThemeToggle />
      <LanguageSwitcher {currentPage} />
      
      <!-- Debug info (remove in production) -->
      <!--div class="text-xs opacity-50 hidden md:block">
        Lang: {$currentLanguage}
      </div-->
    </div>
  </div>
</nav>