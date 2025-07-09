<script>
  import { onMount } from 'svelte';
  import { initializeMarkdownData } from '$lib/markdown.js';
  import "../app.css";

  export let data;

  onMount(() => {
    if (data && data.markdownData) {
      initializeMarkdownData(data.markdownData);
    }
  });
</script>

<slot />