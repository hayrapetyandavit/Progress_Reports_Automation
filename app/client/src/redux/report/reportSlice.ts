import { createSlice } from '@reduxjs/toolkit';
import { ReportSlice } from '../../types/reportTypes';

const initialState: ReportSlice = {
	report: [],
	message: {},
	loading: true,
	error: false, //new line
};

const reportSlice = createSlice({
	name: 'report',
	initialState: initialState,
	reducers: {
		getReportAction: (state) => {
			state.loading = true;
		},
		getReportSuccesed: (state, action) => {
			state.report = action.payload;
			state.loading = false;
			state.error = false;
		},
		getReportFailed: (state, action) => {
			state.message = action.payload;
			state.error = true;
		},
		updateReportByAdminAction: (state, action) => {},
		updateReportByAdminSuccesed: (state, action) => {
			state.message = action.payload;
		},
		updateReportByAdminFailed: (state, action) => {
			state.message = action.payload;
		},
		sendReportAction: (state, action) => {},
		sendReportSuccesed: (state, action) => {
			state.message = action.payload;
		},
		sendReportFailed: (state, action) => {
			state.message = action.payload;
		},
		reportReset: () => {
			return initialState;
		},
	},
});
export const {
	reportReset,
	getReportAction,
	getReportFailed,
	getReportSuccesed,
	updateReportByAdminAction,
	updateReportByAdminSuccesed,
	updateReportByAdminFailed,
	sendReportAction,
	sendReportFailed,
	sendReportSuccesed,
} = reportSlice.actions;
export default reportSlice;
