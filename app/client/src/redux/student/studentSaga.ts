import { call, put } from 'redux-saga/effects';
import { notify } from '../../utils';
import { IStudents, TStudent, IStudentId, Message, ICourseId, ICourseIds } from '../../types/studentTypes';
import {
	createStudentSuccesed,
	createStudentFailed,
	getAllStudentsSuccesed,
	getAllStudentsFailed,
	getStudentByIdSuccesed,
	getStudentByIdFailed,
	getStudentsByTrainerIdSuccesed,
	getStudentsByTrainerIdFailed,
	updateStudentByIdSuccesed,
	updateStudentByIdFailed,
	deleteStudentByIdSuccesed,
	deleteStudentByIdFailed,
	getAllStudentsAction,
} from './studentSlice';

import {
	createStudentService,
	getAllStudentsByCourseService,
	getAllStudentsService,
	getStudentByIdService,
	getAllStudentsByTrainerIdService,
	updateStudentByIdService,
	deleteStudentByIdService,
	getStudentsByCoursesService,
} from '../../services/studentService';

function* createStudent(data: IStudents) {
	try {
		const response: Response = yield call(createStudentService, data.payload);
		if (!response.ok) {
			throw new Error('Create student failed');
		}
		const message: Message = yield response.json() as Promise<Message>;
		yield put(createStudentSuccesed(message));
		notify(message.message);
		yield put(getAllStudentsAction());
	} catch (error: any) {
		yield put(createStudentFailed(error.message));
	}
}

function* getStudentsData() {
	try {
		const response: Response = yield call(getAllStudentsService);
		if (!response.ok) {
			throw new Error('Students get failed');
		}
		const students: TStudent[] = yield response.json() as Promise<TStudent[]>;
		yield put(getAllStudentsSuccesed(students));
	} catch (error: any) {
		yield put(getAllStudentsFailed(error.message));
	}
}

function* getStudentsDataByCourse(data: ICourseId) {
	try {
		const response: Response = yield call(getAllStudentsByCourseService, data.payload);
		if (!response.ok) {
			throw new Error('get all students by course failed');
		}
		const students: TStudent[] = yield response.json() as Promise<TStudent[]>;
		yield put(getAllStudentsSuccesed(students));
	} catch (error: any) {
		yield put(getAllStudentsFailed(error.message));
	}
}
// --start

function* getStudentsDataByCourses(data: ICourseIds) {
	try {
		const response: Response = yield call(getStudentsByCoursesService, data.payload);
		if (!response.ok) {
			throw new Error('get all students by course failed');
		}
		const students: TStudent[] = yield response.json() as Promise<TStudent[]>;
		yield put(getAllStudentsSuccesed(students));
	} catch (error: any) {
		yield put(getAllStudentsFailed(error.message));
	}
}

function* getStudentsDataByTrainerId(data: IStudentId) {
	try {
		const response: Response = yield call(getAllStudentsByTrainerIdService, data.payload);
		if (!response.ok) {
			throw new Error('get all students by course failed');
		}
		const students: TStudent[] = yield response.json() as Promise<TStudent[]>;
		yield put(getStudentsByTrainerIdSuccesed(students));
	} catch (error: any) {
		yield put(getStudentsByTrainerIdFailed(error.message));
	}
}
// --end

function* getStudentById(data: IStudentId) {
	try {
		const response: Response = yield call(getStudentByIdService, data.payload);
		if (!response.ok) {
			throw new Error('student get failed');
		}
		const student: TStudent[] = yield response.json() as Promise<TStudent[]>;
		yield put(getStudentByIdSuccesed(student));
	} catch (error: any) {
		yield put(getStudentByIdFailed(error.message));
	}
}

function* updateStudentById(data: IStudents) {
	try {
		const response: Response = yield call(updateStudentByIdService, data.payload);
		if (!response.ok) {
			throw new Error('student update failed');
		}
		const message: Message = yield response.json() as Promise<Message>;
		yield put(updateStudentByIdSuccesed(message));
		notify(message.message);
		yield put(getAllStudentsAction());
	} catch (error: any) {
		yield put(updateStudentByIdFailed(error.message));
	}
}

function* deleteStudentById(data: IStudentId) {
	try {
		const response: Response = yield call(deleteStudentByIdService, data.payload);
		if (!response.ok) {
			throw new Error('student delete failed');
		}
		const message: Message = yield response.json() as Promise<Message>;
		yield put(deleteStudentByIdSuccesed(message));
		notify(message.message);
		yield put(getAllStudentsAction());
	} catch (error: any) {
		yield put(deleteStudentByIdFailed(error.message));
	}
}

export {
	createStudent,
	getStudentsData,
	getStudentById,
	getStudentsDataByCourse,
	getStudentsDataByCourses,
	getStudentsDataByTrainerId,
	updateStudentById,
	deleteStudentById,
};
