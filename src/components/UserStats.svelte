<script lang="ts">
	import { page } from "$app/state";
	import { getContext } from "svelte";
	import LogInForm from "./LogInForm.svelte";
	import SignUpForm from "./SignUpForm.svelte";
	import Modal from "./UI/Modal.svelte";
	import TextButton from "./UI/TextButton.svelte";
	import type { SettingsStore } from "../types/frontend/stores";

  // STATE
  let { data } = page;
  let { user } = $derived(data);

  let showModal = $state(false);
  let form = $state('');

  // STORE
  const settings = getContext<SettingsStore>('settings');

  // METHODS
  const toggleModal = () => {
    showModal = !showModal;
  };

  const openLoginModal = () => {
    form = 'login';
    toggleModal();
  };

  const openSignUpModal = () => {
    form = 'signup';
    toggleModal();
  };
</script>

<Modal bind:showModal>
  {#if form === 'login'}
    <LogInForm toggleModal={toggleModal} />
  {:else if form === 'signup'}
    <SignUpForm toggleModal={toggleModal} />
  {/if}
</Modal>

<div class="p-4 border-b flex justify-between">
  {#if user}
    <p>Hello, {user?.email}</p>
  {:else}
  <div>
    <p>You are a guest. <TextButton onclick={openLoginModal} text={'Log in'} /> or <TextButton onclick={openSignUpModal} text={'create an account'} /> to persist your progress!</p>
  </div>
  {/if}

  <div class="flex space-x-1">
    <p>Level: {settings().level}</p>
    <p class="text-gray-700">({settings().experience} xp)</p>
  </div>
</div>
