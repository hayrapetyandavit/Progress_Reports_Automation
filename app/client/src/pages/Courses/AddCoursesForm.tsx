import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createCourseAction, updateCourseByIdAction } from '../../redux/course/courseSlice';
import { courseSelector } from '../../redux/course/courseSelector';
import 'react-datepicker/src/stylesheets/datepicker.scss';
import PopUpTitle from '../../components/PopUpTitle/PopUpTitle';
import PopUpButton from '../../components/PopUpButton/PopUpButton';

interface IProps {
	btnType: string;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	show: boolean;
}

const AddGroupsForm: React.FC<IProps> = (props) => {
	const dispatch = useDispatch();
	const course = useSelector(courseSelector);

	const onSubmit = (data: any, e: any) => {
		const finalData = {
			id: course[0]?.id,
			name: data.name,
			startDate: data.startDate,
			endDate: data.endDate,
		};
		if (e.nativeEvent.submitter.name === 'saveAndAdd') {
			dispatch(createCourseAction(finalData));
			reset({ name: '', startDate: new Date(), endDate: new Date() });
			props.setShow(true);
		}
		if (e.nativeEvent.submitter.name === 'save') {
			dispatch(createCourseAction(finalData));
			reset({ name: '', startDate: new Date(), endDate: new Date() });
			props.setShow(false);
		}
		if (e.nativeEvent.submitter.name === 'update') {
			dispatch(updateCourseByIdAction(finalData));
			reset({ name: '', startDate: new Date(), endDate: new Date() });
			props.setShow(false);
		}
	};
	const onFail = (error: any) => {
		props.setShow(true);
	};

	const {
		control,
		reset,
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<{ name: string; startDate: Date; endDate: Date }>();
	useEffect(() => {
		if (course.length) {
			if (props.btnType === 'edit') {
				reset({
					name: course[0]?.name,
					startDate: new Date(course[0]?.startDate),
					endDate: new Date(course[0]?.endDate),
				});
			} else {
				reset({ name: '', startDate: new Date(), endDate: new Date() });
			}
		}
	}, [reset, props.btnType, course]);

	return (
		<form className="add-group-form__content" onSubmit={handleSubmit(onSubmit, onFail)}>
			<div className="form_title">
				<PopUpTitle type={props.btnType} title="course" />
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
				<Controller
					control={control}
					name="startDate"
					render={({ field }: any) => (
						<DatePicker
							className="data-picker"
							selected={field.value}
							minDate={new Date()}
							onChange={(date: Date) => field.onChange(date)}
							selectsStart
							autoComplete="off"
							startDate={new Date()}
							placeholderText="Select Start Date"
							id="start-date"
						/>
					)}
				/>
			</div>
			<div className="input__grp">
				<Controller
					control={control}
					name="endDate"
					rules={{ required: true }}
					render={({ field }: any) => (
						<DatePicker
							className="data-picker"
							selected={field.value}
							minDate={new Date()}
							onChange={(date: Date) => field.onChange(date)}
							selectsEnd
							autoComplete="off"
							startDate={new Date()}
							placeholderText="Select End Date"
							id="end-date"
						/>
					)}
				/>
			</div>
			<PopUpButton type={props.btnType} />
		</form>
	);
};

export default AddGroupsForm;
