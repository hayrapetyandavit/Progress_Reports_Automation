import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import useQueryParams from '../../hooks/useQueryParams';
import { updateReportByAdmin } from '../../redux/report/reportSaga';
import { reportSelector } from '../../redux/report/reportSelector';
import { sendReportAction, getReportAction, updateReportByAdminAction } from '../../redux/report/reportSlice';
import { calcFinalAssessmentScore } from '../../utils/helpers/calcFinalAssessmentScore';
import { calcFinalAttendance } from '../../utils/helpers/calcFinalAttendance';
// import

import './reports.scss';

const SendReports: React.FC = (props: any) => {
	const [visible, setVisible] = useState(true);
	const { searchParams, setSearchParams } = useQueryParams();
	const dispatch = useDispatch();

	useEffect(() => {
		setSearchParams(JSON.parse(localStorage.getItem('reports') || ''));
		dispatch(getReportAction(JSON.parse(localStorage.getItem('reports') || '')));
	}, []);

	const report = useSelector(reportSelector);
	console.log(report);
	let hide = visible ? 'hide-result' : '';
	return (
		<div className="report__container">
			<div className="report__content">
				<h1 className="main-title report-title">
					{report?.[0]?.name} {report?.[0]?.surname}
				</h1>
				<table className="report-table" border={1} cellPadding={5} cellSpacing={5}>
					<thead>
						<tr>
							<th colSpan={2} className="th-result">
								ASSESSMENT RESULT
							</th>
						</tr>
						<tr>
							<td colSpan={1} className="td-assessment">
								Assessment
							</td>
							<td colSpan={1}>{`100 / ${calcFinalAssessmentScore(report)}`}</td>
						</tr>
						<tr>
							<td colSpan={1}>Attendance</td>
							<td colSpan={1}>{`100% / ${calcFinalAttendance(report)}`}</td>
						</tr>
					</thead>
				</table>
				<table className="report-table" border={1} cellPadding={5} cellSpacing={5}>
					<tbody>
						<tr>
							<th
								colSpan={3}
								className="th-result"
								onClick={(e) => {
									setVisible(!visible);
								}}
							>
								HOMEWORK RESULT
							</th>
						</tr>
						<tr className={'homework-result' + ' ' + hide}>
							<th colSpan={1} className="th-result th-2">
								Trainer
							</th>
							<th colSpan={1} className="th-result th-2">
								Topic
							</th>
							<th colSpan={1} className="th-result th-2">
								Result
							</th>
						</tr>
						{report?.[1]?.map((i: any) => {
							let trainerName = i.name + ' ' + i.surname;
							let rowSpan = 0;
							return i.subjects.map((item: any, itemIndex: number) => {
								// ++rowSpan;
								return (
									<tr className={'homework-result' + ' ' + hide}>
										{itemIndex === 0 ? <td rowSpan={i?.subjects?.length}>{trainerName}</td> : null}
										<td>{item.name}</td>
										<td>{`${item.max_score} / ${item.trainer_reports[0].graduate}`}</td>
									</tr>
								);
							});
						})}
					</tbody>
				</table>
				<div className="feedback__content">
					<h3 className="feedback-title">ASSESSMENT FEEDBACK</h3>
					<div className="feedback-body">
						{report?.[2]?.map((i: any, iIndex: number) => {
							return i.subjects.map((item: any, itemIndex: number) => {
								return (
									<div className="area-grp">
										<textarea name="" id="" cols={30} rows={5}>
											{item.trainer_reports[0].edited_comment === null
												? item.trainer_reports[0].comment
												: item.trainer_reports[0].edited_comment}
										</textarea>
										<Button
											value="Update Feedback"
											className="create-btn"
											updateReport={(e: any) => {
												dispatch(
													updateReportByAdminAction({
														id: item.trainer_reports?.[0].id,
														edited_comment: e.target.previousElementSibling.value,
													})
												);
											}}
										/>
									</div>
								);
							});
						})}
					</div>
				</div>
				<div className="send-btn">
					<Button
						value="Send Report"
						className="btn-modal"
						sendReport={() => {
							dispatch(sendReportAction(JSON.parse(localStorage.getItem('reports') || '')));
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default SendReports;
