<!-- routes/[...slug]/+page.svelte -->
<script>
  import MarkdownPage from '$lib/components/MarkdownPage.svelte';
  import Header from '$lib/components/layout/Header.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  /** @type {import('./$types').PageData} */
  export let data;
  
  console.log(data.markdownData)
  $: currentPage = data.markdownData.currentPage;
  $: slug = data.slug;
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <Header />
  
  <main class="flex-1">
    <MarkdownPage 
      page={currentPage} 
      {slug}
      showHeader={false}
      showNavigation={false}
    />
    <!-- Or with custom options: --> 
<!-- MarkdownPage 
  page={currentPage} 
  {slug}
  showNavigation={false}
  showHeader={true}
  includeSeoMeta={true}
  articleClass="max-w-4xl mx-auto"
  proseClass="prose prose-xl max-w-none prose-blue"
/>
-->
  </main>
  
  <Footer />
</div>


