import { TrainerReport } from './reportTypes';

export type TSubject = {
	id?: number;
	name: string;
	courseId: number;
	staffId: number;
	max_score: number;
	weightage?: number | null;
	trainer_reports?: TrainerReport[];
};

export interface SubjectSliceState {
	subjects: TSubject[];
	subject: TSubject[];
	message: {};
	error: boolean;
	loading: boolean;
}

export interface ISubject {
	type: string;
	payload: TSubject;
}

export interface ISubjectId {
	type: string;
	payload: string;
}

export interface Message {
	message: string;
}
