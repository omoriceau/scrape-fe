<script>
  let {
    value = $bindable(''),
    type = 'text',
    placeholder = '',
    disabled = false,
    error = '',
    label = '',
    required = false,
    id = '',
    class: className = '',
    ...restProps
  } = $props();
  
  let inputElement = $state();
  
  export function focus() {
    inputElement?.focus();
  }
</script>

<div class="space-y-1">
  {#if label}
    <label class="block text-sm font-medium text-gray-700" for={id}>
      {label}
      {#if required}
        <span class="text-red-500">*</span>
      {/if}
    </label>
  {/if}
  
  <input
    bind:this={inputElement}
    {id}
    {type}
    {placeholder}
    {disabled}
    {required}
    bind:value
    class="input {className}"
    class:input-error={error}
    {...restProps}
  />
  
  {#if error}
    <p class="text-sm text-red-600">{error}</p>
  {/if}
</div>