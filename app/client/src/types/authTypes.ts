import { NavigateFunction } from 'react-router-dom';

export interface authState {
	name?: string;
	surname?: string;
	email: string;
	password?: string;
	courseId?: [];
	oldPassword?: string;
	newPassword?: string;
}

export interface AuthData {
	type: string;
	payload: {
		form: authState;
		navigate: NavigateFunction;
	};
}
