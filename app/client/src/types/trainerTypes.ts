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
	studentReport: TrainerReport[]
}


export interface getReportType {
	type: string;
	payload: {
		studentId: string;
		subjectId: string
	}
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

export interface TrainerReport {
    subjectId:number;
    studentId: number | string;
    attendance: number | string;
    comment: string;
    graduate: number | string,
    staffId: number
	createdAt?: string;
	updatedAt?: string;
	id: number
}

export interface DataTrainerReport {
	type: string;
	payload: TrainerReport;
}

export interface UpdateTrainerReport {
	type: string;
	payload: {
		comment: string;
		graduate: number | string,
	    attendance: number | string;
		id:number
	}
}