import { put, call } from 'redux-saga/effects';
import { notify } from '../../utils';
import {
	DataTrainerReport,
	getReportType,
	Trainer,
	TrainerByID,
	TrainerData,
	TrainerReport,
	UpdateTrainerReport,
} from '../../types/trainerTypes';
import {
	createTrainerService,
	getTrainerByIdService,
	Message,
	getAllTrainersService,
	deleteTrainerByIdService,
	updateTrainerByIdService,
	getTrainerByCourseService,
	createTrainerReportService,
	getTrainerReportByStudentIdService,
	updateTrainerReportService,
} from '../../services/trainerService';
import { AuthData } from '../../types/authTypes';
import {
	getAllTrainersFailed,
	createTrainerSuccesed,
	createTrainerFailed,
	getAllTrainersSuccesed,
	getTrainerByIdSuccesed,
	getTrainerByIdFailed,
	updateTrainerByIdSuccesed,
	updateTrainerByIdFailed,
	deleteTrainerByIdSuccesed,
	deleteTrainerByIdFailed,
	getAllTrainersAction,
	createTrainerReportSuccess,
	createTrainerReportFailed,
	getReportByStudentIdSuccess,
	updateStudentReportForTrainerSuccess,
	updateStudentReportForTrainerFailed,
} from './trainerSlice';

export interface ITrainer {
	type: string;
	payload: Trainer;
}

export function* getTrainerById(data: TrainerData) {
	try {
		const response: Response = yield call(getTrainerByIdService, data.payload);
		if (!response.ok) {
			throw new Error('Trainer get failed');
		}
		const trainer: TrainerByID[] = yield response.json() as Promise<TrainerByID[]>;
		yield put(getTrainerByIdSuccesed(trainer));
	} catch (error: any) {
		yield put(getTrainerByIdFailed(error.message));
	}
}

export function* getTrainerByCourse(data: TrainerData) {
	try {
		const response: Response = yield call(getTrainerByCourseService, data.payload);
		if (!response.ok) {
			throw new Error('Trainers get failed');
		}
		const trainer: TrainerByID[] = yield response.json() as Promise<TrainerByID[]>;
		yield put(getAllTrainersSuccesed(trainer));
	} catch (error: any) {
		yield put(getAllTrainersFailed(error.message));
	}
}

export function* deleteTrainerById(data: TrainerData) {
	try {
		const response: Response = yield call(deleteTrainerByIdService, data.payload);
		if (!response.ok) {
			throw new Error('Trainers delete failed');
		}
		const message: Message = yield response.json() as Promise<Message>;
		yield put(deleteTrainerByIdSuccesed(message));
		notify(message.message);
		yield put(getAllTrainersAction());
	} catch (error: any) {
		yield put(deleteTrainerByIdFailed(error.message));
	}
}

// to do
export function* updateTrainer(data: ITrainer) {
	try {
		const response: Response = yield call(updateTrainerByIdService, data.payload);
		if (!response.ok) {
			throw new Error('Trainers updated failed');
		}
		const message: Message = yield response.json() as Promise<Message>;
		yield put(getAllTrainersAction());
		yield put(updateTrainerByIdSuccesed(message));
		notify(message.message);
	} catch (error: any) {
		yield put(updateTrainerByIdFailed(error.message));
	}
}

export function* getTrainers() {
	try {
		const response: Response = yield call(getAllTrainersService);
		if (!response.ok) {
			throw new Error('Trainers get failed');
		}
		const trainer: Trainer[] = yield response.json() as Promise<Trainer[]>;
		yield put(getAllTrainersSuccesed(trainer));
	} catch (error: any) {
		yield put(getAllTrainersFailed(error.message));
	}
}

export function* createTrainer(data: AuthData) {
	try {
		console.log(data.payload.form);

		const response: Response = yield call(createTrainerService, data.payload.form);
		if (!response.ok) {
			throw new Error('Trainer create failed');
		}
		const trainer: Message = yield response.json() as Promise<Message>;

		yield put(getAllTrainersAction());
		yield put(createTrainerSuccesed(trainer));
	} catch (error: any) {
		yield put(createTrainerFailed(error.message));
	}
}

export function* createTrainerReport(data: DataTrainerReport) {
	try {
		console.log(data.payload);
		const response: Response = yield call(createTrainerReportService, data.payload);
		if (!response.ok) {
			throw new Error('Failed to create report');
		}
		const message: Message = yield response.json() as Promise<Message>;
		notify(message.message);
		yield put(createTrainerReportSuccess(message));
	} catch (error: any) {
		yield put(createTrainerReportFailed(error.message));
	}
}
export function* updateTrainerReport(data: UpdateTrainerReport) {
	try {
		console.log(data.payload);
		const response: Response = yield call(updateTrainerReportService, data.payload);
		if (!response.ok) {
			throw new Error('Failed to update report');
		}
		const message: Message = yield response.json() as Promise<Message>;
		notify(message.message);
		yield put(updateStudentReportForTrainerSuccess(message));
	} catch (error: any) {
		yield put(updateStudentReportForTrainerFailed(error.message));
	}
}

export function* getTrainerReportByStudent(data: getReportType) {
	try {
		console.log(data.payload);
		const response: Response = yield call(getTrainerReportByStudentIdService, data.payload);
		if (!response.ok) {
			throw new Error('Failed to get report');
		}
		const report: TrainerReport[] = yield response.json() as Promise<TrainerReport[]>;
		yield put(getReportByStudentIdSuccess(report));
	} catch (error: any) {
		yield put(getReportByStudentIdSuccess(error.message));
	}
}
