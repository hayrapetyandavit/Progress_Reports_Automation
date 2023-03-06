import React, { ChangeEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { createTrainerAction, updateTrainerByIdAction } from '../../redux/trainer/trainerSlice';
import { trainerSelector } from '../../redux/trainer/trainerSelector';
import { TCourse } from '../../types/courseTypes';
import { coursesSelector } from '../../redux/course/courseSelector';
import PopUpTitle from '../../components/PopUpTitle/PopUpTitle';
import PopUpButton from '../../components/PopUpButton/PopUpButton';

interface IProps {
	data: TCourse[];
	btnType: string;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	show: boolean;
}
interface SelectElement {
	id: number;
	name: string;
}

const AddTrainersForm: React.FC<IProps> = (props) => {
	const dispatch = useDispatch();
	const [selectedValue, setSelectedValue] = useState<any>();
	const trainer = useSelector(trainerSelector);
	const courses = useSelector(coursesSelector);

	const onSubmit = (data: any, e: any) => {
		const dataSelect = {
			id: trainer[0]?.id,
			name: data.name,
			surname: data.surname,
			email: data.email,
			courseId: data.multiselect.map((el: SelectElement) => el.id),
		};
		console.log(dataSelect);
		if (e.nativeEvent.submitter.name === 'saveAndAdd') {
			console.log('kkkkk');
			dispatch(createTrainerAction({ form: dataSelect }));
			props.setShow(true);
		}
		if (e.nativeEvent.submitter.name === 'save') {
			console.log('llll');
			dispatch(createTrainerAction({ form: dataSelect }));
			props.setShow(false);
		}
		if (e.nativeEvent.submitter.name === 'update') {
			dispatch(updateTrainerByIdAction(dataSelect));
			props.setShow(false);
		}
		reset({ name: '', surname: '', email: '' });
		setSelectedValue('');
	};
	const onFail = (error: any) => {
		props.setShow(true);
	};

	const {
		control,
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<{
		name: string;
		surname: string;
		email: string;
		multiselect: string;
	}>();
	useEffect(() => {
		if (props.btnType === 'edit') {
			reset({ name: trainer[0]?.name, surname: trainer[0]?.surname, email: trainer[0]?.email });
			setSelectedValue(props.data.filter((el) => el?.id === trainer[0]?.courses[0]?.id));
		} else {
			reset({ name: '', surname: '', email: '' });
			setSelectedValue('');
		}
	}, [trainer, props.btnType, reset, props.data]);

	const options = (!props.data.length ? courses : props.data).map((item) => {
		return { value: item.name, label: item.name, id: item.id };
	});

	return (
		<form className="add-group-form__content" onSubmit={handleSubmit(onSubmit, onFail)}>
			<div className="form_title">
				<PopUpTitle type={props.btnType} title="trainer" />
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
							pattern: /^[a-zA-Z]{3,30}$/,
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
				<label htmlFor="surname" className="input">
					<input
						type="text"
						className="input__field"
						placeholder=" "
						id="surname"
						{...register('surname', {
							required: true,
							pattern: /^[a-zA-Z]{3,30}$/,
						})}
					/>
					<span className="input__label">Surname</span>
				</label>
				{errors.surname ? (
					<>
						{errors.surname.type === 'required' && (
							<span className="input-invalid">⚠ This field is required</span>
						)}
						{errors.surname.type === 'pattern' && (
							<span className="input-invalid">⚠ Please enter valid name</span>
						)}
					</>
				) : null}
			</div>
			<div className="input__grp">
				<label htmlFor="email" className="input">
					<input
						type="email"
						className="input__field"
						placeholder=" "
						id="email"
						{...register('email', {
							required: true,
							pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/,
						})}
					/>
					<span className="input__label">Email</span>
				</label>
				{errors.email ? (
					<>
						{errors.email.type === 'required' && (
							<span className="input-invalid">⚠ This field is required</span>
						)}
						{errors.email.type === 'pattern' && (
							<span className="input-invalid">⚠ Please enter valid name</span>
						)}
					</>
				) : null}
			</div>
			<div className="input__grp">
				<Controller
					control={control}
					render={({ field: { onChange, value } }) => (
						<Select
							className="multi-select"
							classNamePrefix="select"
							closeMenuOnSelect={false}
							isMulti
							options={options}
							value={options.find((c) => c.value === value)}
							onChange={(option: any) => {
								onChange(option);
							}}
							styles={{
								control: (baseStyles, state) => ({
									...baseStyles,
									border: state.isFocused ? 0 : 0,
									boxShadow: '0 !important',
								}),
							}}
						/>
					)}
					name={'multiselect'}
				/>
				{errors.multiselect ? (
					<>
						{errors.multiselect.type === 'required' && (
							<span className="input-invalid">This field is required</span>
						)}
					</>
				) : null}
			</div>
			<PopUpButton type={props.btnType} />
		</form>
	);
};

export default AddTrainersForm;
