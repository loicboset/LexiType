<script lang="ts">
	import { enhance } from "$app/forms";
	import { page } from "$app/state";
	import Button from "./UI/Button.svelte";
	import Input from "./UI/Input.svelte";

  // PROPS
  let { toggleModal } = $props();
  let { form } = $derived(page);

  $inspect('form', form);

  $effect(() => {
    if (form?.success) {
      toggleModal();
    }
  });
</script>

<h3 class="text-lg font-medium mb-2">Create an account</h3>

{#if form?.error}
  <p class="mb-2 text-red-500">{form?.error}</p>
{/if}

<form
  method="POST"
  action="?/signup"
  use:enhance={({ formElement, formData, action, cancel }) => {
		return async ({ result }) => {
			console.log('result', result);
			if (result.type === 'success') {
				toggleModal();
			}
		};
	}}
>
  <Input name="username" type="text" label="Username" />
  <Input name="email" type="text" label="Email" />
  <Input name="password" type="password" label="Password" />

  <div class="flex justify-between mt-4">
    <Button>Sign up</Button>
    <Button type="button" onclick={toggleModal}>Close</Button>
  </div>
</form>
