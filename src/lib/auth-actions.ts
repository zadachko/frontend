'use server';

import { createClient } from '@/lib/create-supabase-client';

export async function loginAction(email: string, password: string) {
	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	if (error) {
		if (error.code === 'invalid_credentials') {
			return {
				error: {
					name: 'INVALID_CREDENTIALS' as const,
					message: 'Invalid credentials provided' as const,
					cause: error,
				},
			};
		}
	}

	return { success: true, error: null };
}
export async function logoutAction() {
	const supabase = await createClient();
	const { error } = await supabase.auth.signOut();
	if (error) {
		throw error;
		// return { error: 'Failed to logout' };
	}
	return { success: true };
}
