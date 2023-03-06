import { UpdateReportByAdmin } from '../types/reportTypes';

export const getReportService = async (reports: any) => {
	const report = await fetch(`http://localhost:3303/final_report/`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(reports),
	});
	return report;
};

export const sendReportService = async (reports: any) => {
	const report = await fetch(`http://localhost:3303/final_report/send`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(reports),
	});
	return report;
};

// --
// app.put("/trainer_report/edit/:id", updateTrainerReportByAdmin);

export const updateReportByAdminService = async (data: UpdateReportByAdmin) => {
	const report = await fetch(`http://localhost:3303/trainer_report/edit/${data.id}`, {
		method: 'PUT',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ edited_comment: data.edited_comment }),
	});
	return report;
};
