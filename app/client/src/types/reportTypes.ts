import { TStudent } from './studentTypes';
import { TSubject } from './subjectTypes';

export interface Report {
	report: [TStudent, [Data], [Data]];
}

export interface Data {
	id?: number;
	name: string;
	surname: string;
	subjects: TSubject;
}
export interface ReportSlice {
	report: [TStudent, [Data], [Data]] | [];
	message: {};
	loading: boolean;
	error: boolean;
}

export interface TrainerReport {
	id: number;
	attendance: number;
	graduate: number;
	comment: string;
	edited_comment: null | string;
	studentId: number;
	subjectId: number;
	createdAt: string;
	updatedAt: string;
	staffId: number;
}

export interface UpdateReportByAdmin {
	id: number;
	edited_comment: null | string;
}

export interface TypeUpdateReportByAdmin {
	type: string;
	payload: UpdateReportByAdmin;
}
