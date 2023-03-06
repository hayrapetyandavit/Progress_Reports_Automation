export interface Trainer {
	id?: number;
	name: string;
	surname: string;
	email: string;
}

export interface TrainerByID extends Trainer {
	courses: [
		{
			id: number;
			name: string;
			course_model: {
				courseId: number;
				staffId: number;
			};
		}
	];
}

export interface TrainerSliceState {
	trainers: Trainer[];
	trainer: TrainerByID[];
	message: {};
	error: boolean;
	loading: boolean;
}

export interface TrainerData {
	type: string;
	payload: string;
}

export interface TrainerId {
	id: string;
}

export interface Message {
	message: string;
}
