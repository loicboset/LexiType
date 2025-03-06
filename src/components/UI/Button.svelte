<script lang="ts">
  let { children, ...rest } = $props();
</script>

<button
  {...rest}
  class="rounded-sm bg-yellow-700 px-2 py-1 text-sm font-semibold text-white shadow-xs hover:bg-yellows-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellows-600 cursor-pointer">
  {@render children()}
</button>
