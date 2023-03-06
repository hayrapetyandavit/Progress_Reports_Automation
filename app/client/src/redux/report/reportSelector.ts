import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configApp/createStore';

const selectSelf = (state: RootState) => state;

const reportSelector = createSelector(selectSelf, (state) => state.report.report);

export { reportSelector };
