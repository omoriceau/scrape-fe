<script>
  import PageNavigation from '$lib/components/PageNavigation.svelte';
  import * as m from '../../paraglide/messages.js';
  
  /** @type {import('./$types').PageData} */
  export let data;
  
  $: currentPage = data.currentPage;
  $: slug = data.slug;
</script>

<svelte:head>
  <title>{currentPage.meta.title || slug} - {m.site_title()}</title>
  {#if currentPage.meta.description}
    <meta name="description" content={currentPage.meta.description} />
  {/if}
  {#if currentPage.meta.keywords}
    <meta name="keywords" content={currentPage.meta.keywords} />
  {/if}
  <meta name="author" content={currentPage.meta.author || m.site_title()} />
  <meta property="og:title" content={currentPage.meta.title || slug} />
  {#if currentPage.meta.description}
    <meta property="og:description" content={currentPage.meta.description} />
  {/if}
  <meta property="og:type" content="article" />
  {#if currentPage.meta.image}
    <meta property="og:image" content={currentPage.meta.image} />
  {/if}
</svelte:head>

<article class="max-w-none">
  <!-- Page Header -->
  {#if currentPage.meta.title || currentPage.meta.description || currentPage.meta.date || currentPage.meta.author}
    <header class="mb-8 pb-6 border-b border-base-300">
      {#if currentPage.meta.title}
        <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          {currentPage.meta.title}
        </h1>
      {/if}
      
      {#if currentPage.meta.description}
        <p class="text-xl opacity-80 mb-4 leading-relaxed">
          {currentPage.meta.description}
        </p>
      {/if}
      
      {#if currentPage.meta.date || currentPage.meta.author || currentPage.lang}
        <div class="flex flex-wrap gap-3 items-center text-sm opacity-70">
          {#if currentPage.meta.date}
            <div class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0121 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <time datetime={currentPage.meta.date}>
                {new Date(currentPage.meta.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </time>
            </div>
          {/if}
          
          {#if currentPage.meta.author}
            <div class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <span>{currentPage.meta.author}</span>
            </div>
          {/if}
          
          <div class="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.605 0 3.192.083 4.75.371m-4.75-.371v15.75m0-15.75c-1.92-.025-5.75 0-5.75 0s-3.83-.025-5.75 0v15.75s3.83.025 5.75 0 5.75 0 5.75 0" />
            </svg>
            <span class="uppercase tracking-wide">{currentPage.lang}</span>
          </div>
        </div>
      {/if}
      
      {#if currentPage.meta.tags}
        <div class="flex flex-wrap gap-2 mt-4">
          {#each currentPage.meta.tags.split(',').map(tag => tag.trim()) as tag}
            <div class="badge badge-primary badge-sm">{tag}</div>
          {/each}
        </div>
      {/if}
    </header>
  {/if}

  <!-- Page Content -->
  <div class="prose prose-lg max-w-none">
    {@html currentPage.html}
  </div>
  
  <!-- Page Navigation -->
  <PageNavigation {currentPage} />
</article>