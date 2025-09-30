'use server';

import { createClient } from '@/lib/create-supabase-client';

export async function loginAction(email: string, password: string) {
	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});
	console.log(error);
	if (error) {
		return { error: 'Invalid email or password' };
	}

	return { success: true };
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
