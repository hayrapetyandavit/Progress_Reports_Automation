import { createSlice } from '@reduxjs/toolkit';
import { CourseSliceState, TCourse } from '../../types/courseTypes';

const initialState: CourseSliceState = {
	courses: [],
	course: [],
	message: {},
	loading: true,
	error: false, //new line
};

const courseSlice = createSlice({
	name: 'courses',
	initialState: initialState,
	reducers: {
		createCourseAction: (state, action) => {},
		createCourseSuccesed: (state, action) => {
			state.message = action.payload;
		},
		createCourseFailed: (state, action) => {
			state.message = action.payload;
		},
		getAllCoursesAction: (state) => {
			state.loading = true;
		},
		getAllCoursesSuccesed: (state, action) => {
			state.courses = action.payload;
			state.loading = false;
			state.error = false; //new line
		},
		getAllCoursesFailed: (state, action) => {
			state.message = action.payload;
			state.error = true; //new line
		},
		getCourseByIdAction: (state, action) => {},
		getCourseByIdSuccesed: (state, action) => {
			state.course = action.payload;
		},
		getCourseByIdFailed: (state, action) => {
			state.message = action.payload;
		},
		// --start --trainer-home
		getCoursesByTrainerIdAction: (state, action) => {
			state.loading = true;
		},
		// --end --trainer-home
		updateCourseByIdAction: (state, action) => {},
		updateCourseByIdSuccesed: (state, action) => {
			state.message = action.payload;
		},
		updateCourseByIdFailed: (state, action) => {
			state.message = action.payload;
		},
		deleteCourseByIdAction: (state, action) => {},
		deleteCourseByIdSuccesed: (state, action) => {
			state.message = action.payload;
		},
		deleteCourseByIdFailed: (state, action) => {
			state.message = action.payload;
		},
		courseReset: () => {
			return initialState;
		},
	},
});
export const {
	createCourseAction,
	createCourseSuccesed,
	createCourseFailed,
	getAllCoursesAction,
	getAllCoursesSuccesed,
	getAllCoursesFailed,
	getCourseByIdAction,
	getCourseByIdSuccesed,
	getCourseByIdFailed,
	getCoursesByTrainerIdAction,
	updateCourseByIdAction,
	updateCourseByIdSuccesed,
	updateCourseByIdFailed,
	deleteCourseByIdAction,
	deleteCourseByIdSuccesed,
	deleteCourseByIdFailed,
	courseReset,
} = courseSlice.actions;
export default courseSlice;
