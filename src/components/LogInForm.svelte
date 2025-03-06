<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/state";
	import Button from "./UI/Button.svelte";
	import Input from "./UI/Input.svelte";

  // PROPS
  let { toggleModal } = $props();
  let pageDate = page;
</script>

<h3 class="text-lg font-medium mb-2">Log into your account</h3>

{#if pageDate.form?.error}
  <p class="mb-2 text-red-500">{pageDate.form?.error}</p>
{/if}

<form method="POST" action="?/login" use:enhance>
  <Input name="email" type="text" label="Email" />
  <Input name="password" type="password" label="Password" />

  <div class="flex justify-between mt-4">
    <Button>Log in</Button>
    <Button type="button" onclick={toggleModal}>Close</Button>
  </div>
</form>
