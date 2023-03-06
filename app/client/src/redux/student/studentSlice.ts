import { createSlice } from '@reduxjs/toolkit';
import { StudentSliceState } from '../../types/studentTypes';

const initialState: StudentSliceState = {
	students: [],
	student: [],
	message: {},
	loading: true,
	error: false,
};

const studentSlice = createSlice({
	name: 'students',
	initialState: initialState,
	reducers: {
		createStudentAction: (state, action) => {},
		createStudentSuccesed: (state, action) => {
			state.message = action.payload;
		},
		createStudentFailed: (state, action) => {
			state.message = action.payload;
		},
		getAllStudentsAction: (state) => {
			state.loading = true;
		},
		getStudentByCourseAction: (state, action) => {},
		getAllStudentsSuccesed: (state, action) => {
			state.students = action.payload;
			state.loading = false;
			state.error = false;
		},
		getAllStudentsFailed: (state, action) => {
			state.students = [];
			state.message = action.payload;
			state.error = true;
		},
		// ---
		getStudenstByCoursesAction: (state, action) => {},
		//
		getStudentByIdAction: (state, action) => {},
		getStudentByIdSuccesed: (state, action) => {
			state.student = action.payload;
		},
		getStudentByIdFailed: (state, action) => {
			state.message = action.payload;
		},
		//
		getStudentsByTrainerIdAction: (state, action) => {},
		getStudentsByTrainerIdSuccesed: (state, action) => {
			state.students = action.payload;
		},
		getStudentsByTrainerIdFailed: (state, action) => {
			state.message = action.payload;
		},
		//
		updateStudentByIdAction: (state, action) => {},
		updateStudentByIdSuccesed: (state, action) => {
			state.message = action.payload;
		},
		updateStudentByIdFailed: (state, action) => {
			state.message = action.payload;
		},
		deleteStudentByIdAction: (state, action) => {},
		deleteStudentByIdSuccesed: (state, action) => {
			state.message = action.payload;
		},
		deleteStudentByIdFailed: (state, action) => {
			state.message = action.payload;
		},
		studentReset: () => {
			return initialState;
		},
	},
});
export const {
	createStudentAction,
	createStudentSuccesed,
	createStudentFailed,
	getAllStudentsAction,
	getAllStudentsSuccesed,
	getAllStudentsFailed,
	getStudentByIdAction,
	getStudentByIdSuccesed,
	getStudentByIdFailed,
	getStudentsByTrainerIdAction,
	getStudentsByTrainerIdSuccesed,
	getStudentsByTrainerIdFailed,
	getStudenstByCoursesAction,
	updateStudentByIdAction,
	updateStudentByIdSuccesed,
	updateStudentByIdFailed,
	deleteStudentByIdAction,
	deleteStudentByIdSuccesed,
	deleteStudentByIdFailed,
	studentReset,
	getStudentByCourseAction,
} = studentSlice.actions;

export default studentSlice;
