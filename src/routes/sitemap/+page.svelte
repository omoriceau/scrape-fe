
<script>
  export let data;
</script>

<svelte:head>
  <title>Sitemap</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-4">Sitemap</h1>
  <ul class="list-disc list-inside">
    {#each data.pages as page}
      <li>
        <a href={`/${page.slug}`} class="text-blue-500 hover:underline">{page.title}</a>
      </li>
    {/each}
  </ul>
</div>
