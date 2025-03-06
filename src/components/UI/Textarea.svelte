<script lang="ts">
  // PROPS
  const { value, onchange } = $props();
</script>

<div class="flex items-start space-x-4">
  <div class="min-w-0 flex-1">
    <div class="relative">
      <div class="rounded-lg bg-white border focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
        <label for="comment" class="sr-only">Translate in Spanish here</label>
        <textarea
          rows="4"
          name="comment"
          id="comment"
          class="block border-0 rounded-lg w-full resize-none bg-transparent px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:border-0 sm:text-sm/6"
          placeholder="Translate in Spanish here..."
          value={value}
          onchange={onchange}
          />
      </div>

      <div class="absolute bottom-0 right-0 justify-between py-2 pr-2 pl-3">
        <div class="shrink-0">
          <button type="submit" class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Post</button>
        </div>
      </div>
    </div>
  </div>
</div>