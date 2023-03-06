import { takeEvery } from 'redux-saga/effects';
// Courses
import {
	createCourseAction,
	deleteCourseByIdAction,
	getAllCoursesAction,
	getCourseByIdAction,
	getCoursesByTrainerIdAction,
	updateCourseByIdAction,
} from './course/courseSlice';

import {
	createCourse,
	getCourseById,
	getCoursesData,
	updateCourseById,
	deleteCourseById,
	getCoursesByTrainerId,
} from './course/courseSaga';

// Trainers
import {
	getAllTrainersAction,
	updateTrainerByIdAction,
	getTrainerByIdAction,
	createTrainerAction,
	deleteTrainerByIdAction,
	getTrainerByCourseAction,
} from './trainer/trainerSlice';

import {
	createTrainer,
	getTrainers,
	getTrainerById,
	getTrainerByCourse,
	deleteTrainerById,
	updateTrainer,
} from './trainer/trainerSaga';

//Students
import {
	createStudentAction,
	getAllStudentsAction,
	getStudentByIdAction,
	getStudentByCourseAction,
	getStudentsByTrainerIdAction,
	getStudenstByCoursesAction,
	updateStudentByIdAction,
	deleteStudentByIdAction,
} from './student/studentSlice';

import {
	createStudent,
	getStudentsData,
	getStudentsDataByCourse,
	getStudentsDataByCourses,
	getStudentById,
	getStudentsDataByTrainerId,
	updateStudentById,
	deleteStudentById,
} from './student/studentSaga';

// Subject
import {
	createSubjectAction,
	getAllSubjectAction,
	getSubjectByIdAction,
	updateSubjectByIdAction,
	deleteSubjectByIdAction,
	getSubjectByCourseAction,
	getSubjectByTrainerIdAction,
} from './subject/subjectSlice';

import {
	createSubject,
	getSubjectsData,
	getSubjectById,
	updateSubjectById,
	deleteSubjectById,
	getSubjectByCourse,
	getSubjectsByTrainerId,
} from './subject/subjectSaga';

import { loginAction, logoutAction, refreshAction, updateProfileAction } from './auth/authSlice';
import { auth, getAllData, logoutUser, updateProfile } from './auth/authSaga';
import { getReportAction, sendReportAction, updateReportByAdminAction } from './report/reportSlice';
import { getReport, sendReport, updateReportByAdmin } from './report/reportSaga';

export default function* watchDataSaga() {
	yield takeEvery(loginAction.type, auth);
	yield takeEvery(refreshAction.type, getAllData);
	yield takeEvery(logoutAction.type, logoutUser);
	// Courses
	yield takeEvery(createCourseAction.type, createCourse);
	yield takeEvery(getAllCoursesAction.type, getCoursesData);
	yield takeEvery(getCourseByIdAction.type, getCourseById);
	yield takeEvery(getCoursesByTrainerIdAction.type, getCoursesByTrainerId);
	yield takeEvery(updateCourseByIdAction.type, updateCourseById);
	yield takeEvery(deleteCourseByIdAction.type, deleteCourseById);
	// Trainers
	yield takeEvery(createTrainerAction.type, createTrainer);
	yield takeEvery(getAllTrainersAction.type, getTrainers);
	yield takeEvery(getTrainerByIdAction.type, getTrainerById);
	yield takeEvery(getTrainerByCourseAction.type, getTrainerByCourse);
	yield takeEvery(updateTrainerByIdAction.type, updateTrainer);
	yield takeEvery(deleteTrainerByIdAction.type, deleteTrainerById);
	// Students
	yield takeEvery(createStudentAction.type, createStudent);
	yield takeEvery(getAllStudentsAction.type, getStudentsData);
	yield takeEvery(getStudentByIdAction.type, getStudentById);
	yield takeEvery(getStudentByCourseAction.type, getStudentsDataByCourse);
	yield takeEvery(getStudenstByCoursesAction.type, getStudentsDataByCourses);
	yield takeEvery(getStudentsByTrainerIdAction.type, getStudentsDataByTrainerId);
	yield takeEvery(updateStudentByIdAction.type, updateStudentById);
	yield takeEvery(deleteStudentByIdAction.type, deleteStudentById);
	// Subject
	yield takeEvery(createSubjectAction.type, createSubject);
	yield takeEvery(getAllSubjectAction.type, getSubjectsData);
	yield takeEvery(getSubjectByIdAction.type, getSubjectById);
	yield takeEvery(getSubjectByCourseAction.type, getSubjectByCourse);
	yield takeEvery(getSubjectByTrainerIdAction.type, getSubjectsByTrainerId);
	yield takeEvery(updateSubjectByIdAction.type, updateSubjectById);
	yield takeEvery(deleteSubjectByIdAction.type, deleteSubjectById);
	yield takeEvery(updateProfileAction.type, updateProfile);
	// Reports
	yield takeEvery(getReportAction.type, getReport);
	yield takeEvery(sendReportAction.type, sendReport);
	yield takeEvery(updateReportByAdminAction.type, updateReportByAdmin);
}
