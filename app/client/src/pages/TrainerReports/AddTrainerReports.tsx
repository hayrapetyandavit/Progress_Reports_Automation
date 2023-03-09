import React, { useRef, useMemo, useState, useEffect } from 'react';
import AddStudentsForm from '../../pages/Students/AddStudentsForm';
import AddTrainersForm from '../../pages/Trainers/AddTrainersForm';
import AddSubjectsForm from '../../pages/Subjects/AddSubjectsForm';
import { motion, AnimatePresence } from 'framer-motion';

// import './addItem.scss';
import AddCoursesForm from '../../pages/Courses/AddCoursesForm';
import { useDispatch, useSelector } from 'react-redux';
import { coursesSelector } from '../../redux/course/courseSelector';
import { trainerReportSelector, trainersSelector } from '../../redux/trainer/trainerSelector';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import CloseIcon from '../../components/CloseIcon/CloseIcon';
import PopUpButton from '../../components/PopUpButton/PopUpButton';
import PopUpTitle from '../../components/PopUpTitle/PopUpTitle';
import { uuid } from 'uuidv4';
import { useForm, UseFormReset } from 'react-hook-form';
import {
	createTrainerReportAction,
	studentReportReset,
	updateStudentReportForTrainerAction,
} from '../../redux/trainer/trainerSlice';
import { userSelector } from '../../redux/auth/authSelector';

interface IProps {
	// title: string;
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	btnType: string;
	userId: string | number | undefined;
	subjectsSelectedOption: string;
}

const TrainerPopUp: React.FC<IProps> = (props) => {
	const { btnType, show, setShow, subjectsSelectedOption, userId } = props;
	const user = useSelector(userSelector);

	// const courses = useSelector(coursesSelector);
	// const trainers = useSelector(trainersSelector);
	const dispatch = useDispatch();
	const wrapperRef = useRef(null);
	const report = useSelector(trainerReportSelector);
	useOutsideClick(wrapperRef, setShow);
	const {
		register,
		reset,
		formState: { errors },
		handleSubmit,
	} = useForm<{
		attendance: string | number;
		graduate: string | number;
		comment: string;
	}>();
	let className = show ? 'add-item show trainer' : 'add-item';
	const onSubmit = (data: any, e: any) => {
		let finalData;
		if (subjectsSelectedOption) {
			// console.log(subjectsSelectedOption[0].id, userId, data);
			finalData = {
				subjectId: subjectsSelectedOption,
				studentId: userId,
				attendance: data.attendance,
				comment: data.comment,
				graduate: data.graduate,
				staffId: user.id,
			};
		}
		console.log(finalData);

		if (e.nativeEvent.submitter.name === 'create') {
			dispatch(createTrainerReportAction(finalData));
			reset({ comment: '', graduate: '', attendance: '' });
			setShow(false);
		}
		if (e.nativeEvent.submitter.name === 'update') {
			dispatch(
				updateStudentReportForTrainerAction({
					comment: data.comment,
					graduate: data.graduate,
					attendance: data.attendance,
					id: report?.[0]?.id,
				})
			);
			reset({ comment: '', graduate: '', attendance: 'Select attendance' });
			setShow(false);
		}
	};
	const onFail = (error: any) => {
		setShow(true);
	};

	useEffect(() => {
		if (btnType === 'update') {
			reset({
				comment: report?.[0]?.comment,
				graduate: `${report?.[0]?.graduate}`,
				attendance: report?.[0]?.attendance,
			});
		} else {
			reset({ comment: '', graduate: '', attendance: 'Select attendance' });
		}
	}, [btnType, reset, report]);
	useEffect(() => {
		return () => {
			console.log('unmount');
			dispatch(studentReportReset());
		};
	}, []);
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className={className}
				ref={wrapperRef}
			>
				<div className="add-item__content">
					<CloseIcon
						onClick={() => {
							setShow(false);
						}}
					/>
					<form className="add-group-form__content" onSubmit={handleSubmit(onSubmit, onFail)}>
						<div className="form_title">
							<PopUpTitle type={btnType} title="trainer" />
						</div>
						<div className="input__grp">
							<label htmlFor="attendance" className="input">
								<select
									id="attendance"
									{...register('attendance', {
										required: true,
									})}
								>
                                    <option key={''} value="Select attendance" disabled selected>
										Select attendance
									</option>
									<option value="100">present</option>
									<option value="0">absent</option>
								</select>
							</label>
							{errors.attendance ? (
								<>
									{errors.attendance.type === 'required' && (
										<span className="input-invalid">⚠ This field is required</span>
									)}
								</>
							) : null}
						</div>
						<div className="input__grp">
							<label htmlFor="graduate" className="input">
								<input
									type="number"
									className="input__field"
									placeholder=" "
									id="graduate"
									{...register('graduate', {
										required: true,
									})}
								/>
								<span className="input__label">Graduate</span>
							</label>
							{errors.graduate ? (
								<>
									{errors.graduate.type === 'required' && (
										<span className="input-invalid">⚠ This field is required</span>
									)}
									{errors.graduate.type === 'pattern' && (
										<span className="input-invalid">⚠ Please enter valid name</span>
									)}
								</>
							) : null}
						</div>
						<div className="input__grp">
							<label htmlFor="comment" className="input">
								<input
									type="comment"
									className="input__field"
									placeholder=" "
									id="comment"
									{...register('comment', {
										required: true,
									})}
								/>
								<span className="input__label">Comment</span>
							</label>
							{errors.comment ? (
								<>
									{errors.comment.type === 'required' && (
										<span className="input-invalid">⚠ This field is required</span>
									)}
								</>
							) : null}
						</div>
						<PopUpButton type={btnType === 'update' ? 'edit' : btnType} />
					</form>
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default TrainerPopUp;
