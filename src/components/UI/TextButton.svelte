<script lang="ts">
  export let text: string;
  export let onclick: () => void;
</script>

<button {onclick} class="text-green-700 cursor-pointer hover:text-green-900">
  {text}
</button>