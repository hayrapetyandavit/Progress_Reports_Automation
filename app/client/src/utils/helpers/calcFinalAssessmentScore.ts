export const calcFinalAssessmentScore = (data: any) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	let finalAssessmentPass = 0;
	data?.[2]?.forEach((el: any) => {
		finalAssessmentPass += el.subjects.reduce((acc: number, el: any) => {
			return acc + (el.weightage * ((el.trainer_reports[0].graduate * 100) / el.max_score)) / 100;
		}, 0);
	});
	return finalAssessmentPass;
};
