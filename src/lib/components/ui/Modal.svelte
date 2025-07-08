<script>
  let {
    open = $bindable(false),
    title = '',
    maxWidth = 'max-w-lg',
    children,
    actions
  } = $props();
  
  function closeModal() {
    open = false;
  }
  
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
  <div class="modal modal-open">
    <div class="modal-box {maxWidth}">
      {#if title}
        <h3 class="font-bold text-lg mb-4">{title}</h3>
      {/if}
      
      {@render children?.()}
      
      <div class="modal-action">
        {#if actions}
          {@render actions()}
        {:else}
          <button class="btn" onclick={closeModal}>Close</button>
        {/if}
      </div>
    </div>
    <div class="modal-backdrop" onclick={closeModal}></div>
  </div>
{/if}