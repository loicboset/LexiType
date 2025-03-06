<script lang="ts">
  import { getContext, onMount } from "svelte";
	import axios from "axios";
	import type { Sentence } from "../types/api/openai";
	import Textarea from "./UI/Textarea.svelte";
	import type { SettingsStore } from "../types/frontend/stores";

  // STATE
  let inputValue = $state('');
  let suggestions = $state<{ spanish: string; english: string }[]>([]);
  let isLoading = $state(true);

  // STORE
  const settings = getContext<SettingsStore>('settings');

  // METHODS
  const handleSubmit = () => {
    const isCorrect = suggestions[0].spanish === inputValue;
    if (isCorrect) {
      suggestions.shift();
      axios.post('/sentences', { spanish: suggestions[0].spanish, english: suggestions[0].english });
      inputValue = "";

      settings().experience += 1;

      if (suggestions.length < 2) fetchRandomSentences();
    } else {
      console.log("Incorrect!");
    }
  }

  const fetchRandomSentences = async () => {
   axios.get<Sentence[]>('/openai/get_random_sentences').then((response) => {
     suggestions.push(...response.data)
   }).finally(() => isLoading = false);
  };


  onMount(() => {
    if (suggestions.length < 2) fetchRandomSentences();
  });
</script>

{#if isLoading}
  <p class="p-4">Loading...</p>
{:else}
  <div class="p-4 flex items-center flex-col">
    <div class="mb-4">
      {suggestions[0].english} - <span class="italic">{suggestions[0].spanish}</span>
    </div>

    <form onsubmit={handleSubmit} class="w-1/3">
      <Textarea
        value={inputValue}
        onchange={(e) => inputValue = e.target.value }
      />
    </form>

  </div>
{/if}
