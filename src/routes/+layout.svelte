<script>
  import '../app.css';
  import Navigation from '$lib/components/Navigation.svelte';
  import { page } from '$app/stores';
  import { initializeMarkdownData } from '$lib/markdown.js';
  import { onMount } from 'svelte';
  import * as m from '../paraglide/messages.js';

  /** @type {import('./$types').LayoutData} */
  export let data;
  
  // Initialize markdown data from server
  initializeMarkdownData(data.markdownData);
  
  // Get current page from page store if available - with better null checking
  $: currentPage = (() => {
    try {
      // First try to get from page data
      if ($page?.data?.markdownData?.currentPage) {
        return $page.data.markdownData.currentPage;
      }
      
      // Fallback to layout data if page data isn't available yet
      if (data?.markdownData?.currentPage) {
        return data.markdownData.currentPage;
      }
      
      // Return null if neither is available
      return null;
    } catch (error) {
      console.warn('Error accessing currentPage:', error);
      return null;
    }
  })();

  // Debug logging
  $: console.log('Layout: currentPage =', currentPage);
</script>

<div class="min-h-screen bg-base-100">
  <Navigation {currentPage} />
  
  <main class="content-container">
    <slot />
  </main>
  
  <footer class="footer footer-center p-6 bg-base-200 text-base-content mt-12">
    <div>
      <p class="text-sm opacity-70">
        {m.built_with()}
        <a href="https://svelte.dev" class="link link-primary" target="_blank" rel="noopener">Svelte</a>, 
        <a href="https://tailwindcss.com" class="link link-primary" target="_blank" rel="noopener">Tailwind CSS</a>, and 
        <a href="https://daisyui.com" class="link link-primary" target="_blank" rel="noopener">DaisyUI</a>
      </p>
    </div>
  </footer>
</div>