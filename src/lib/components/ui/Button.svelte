<script>
  let {
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    href = null,
    type = 'button',
    onclick,
    children,
    class: className = '',
    ...restProps
  } = $props();
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost'
  };
  
  const sizes = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg'
  };
  
  let classes = $derived(`btn ${variants[variant]} ${sizes[size]} ${className}`.trim());
</script>

{#if href}
  <a 
    {href} 
    class={classes} 
    class:disabled={disabled}
    class:loading={loading}
    {...restProps}
  >
    {#if loading}
      <div class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
    {/if}
    {@render children?.()}
  </a>
{:else}
  <button 
    type={type}
    {disabled} 
    class={classes}
    class:disabled={disabled || loading}
    class:loading={loading}
    {onclick}
    {...restProps}
  >
    {#if loading}
      <div class="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
    {/if}
    {@render children?.()}
  </button>
{/if}

<style>
  .btn {
    @apply inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer;
  }
  
  .btn-primary {
    @apply bg-blue-600 text-white hover:bg-blue-700;
  }
  
  .btn-secondary {
    @apply bg-gray-600 text-white hover:bg-gray-700;
  }
  
  .btn-outline {
    @apply border border-gray-300 bg-white hover:bg-gray-50;
  }
  
  .btn-ghost {
    @apply hover:bg-gray-100;
  }
  
  .btn-sm {
    @apply h-9 rounded-md px-3 text-sm;
  }
  
  .btn-lg {
    @apply h-11 rounded-md px-8 text-base;
  }
  
  .btn:not(.btn-sm):not(.btn-lg) {
    @apply h-10 px-4 py-2 text-sm;
  }
  
  .disabled {
    @apply pointer-events-none opacity-50;
  }
  
  .loading {
    @apply pointer-events-none;
  }
</style>