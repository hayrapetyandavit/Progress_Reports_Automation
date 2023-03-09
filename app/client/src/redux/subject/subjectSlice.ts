import { createSlice } from '@reduxjs/toolkit';
import { SubjectSliceState } from '../../types/subjectTypes';

const initialState: SubjectSliceState = {
	subjects: [],
	subject: [],
	message: {},
	loading: true,
	error: false,
};

const subjectSlice = createSlice({
	name: 'subjects',
	initialState: initialState,
	reducers: {
		createSubjectAction: (state, action) => {},
		createSubjectSuccesed: (state, action) => {
			state.message = action.payload;
		},
		createSubjectFailed: (state, action) => {
			state.message = action.payload;
		},
		getAllSubjectAction: (state) => {
			state.loading = true;
		},
		// getSub
		getAllSubjectSuccesed: (state, action) => {
			state.subjects = action.payload;
			state.loading = false;
			state.error = false;
		},
		getAllSubjectFailed: (state, action) => {
			state.message = action.payload;
			state.error = true;
		},
		getSubjectByCourseAction: (state, action) => {},

		getSubjectByIdAction: (state, action) => {},
		getSubjectByIdSuccesed: (state, action) => {
			state.subject = action.payload;
		},
		getSubjectByIdFailed: (state, action) => {
			state.message = action.payload;
		},
		//
		getSubjectByTrainerIdAction: (state, action) => {},
		getSubjectByTrainerIdSuccesed: (state, action) => {
			console.log(action.payload,"action");
			
			state.subjects = action.payload;
		},
		getSubjectByTrainerIdFailed: (state, action) => {
			state.message = action.payload;
		},
		//
		updateSubjectByIdAction: (state, action) => {},
		updateSubjectByIdSuccesed: (state, action) => {
			state.message = action.payload;
		},
		updateSubjectByIdFailed: (state, action) => {
			state.message = action.payload;
		},
		deleteSubjectByIdAction: () => {},
		deleteSubjectByIdSuccesed: (state, action) => {
			state.message = action.payload;
		},
		deleteSubjectByIdFailed: (state, action) => {
			state.message = action.payload;
		},
		subjectReset: () => {
			return initialState;
		},
	},
});
export const {
	createSubjectAction,
	createSubjectSuccesed,
	createSubjectFailed,
	getAllSubjectAction,
	getAllSubjectSuccesed,
	getAllSubjectFailed,
	getSubjectByIdAction,
	getSubjectByIdFailed,
	getSubjectByIdSuccesed,
	getSubjectByCourseAction,
	getSubjectByTrainerIdAction,
	getSubjectByTrainerIdSuccesed,
	getSubjectByTrainerIdFailed,
	updateSubjectByIdAction,
	updateSubjectByIdSuccesed,
	updateSubjectByIdFailed,
	deleteSubjectByIdAction,
	deleteSubjectByIdSuccesed,
	deleteSubjectByIdFailed,
	subjectReset,
} = subjectSlice.actions;
export default subjectSlice;
