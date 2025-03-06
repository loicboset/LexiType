import { supabase } from '$lib/supabaseClient';
import { json } from '@sveltejs/kit';

export async function POST({ request, locals: { user } }) {
	const { spanish, english } = await request.json();

	const { error } = await supabase.from('sentences').insert({ spanish, english });

	if (error) {
		console.log(' error', error);
		return json(`error: ${error.message}`, { status: 500 });
	}

	if (user) {
		// get current user_settings
		const { data: userSettings } = await supabase
			.from('user_settings')
			.select()
			.match({ user_id: user.id })
			.single();

		// add experience point
		await supabase
			.from('user_settings')
			.update({ experience: userSettings?.experience + 1 })
			.match({ user_id: user.id });
	}

	return json('success', { status: 200 });
}
