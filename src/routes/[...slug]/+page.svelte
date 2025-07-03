<!-- routes/[...slug]/+page.svelte -->
<script>
  import MarkdownPage from '$lib/components/MarkdownPage.svelte';
  
  /** @type {import('./$types').PageData} */
  export let data;
  
  $: currentPage = data.currentPage;
  $: slug = data.slug;
</script>

<MarkdownPage 
  page={currentPage} 
  {slug}
  showHeader={false}
  showNavigation={false}
/> 
<!-- Or with custom options: -->
<!-- 
<MarkdownPage 
  page={currentPage} 
  {slug}
  showNavigation={false}
  showHeader={true}
  includeSeoMeta={true}
  articleClass="max-w-4xl mx-auto"
  proseClass="prose prose-xl max-w-none prose-blue"
/>
-->