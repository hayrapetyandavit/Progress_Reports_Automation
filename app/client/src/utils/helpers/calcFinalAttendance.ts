export const calcFinalAttendance = (data: any) => {
	let count = 0;
	let sum = 0;
	data?.[1]
		?.map((el: any) => {
			let sum = el.subjects.reduce((acc: number, el: any) => {
				return acc + el.trainer_reports[0].attendance;
			}, 0);
			return [sum, el.subjects.length];
		})
		.forEach((el: any) => {
			count += el[1];
			sum += el[0];
		});
	return isNaN(sum / count) ? 0 + '%' : sum / count + '%';
};
