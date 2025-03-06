<script>
	import { setContext } from "svelte";
	import UserStats from "../components/UserStats.svelte";
	import WordList from "../components/WordList.svelte";
	import { writable } from "svelte/store";

  let { data } = $props()
  let settings = $state(data.settings)

  setContext('settings', () => settings);
</script>

<header class="border-b p-4 bg-amber-300">
  <h1 class="text-2xl mb-2 font-medium">LexiType</h1>
  <h2 class="text-mg italic">Type your way to fluency.</h2>
</header>

<div class="flex-1">
  <UserStats  />
  <WordList />
</div>

<footer class="bg-amber-100 text-sm font-light p-4 border-t flex justify-between">
  <p>Made with love ❤️</p>
  <p>It won't win a beauty contest, but it might teach you some Spanish.</p>
</footer>