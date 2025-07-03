<!-- /routes/+layout.svelte-->
<script>
  import '../app.css';
  import { initializeMarkdownData } from '$lib/markdown.js';
  import Navigation from '$lib/components/Navigation.svelte';
  import Footer from '$lib/components/Footer.svelte';
  

  /** @type {import('./$types').LayoutData} */
  export let data;
  
  // Initialize markdown data from server
  initializeMarkdownData(data.markdownData);

  // Get current page from layout data with better null checking
  $: currentPage = (() => {
    try {
      // Try to get from layout data
      if (data?.markdownData?.currentPage) {
        return data.markdownData.currentPage;
      }
      
      // Return null if not available
      return null;
    } catch (error) {
      console.warn('Error accessing currentPage:', error);
      return null;
    }
  })();

  // Debug logging
  //$: console.log('Layout: currentPage =', currentPage);
</script>

<div class="min-h-screen bg-base-100">
  <Navigation {currentPage} />

  <main class="content-container">
    <slot />
  </main>
  
  <Footer />
</div>