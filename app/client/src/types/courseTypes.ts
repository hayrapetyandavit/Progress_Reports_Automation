export type TCourse = {
	id?: number;
	name: string;
	startDate: string;
	endDate: string;
};

export interface CourseSliceState {
	courses: TCourse[];
	course: TCourse[];
	message: {};
	error: boolean;
	loading: boolean;
}

export interface ICourse {
	type: string;
	payload: TCourse;
}

export interface ICourseId {
	type: string;
	payload: string;
}

export interface Message {
	message: string;
}
