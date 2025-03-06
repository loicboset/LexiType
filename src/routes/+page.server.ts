import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const { data } = await supabase.auth.getUser();

	const { data: settings } = await supabase
		.from('user_settings')
		.select()
		.match({ user_id: data.user?.id })
		.single();

	const defaultSettings = {
		level: 1,
		experience: 0
	};

	return { settings: settings || defaultSettings };
};

export const actions: Actions = {
	signup: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const username = formData.get('username') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!username || !email || !password) {
			return fail(400, { error: 'Username, email and password are required' });
		}

		const { data, error } = await supabase.auth.signUp({ email, password });
		if (error) {
			console.error(error);
			return redirect(303, '/auth/error');
		}

		// create user settings
		await supabase.from('user_settings').insert({
			username,
			user_id: data.user?.id
		});

		return;
	},
	login: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { data, error } = await supabase.auth.signInWithPassword({ email, password });

		if (error) {
			console.error(error);
			return redirect(303, '/auth/error');
		}

		return;
	}
};
