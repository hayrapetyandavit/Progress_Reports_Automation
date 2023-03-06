import { authState } from '../types/authTypes';

export interface IUser {
	name: string;
	id: number;
	email: string;
	roles: string;
}

const signIn = async (form: authState): Promise<Response> => {
	const response = await fetch(`http://localhost:3303/auth/signin`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			...form,
		}),
	});
	return response;
};

const updateProfileService = async (form: authState): Promise<Response> => {
	const response = await fetch(`http://localhost:3303/profile/update`, {
		method: 'PUT',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			...form,
		}),
	});
	return response;
};

const logout = async () => {
	await fetch(`http://localhost:3303/auth/logout`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});
};
export { signIn, logout, updateProfileService };
