<script>
  let {
    type = 'info',
    dismissible = false,
    class: className = '',
    children
  } = $props();
  
  let visible = $state(true);
  
  const types = {
    info: 'alert-info',
    success: 'alert-success',
    warning: 'alert-warning',
    error: 'alert-error'
  };
</script>

{#if visible}
  <div class="alert {types[type]} {className}">
    <div class="flex-1">
      {@render children?.()}
    </div>
    
    {#if dismissible}
      <button 
        class="ml-4 text-current hover:opacity-70"
        onclick={() => visible = false}
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
      </button>
    {/if}
  </div>
{/if}