import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configApp/createStore';

const selectSelf = (state: RootState) => state;

const coursesSelector = createSelector(selectSelf, (state) => state.courses.courses);
const loadingSelector = createSelector(selectSelf, (state) => state.courses.loading);
const errorSelector = createSelector(selectSelf, (state) => state.courses.error);
const courseSelector = createSelector(selectSelf, (state) => state.courses.course);
const messageSelector = createSelector(selectSelf, (state) => state.courses.message);

export { coursesSelector, courseSelector, loadingSelector, errorSelector, messageSelector };
