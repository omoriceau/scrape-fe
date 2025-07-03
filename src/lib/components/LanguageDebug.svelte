<script>
  import { currentLanguage } from '$lib/i18n.js';
  import { onMount } from 'svelte';
  import { languageTag } from '$paraglide/runtime.js';

  let paraglideLocale = 'unknown';
  let storageLanguage = 'unknown';

  onMount(() => {
    // Update paraglide locale
    try {
      // @ts-ignore
      paraglideLocale = languageTag();
    } catch (error) {
      paraglideLocale = 'error';
    }

    // Update storage language
    if (typeof localStorage !== 'undefined') {
      storageLanguage = localStorage.getItem('preferred-language') || 'not set';
    }

    // Listen for language change events
    const handleLanguageChange = (event) => {
      console.log('LanguageDebug: Language change event received', event.detail);
      
      // Update paraglide locale
      try {
        // @ts-ignore
        paraglideLocale = languageTag();
      } catch (error) {
        paraglideLocale = 'error';
      }

      // Update storage language
      if (typeof localStorage !== 'undefined') {
        storageLanguage = localStorage.getItem('preferred-language') || 'not set';
      }
    };

    window.addEventListener('languagechange', handleLanguageChange);

    return () => {
      window.removeEventListener('languagechange', handleLanguageChange);
    };
  });

  // React to store changes
  $: {
    console.log('LanguageDebug: Store language changed to', $currentLanguage);
  }
</script>

<!-- Remove this component in production -->
<div class="fixed bottom-4 right-4 bg-base-200 p-4 rounded-lg shadow-lg text-xs max-w-xs z-50">
  <h4 class="font-bold mb-2">Language Debug</h4>
  <div class="space-y-1">
    <div><strong>Store:</strong> {$currentLanguage}</div>
    <div><strong>Paraglide:</strong> {paraglideLocale}</div>
    <div><strong>Storage:</strong> {storageLanguage}</div>
    <div><strong>Browser:</strong> {typeof navigator !== 'undefined' ? navigator.language : 'unknown'}</div>
  </div>
</div>