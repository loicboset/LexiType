<script lang="ts">
  // PROPS
  let { children, showModal = $bindable() } = $props();

  // STATE
  let dialog = $state<HTMLDialogElement>();

  // EFFECTS
  $effect(() => {
    if (showModal) dialog?.showModal();
		else dialog?.close();
  })

</script>

<dialog
  class="relative z-20"
  bind:this={dialog}
  onclose={() => (showModal = false)}
>
  <div class="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div class="flex h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
      <div class="relative h-fit transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
        {@render children()}
      </div>
    </div>
  </div>
</dialog>

<style>
	dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>