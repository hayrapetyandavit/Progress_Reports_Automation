import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authSlice from '../auth/authSlice';
import courseSlice from '../course/courseSlice';

import saga from '../saga';
import trainerSlice from '../trainer/trainerSlice';
import studentSlice from '../student/studentSlice';
import subjectSlice from '../subject/subjectSlice';
import reportSlice from '../report/reportSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
	reducer: {
		[authSlice.name]: authSlice.reducer,
		[studentSlice.name]: studentSlice.reducer,
		[trainerSlice.name]: trainerSlice.reducer,
		[subjectSlice.name]: subjectSlice.reducer,
		[courseSlice.name]: courseSlice.reducer,
		[reportSlice.name]: reportSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			thunk: false,
			serializableCheck: false,
		}).concat(sagaMiddleware);
	},
});

sagaMiddleware.run(saga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
