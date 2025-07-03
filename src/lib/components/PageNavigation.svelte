<script>
  import { getPageNavigation } from '$lib/markdown.js';
  import * as m from '$paraglide/messages.js';

  export let currentPage;

  $: navigation = currentPage ? getPageNavigation(currentPage) : { prev: null, next: null };
</script>

{#if navigation.prev || navigation.next}
  <nav class="flex justify-between items-center mt-12 pt-8 border-t border-base-300">
    <div class="flex-1">
      {#if navigation.prev}
        <a href="/{navigation.prev.slug}" class="btn btn-ghost btn-sm gap-2 justify-start">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          <div class="text-left">
            <div class="text-xs opacity-70">{m.previous()}</div>
            <div class="font-medium">{navigation.prev.meta.title}</div>
          </div>
        </a>
      {/if}
    </div>

    <div class="flex-1 text-right">
      {#if navigation.next}
        <a href="/{navigation.next.slug}" class="btn btn-ghost btn-sm gap-2 justify-end">
          <div class="text-right">
            <div class="text-xs opacity-70">{m.next()}</div>
            <div class="font-medium">{navigation.next.meta.title}</div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      {/if}
    </div>
  </nav>
{/if}