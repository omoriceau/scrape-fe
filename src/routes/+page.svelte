<script>
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import HeroSection from '$lib/components/ui/sections/HeroSection.svelte';
  import DemoSection from '$lib/components/ui/sections/DemoSection.svelte';
  import FeaturesSection from '$lib/components/ui/sections/FeaturesSection.svelte';
  import HowItWorksSection from '$lib/components/ui/sections/HowItWorksSection.svelte';
  import PricingSection from '$lib/components/ui/sections/PricingSection.svelte';
  import CTASection from '$lib/components/ui/sections/CTASection.svelte';

  import * as m from '$paraglide/messages.js';
  import { getPagesByLanguage, getAvailableLanguages } from '$lib/markdown.js';
  import { setLanguage, currentLanguage, languageChanged, getLanguageDisplayName, formatDate as i18nFormatDate } from '$lib/i18n.js';
  import { onMount } from 'svelte';

  // Get data from server
  export let data;

  // Use server-provided languages or fallback to client-side function
  const languages = data.availableLanguages || getAvailableLanguages();
  
  let previousLanguage = $currentLanguage;

  // Reactive variables
  let allPages = [];
  let pagesByLanguage = {};
  let messageKey = 0;

  // Reactive updates when language changes
  $: {
    console.log('Language changed, updating content...');
    
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
    
    // Update message key to force re-render
    messageKey = $languageChanged;
  }

  /**
   * @param {string} lang
   */
  function handleLanguageChange(lang) {
    console.log('Button clicked, changing to:', lang);
    setLanguage(lang);
  }

  onMount(() => {
    console.log('Component mounted, current language:', $currentLanguage);
    console.log('Available languages from server:', languages);
  });
</script>

<svelte:head>
  <title>{m.site_title()} - {m.site_description()}</title>
  <meta name="description" content="Extract data from any website with our powerful API. Fast, reliable, and easy to use web scraping service." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="min-h-screen flex flex-col">
  <Header />
  
  <main class="flex-1">
    <HeroSection />
    <DemoSection />
    <FeaturesSection />
    <HowItWorksSection />
    <PricingSection />
    <CTASection />
  </main>
  
  <Footer />
</div>