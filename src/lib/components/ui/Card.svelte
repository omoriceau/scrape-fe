<script>
  let {
    hover = false,
    class: className = '',
    children
  } = $props();
</script>

<div 
  class="card {className}"
  class:card-hover={hover}
>
  {@render children?.()}
</div>