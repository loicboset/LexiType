<script lang="ts">
  let { name, label, placeholder = '', ...rest } = $props();
</script>

<div>
  <label for={name} class="block text-sm/6 font-medium text-gray-900">
    {label}
  </label>
  <div class="mt-2">
    <input {...rest} name={name} id={name} class="block w-full rounded-md bg-white px-3 py-1.5 text-gray-700 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6" {placeholder}>
  </div>
</div>