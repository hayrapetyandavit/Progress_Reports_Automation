import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createSubjectAction, updateSubjectByIdAction } from '../../redux/subject/subjectSlice';
import { subjectSelector } from '../../redux/subject/subjectSelector';
import { TCourse } from '../../types/courseTypes';
import { Trainer } from '../../types/trainerTypes';
import PopUpTitle from '../../components/PopUpTitle/PopUpTitle';
import PopUpButton from '../../components/PopUpButton/PopUpButton';
import { getTrainerByCourseAction, trainerReset } from '../../redux/trainer/trainerSlice';

interface IProps {
	data: TCourse[];
	dataTrainers: Trainer[];
	btnType: string;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	show: boolean;
}
interface FinalData {
	id?: number;
	name: string;
	max_score: string;
	weightage?: string;
	courseId: string;
	staffId: string;
}

const AddSubjectsForm: React.FC<IProps> = (props) => {
	const [checkbox, setCheckbox] = useState<boolean>(false);

	const dispatch = useDispatch();
	const subject = useSelector(subjectSelector);
	const onSubmit = (data: any, e: any) => {
		const finalData: FinalData = {
			id: subject[0]?.id,
			max_score: data.balls,
			name: data.name,
			courseId: data.selectGroup,
			staffId: data.selectTrainer,
		};

		if (checkbox) {
			finalData.weightage = data.weightage;
		}

		if (e.nativeEvent.submitter.name === 'saveAndAdd') {
			dispatch(createSubjectAction(finalData));
			props.setShow(true);
		}
		if (e.nativeEvent.submitter.name === 'save') {
			dispatch(createSubjectAction(finalData));
			props.setShow(false);
		}
		if (e.nativeEvent.submitter.name === 'update') {
			dispatch(updateSubjectByIdAction(finalData));
			props.setShow(false);
		}
		setCheckbox(false);
		reset({ name: '', selectTrainer: 'default', selectGroup: 'default', balls: '', weightage: '' });
	};
	const onFail = (error: any) => {
		props.setShow(true);
	};

	const {
		register,
		reset,
		watch,
		formState: { errors },
		handleSubmit,
	} = useForm<{
		name: string;
		balls: string;
		weightage?: string;
		selectGroup: string;
		selectTrainer: string;
	}>();

	const mySelectCourse = watch('selectGroup');
	const mySelectTrainer = watch('selectTrainer');
	useEffect(() => {
		if (mySelectCourse !== 'default') {
			dispatch(getTrainerByCourseAction(mySelectCourse));
		}
	}, [dispatch, mySelectCourse]);

	useEffect(() => {
		return () => {
			dispatch(trainerReset());
		};
	}, []);
	useEffect(() => {
		if (props.btnType === 'edit') {
			reset({
				name: subject[0]?.name,
				selectGroup: `${subject[0]?.courseId}`,
				selectTrainer: `${subject[0]?.staffId}`,
				weightage: `${subject[0]?.weightage}`,
				balls: `${subject[0]?.max_score}`,
			});
		} else {
			reset({ name: '', selectTrainer: 'default', selectGroup: 'default', weightage: '', balls: '' });
		}
	}, [reset, props.btnType, subject]);

	return (
		<form className="add-group-form__content" onSubmit={handleSubmit(onSubmit, onFail)}>
			<div className="form_title">
				<PopUpTitle type={props.btnType} title="subject" />
			</div>
			<div className="input__grp">
				<label htmlFor="name" className="input">
					<input
						type="text"
						className="input__field"
						placeholder=" "
						id="name"
						{...register('name', {
							required: true,
							pattern: /^[a-zA-Z_-]{3,30}$/,
						})}
					/>
					<span className="input__label">Name</span>
				</label>
				{errors.name ? (
					<>
						{errors.name.type === 'required' && (
							<span className="input-invalid">⚠ This field is required</span>
						)}
						{errors.name.type === 'pattern' && (
							<span className="input-invalid">⚠ Please enter valid name</span>
						)}
					</>
				) : null}
			</div>
			<div className="input__grp">
				<label htmlFor="balls" className="input">
					<input
						type="number"
						className="input__field"
						placeholder=" "
						id="balls"
						{...register('balls', {
							required: true,
							pattern: /^[1-9]\d*$/,
						})}
					/>
					<span className="input__label">Max Score</span>
				</label>
				{errors.balls ? (
					<>
						{errors.balls.type === 'required' && (
							<span className="input-invalid">⚠ This field is required</span>
						)}
						{errors.balls.type === 'pattern' && (
							<span className="input-invalid">⚠ Please enter valid number</span>
						)}
					</>
				) : null}
			</div>
			{checkbox && (
				<div className="input__grp">
					<label htmlFor="weightage" className="input">
						<input
							type="number"
							className="input__field"
							placeholder=" "
							id="weightage"
							{...register('weightage', {
								required: true,
								pattern: /^[1-9]\d*$/,
							})}
						/>
						<span className="input__label">Weightage</span>
					</label>
					{errors.weightage ? (
						<>
							{errors.weightage.type === 'required' && (
								<span className="input-invalid">⚠ This field is required</span>
							)}
							{errors.weightage.type === 'pattern' && (
								<span className="input-invalid">⚠ Please enter valid number</span>
							)}
						</>
					) : null}
				</div>
			)}

			<div className="input__grp">
				<select
					id="selectGroup"
					{...register('selectGroup', {
						required: true,
					})}
					value={mySelectCourse}
				>
					<option key={uuid()} value="default" disabled hidden>
						Select group name
					</option>
					{props.data.map((option) => {
						return (
							<option key={uuid()} value={option.id}>
								{option.name}
							</option>
						);
					})}
				</select>
				{errors.selectGroup ? (
					<>
						{errors.selectGroup.type === 'required' && (
							<span className="input-invalid">⚠ This field is required</span>
						)}
					</>
				) : null}
			</div>
			<div className="input__grp">
				<select
					id="selectTrainer"
					{...register('selectTrainer', {
						required: true,
					})}
					value={mySelectTrainer}
				>
					<option key={uuid()} value="default" disabled hidden>
						Select Trainer
					</option>
					{props.dataTrainers.map((option) => {
						return (
							<option key={uuid()} value={option.id}>
								{option.name}
							</option>
						);
					})}
				</select>
				{errors.selectTrainer ? (
					<>
						{errors.selectTrainer.type === 'required' && (
							<span className="input-invalid">⚠ This field is required</span>
						)}
					</>
				) : null}
			</div>
			<div className="input__grp">
				<label htmlFor="isAssessment" className="checkbox">
					<input
						type="checkbox"
						id="isAssessment"
						checked={checkbox}
						defaultChecked={checkbox}
						className="input__fiel"
						onChange={() => setCheckbox(!checkbox)}
					/>
					<span className="checkbox__lab">Assessment</span>
				</label>
			</div>
			<PopUpButton type={props.btnType} />
		</form>
	);
};

export default AddSubjectsForm;
