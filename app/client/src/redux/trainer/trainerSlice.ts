import { createSlice } from '@reduxjs/toolkit';
import { TrainerSliceState } from '../../types/trainerTypes';

const initialState: TrainerSliceState = {
	trainers: [],
	trainer: [],
	message: {},
	loading: true,
	error: false,
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
} = trainerSlice.actions;

export default trainerSlice;
