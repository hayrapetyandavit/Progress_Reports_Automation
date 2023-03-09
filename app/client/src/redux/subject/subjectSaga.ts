import { call, put } from 'redux-saga/effects';
import { notify } from '../../utils';
import {
	createSubjectFailed,
	createSubjectSuccesed,
	deleteSubjectByIdFailed,
	deleteSubjectByIdSuccesed,
	getAllSubjectAction,
	getAllSubjectFailed,
	getAllSubjectSuccesed,
	getSubjectByIdFailed,
	getSubjectByIdSuccesed,
	getSubjectByTrainerIdSuccesed,
	getSubjectByTrainerIdFailed,
	updateSubjectByIdFailed,
	updateSubjectByIdSuccesed,
} from './subjectSlice';
import { ISubject, ISubjectId, Message, TSubject } from '../../types/subjectTypes';
import {
	createSubjectService,
	deleteSubjectByIdService,
	getAllSubjectService,
	getSubjectByCourseService,
	getSubjectsByTrainerIdService,
	getSubjectByIdService,
	updateSubjectByIdService,
} from '../../services/subjectService';

function* createSubject(data: ISubject) {
	try {
		const response: Response = yield call(createSubjectService, data.payload);
		if (!response.ok) {
			throw new Error('Subject create failed');
		}
		const message: Message = yield response.json() as Promise<Message>;
		yield put(createSubjectSuccesed(message));
		notify(message.message);
		yield put(getAllSubjectAction());
	} catch (error: any) {
		yield put(createSubjectFailed(error.message));
	}
}

function* getSubjectsData() {
	try {
		const response: Response = yield call(getAllSubjectService);
		if (!response.ok) {
			throw new Error('Subjects get failed');
		}
		const subjects: TSubject[] = yield response.json() as Promise<TSubject[]>;
		yield put(getAllSubjectSuccesed(subjects));
	} catch (error: any) {
		yield put(getAllSubjectFailed(error.message));
	}
}

function* getSubjectById(data: ISubjectId) {
	try {
		const response: Response = yield call(getSubjectByIdService, data.payload);
		if (!response.ok) {
			throw new Error('Subject get failed');
		}
		const subject: TSubject[] = yield response.json() as Promise<TSubject[]>;
		yield put(getSubjectByIdSuccesed(subject));
	} catch (error: any) {
		yield put(getSubjectByIdFailed(error.message));
	}
}

function* getSubjectByCourse(data: ISubjectId) {
	try {
		console.log(data.payload);
		
		const response: Response = yield call(getSubjectByCourseService, data.payload);
		if (!response.ok) {
			throw new Error('Subjects get failed');
		}
		const subject: TSubject[] = yield response.json() as Promise<TSubject[]>;
		yield put(getAllSubjectSuccesed(subject));
	} catch (error: any) {
		yield put(getAllSubjectFailed(error.message));
	}
}

// -- start
function* getSubjectsByTrainerId(data: ISubjectId) {
	try {
		const response: Response = yield call(getSubjectsByTrainerIdService, data.payload);
		if (!response.ok) {
			throw new Error('Subjects get failed');
		}
		
		const subject: TSubject[] = yield response.json() as Promise<TSubject[]>;
		console.log(subject);

		yield put(getSubjectByTrainerIdSuccesed(subject));
	} catch (error: any) {
		yield put(getSubjectByTrainerIdFailed(error.message));
	}
}
// -- end

function* updateSubjectById(data: ISubject) {
	try {
		const response: Response = yield call(updateSubjectByIdService, data.payload);
		if (!response.ok) {
			throw new Error('Subject updated failed');
		}
		const message: Message = yield response.json() as Promise<Message>;
		yield put(updateSubjectByIdSuccesed(message));
		notify(message.message);
		yield put(getAllSubjectAction());
	} catch (error: any) {
		yield put(updateSubjectByIdFailed(error.message));
	}
}

function* deleteSubjectById(data: ISubjectId) {
	try {
		const response: Response = yield call(deleteSubjectByIdService, data.payload);
		if (!response.ok) {
			throw new Error('Subject delete failed');
		}
		const message: Message = yield response.json() as Promise<Message>;
		yield put(deleteSubjectByIdSuccesed(message));
		notify(message.message);
		yield put(getAllSubjectAction());
	} catch (error: any) {
		yield put(deleteSubjectByIdFailed(error.message));
	}
}

export {
	createSubject,
	getSubjectsData,
	updateSubjectById,
	deleteSubjectById,
	getSubjectById,
	getSubjectByCourse,
	getSubjectsByTrainerId,
};
