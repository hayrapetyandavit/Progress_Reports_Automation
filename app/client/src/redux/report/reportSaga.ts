import { call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { notify } from '../../utils';
import { ICourse, Message } from '../../types/courseTypes';
import {
	getReportFailed,
	getReportSuccesed,
	sendReportFailed,
	sendReportSuccesed,
	updateReportByAdminFailed,
	updateReportByAdminSuccesed,
} from './reportSlice';

import {
	createCourseService,
	getAllCoursesService,
	getCourseByIdService,
	updateCourseByIdService,
	deleteCourseByIdService,
} from '../../services/courseService';
import {
	getReportService,
	sendReportService,
	updateReportByAdminService,
} from '../../services/reportService';
import { Data, TypeUpdateReportByAdmin } from '../../types/reportTypes';
import { TStudent } from '../../types/studentTypes';

function* getReport(data: ICourse) {
	try {
		const response: Response = yield call(getReportService, data.payload);
		if (!response.ok) {
			throw new Error('Course create failed');
		}
		const report: [TStudent, [Data], [Data]] = yield response.json() as Promise<[TStudent, [Data], [Data]]>;
		// notify("Report Created successfully");
		yield put(getReportSuccesed(report));
	} catch (error: any) {
		yield put(getReportFailed(error.message));
	}
}

function* sendReport(data: ICourse) {
	try {
		const response: Response = yield call(sendReportService, data.payload);
		if (!response.ok) {
			throw new Error('Courses get failed');
		}
		const message: Message = yield response.json() as Promise<Message>;
		notify(message.message);
		yield put(sendReportSuccesed(message));
	} catch (error: any) {
		notify(error.message);
		yield put(sendReportFailed(error.message));
	}
}

// function* updateCourseById(data: ICourse) {
// 	try {
// 		const response: Response = yield call(updateCourseByIdService, data.payload);
// 		if (!response.ok) {
// 			throw new Error('Course updated failed');
// 		}
// 		const { message }: Message = yield response.json() as Promise<Message>;
// 		yield put(updateCourseByIdSuccesed(message));
// 		notify(message);
// 		yield put(getAllCoursesAction());
// 	} catch (error: any) {
// 		yield put(updateCourseByIdFailed(error.message));
// 	}
// }

function* updateReportByAdmin(data: TypeUpdateReportByAdmin) {
	try {
		console.log(data.payload);
		const response: Response = yield call(updateReportByAdminService, data.payload);
		if (!response.ok) {
			throw new Error('Courses get failed');
		}
		const message: Message = yield response.json() as Promise<Message>;
		notify(message.message);
		yield put(updateReportByAdminSuccesed(message));
	} catch (error: any) {
		notify(error.message);
		yield put(updateReportByAdminFailed(error.message));
	}
}

export { getReport, sendReport, updateReportByAdmin };
