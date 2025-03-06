<script lang="ts">
	import '../app.css';

	import { invalidate } from '$app/navigation'
  import { onMount } from 'svelte'

  // PROPS
  let { data, children } = $props()
  let { session, supabase } = $derived(data)

  // EFFECTS
  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth')
      }
    })

    return () => data.subscription.unsubscribe()
  })
</script>

<div class="bg-amber-100 h-screen w-full overflow-hidden flex flex-col">
	{@render children()}
</div>
