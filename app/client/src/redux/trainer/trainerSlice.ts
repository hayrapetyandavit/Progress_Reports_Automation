import { createSlice } from '@reduxjs/toolkit';
import { TrainerSliceState } from '../../types/trainerTypes';
import { getReport } from '../report/reportSaga';

const initialState: TrainerSliceState = {
	trainers: [],
	trainer: [],
	message: {},
	loading: true,
	error: false,
	studentReport: [],
};

const trainerSlice = createSlice({
	name: 'trainers',
	initialState: initialState,
	reducers: {
		createTrainerAction: (state, action) => {},
		createTrainerSuccesed: (state, action) => {
			state.message = action.payload;
		},
		createTrainerFailed: (state, action) => {
			state.message = action.payload;
		},
		getAllTrainersAction: (state) => {
			state.loading = true;
		},
		getAllTrainersSuccesed: (state, action) => {
			state.trainers = action.payload;
			state.loading = false;
		},
		getAllTrainersFailed: (state, action) => {
			// state.trainers = initialState.trainers;
			state.message = action.payload;
			state.error = true;
		},
		getTrainerByIdAction: (state, action) => {},
		getTrainerByIdSuccesed: (state, action) => {
			state.trainer = action.payload;
			state.error = false;
		},
		getTrainerByIdFailed: (state, action) => {
			state.message = action.payload;
		},
		updateTrainerByIdAction: (state, action) => {},
		updateTrainerByIdSuccesed: (state, action) => {
			state.message = action.payload;
		},
		updateTrainerByIdFailed: (state, action) => {
			state.message = action.payload;
		},
		deleteTrainerByIdAction: (state, action) => {},
		deleteTrainerByIdSuccesed: (state, action) => {
			state.message = action.payload;
		},
		deleteTrainerByIdFailed: (state, action) => {
			state.message = action.payload;
		},
		trainerReset: () => {
			return initialState;
		},
		getTrainerByCourseAction: (state, action) => {},
		createTrainerReportAction: (state, action) => {},
		createTrainerReportSuccess: (state, action) => {
			state.message = action.payload;
		},
		createTrainerReportFailed: (state, action) => {
			state.message = action.payload;
		},
		getReportByStudentIdAction: (state, action) => {},
		getReportByStudentIdSuccess: (state, action) => {
			state.studentReport = action.payload;
		},
		getReportByStudentIdFailed: (state, action) => {
			state.message = action.payload;
		},
		studentReportReset: (state) => {
			state.studentReport = [];
		},
		updateStudentReportForTrainerAction: (state, action) => {},
		updateStudentReportForTrainerFailed: (state, action) => {
			state.message = action.payload;
		},
		updateStudentReportForTrainerSuccess: (state, action) => {
			state.message = action.payload;
		},
	},
});

export const {
	createTrainerAction,
	createTrainerSuccesed,
	createTrainerFailed,
	getTrainerByIdAction,
	getTrainerByIdSuccesed,
	getTrainerByIdFailed,
	getAllTrainersAction,
	getAllTrainersSuccesed,
	getAllTrainersFailed,
	updateTrainerByIdAction,
	updateTrainerByIdFailed,
	updateTrainerByIdSuccesed,
	deleteTrainerByIdAction,
	deleteTrainerByIdSuccesed,
	deleteTrainerByIdFailed,
	trainerReset,
	getTrainerByCourseAction,
	createTrainerReportAction,
	createTrainerReportFailed,
	createTrainerReportSuccess,
	getReportByStudentIdAction,
	getReportByStudentIdFailed,
	getReportByStudentIdSuccess,
	studentReportReset,
	updateStudentReportForTrainerAction,
	updateStudentReportForTrainerFailed,
	updateStudentReportForTrainerSuccess
} = trainerSlice.actions;

export default trainerSlice;
