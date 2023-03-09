import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configApp/createStore';

const selectSelf = (state: RootState) => state;

const trainersSelector = createSelector(selectSelf, (state) => state.trainers.trainers);
const trainerSelector = createSelector(selectSelf, (state) => state.trainers.trainer);
const loadingSelector = createSelector(selectSelf, (state) => state.trainers.loading);
const errorSelector = createSelector(selectSelf, (state) => state.trainers.error);
const messageSelector = createSelector(selectSelf, (state) => state.trainers.message);
const trainerReportSelector = createSelector(selectSelf, (state)=> state.trainers.studentReport)
export { trainersSelector, trainerSelector, loadingSelector, errorSelector, messageSelector ,trainerReportSelector};
