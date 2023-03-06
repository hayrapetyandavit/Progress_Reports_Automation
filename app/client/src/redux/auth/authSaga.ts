import { NavigateFunction } from 'react-router-dom';
import { call, put } from 'redux-saga/effects';
import { IUser, logout, signIn, updateProfileService } from '../../services/authService';
import { notify } from '../../utils';

import { AuthData } from '../../types/authTypes';
import { Message } from '../../types/courseTypes';
import { courseReset, getAllCoursesAction, getCoursesByTrainerIdAction } from '../course/courseSlice';
import { getAllStudentsAction, studentReset } from '../student/studentSlice';
import { getAllSubjectAction, getSubjectByTrainerIdAction, subjectReset } from '../subject/subjectSlice';
import { getAllTrainersAction, trainerReset } from '../trainer/trainerSlice';
import { loginFailed, loginSuccesed, logoutSuccesed, updateProfileFailed, userReset } from './authSlice';
import { getCoursesByTrainerId } from '../course/courseSaga';

interface Data {
	type: string;
	payload: NavigateFunction;
}

export function* logoutUser(data: Data) {
	yield call(logout);
	yield put(logoutSuccesed());
	yield data.payload('login');
	yield localStorage.removeItem('user');
	yield resetStore();
}

export function* resetStore() {
	yield put(userReset());
	yield put(courseReset());
	yield put(studentReset());
	yield put(trainerReset());
	yield put(subjectReset());
}

export function* auth(data: AuthData) {
	try {
		const response: Response = yield call(signIn, data.payload.form);

		if (!response.ok) {
			throw new Error('Login failed');
		}
		const user: IUser = yield response.json() as Promise<IUser>;
		console.log(user.roles);

		if (user.roles === 'USER') {
			console.log('mtela');

			data.payload.navigate('trainer/courses');
		}
		yield put(getAllCoursesAction());
		yield localStorage.setItem('user', JSON.stringify(user));
		yield put(loginSuccesed(user));
	} catch (error: any) {
		// in typescript error can only be one of two types: "any" or "unknown"
		yield put(loginFailed(error.message));
	}
}

export function* updateProfile(data: AuthData) {
	try {
		const response: Response = yield call(updateProfileService, data.payload.form);
		if (!response.ok) {
			const message: Message = yield response.json() as Promise<Message>;
			throw new Error(message.message);
		}
		const user: IUser = yield response.json() as Promise<IUser>;
		yield localStorage.setItem('user', JSON.stringify(user));
		yield put(loginSuccesed(user));
	} catch (error: any) {
		// in typescript error can only be one of two types: "any" or "unknown"
		notify(error.message);
		yield put(updateProfileFailed(error.message));
	}
}

export function* getAllData() {
	yield put(getAllSubjectAction());
	yield put(getAllCoursesAction());
	yield put(getAllTrainersAction());
	yield put(getAllStudentsAction());
}
