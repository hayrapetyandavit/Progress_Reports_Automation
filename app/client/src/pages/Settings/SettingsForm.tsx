import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import { userSelector } from '../../redux/auth/authSelector';
import { updateProfileAction } from '../../redux/auth/authSlice';
import { settingInit, settingInit_, settingTransit } from '../../utils/motion/setttingForm';
import { userListAnimate } from '../../utils/motion/userList';

const SettingsForm: React.FC = () => {
	const user = useSelector(userSelector);
	const dispatch = useDispatch();
	const onSubmit = (data: any) => {
		console.log(
			JSON.stringify({
				name: data.name,
				surname: data.surname,
				email: data.email,
				oldPassword: data.oldPassword,
				newPassword: data.newPassword,
			})
		);
		dispatch(
			updateProfileAction({
				name: data.name,
				surname: data.surname,
				email: data.email,
				oldPassword: data.oldPassword,
				newPassword: data.newPassword,
			})
		);
	};
	const onFail = (error: any) => {
		console.log(error, 'Error');
	};

	const {
		reset,
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<{
		name: string;
		surname: string;
		email: string;
		newPassword: string;
		oldPassword: string;
	}>();
	useEffect(() => {
		reset(user);
	}, []);

	return (
		<form className="add-group-form__content" onSubmit={handleSubmit(onSubmit, onFail)}>
			<motion.div
				initial={settingInit}
				animate={userListAnimate}
				exit={{ x: '-100vw' }}
				transition={settingTransit}
				className="input__grp"
			>
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
							<span className="input-invalid">⚠ This is required field</span>
						)}
						{errors.name.type === 'pattern' && (
							<span className="input-invalid">⚠ Please enter valid name</span>
						)}
					</>
				) : null}
			</motion.div>
			<motion.div
				initial={settingInit_}
				animate={userListAnimate}
				exit={{ x: '100vw' }}
				transition={settingTransit}
				className="input__grp"
			>
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
							<span className="input-invalid">⚠ This is required field</span>
						)}
						{errors.surname.type === 'pattern' && (
							<span className="input-invalid">⚠ Please enter valid name</span>
						)}
					</>
				) : null}
			</motion.div>
			<motion.div
				initial={settingInit}
				animate={userListAnimate}
				exit={{ x: '-100vw' }}
				transition={settingTransit}
				className="input__grp"
			>
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
							<span className="input-invalid">⚠ This is required field</span>
						)}
						{errors.email.type === 'pattern' && (
							<span className="input-invalid">⚠ Please enter valid name</span>
						)}
					</>
				) : null}
			</motion.div>
			<motion.div
				initial={settingInit_}
				animate={userListAnimate}
				exit={{ x: '100vw' }}
				transition={settingTransit}
				className="input__grp"
			>
				<label htmlFor="newPassword" className="input">
					<input
						type="password"
						className="input__field"
						placeholder=" "
						id="newPassword"
						{...register('newPassword', {
							// required: true,
							pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
						})}
					/>
					<span className="input__label">New Password</span>
				</label>
				{errors.newPassword ? (
					<>
						{errors.newPassword.type === 'required' && (
							<span className="input-invalid">⚠ This is required field</span>
						)}
						{errors.newPassword.type === 'pattern' && (
							<span className="input-invalid">⚠ Please enter valid password</span>
						)}
					</>
				) : null}
			</motion.div>
			<motion.div
				initial={settingInit_}
				animate={userListAnimate}
				exit={{ x: '-100vw' }}
				transition={settingTransit}
				className="input__grp"
			>
				<label htmlFor="oldPassword" className="input">
					<input
						type="password"
						className="input__field"
						placeholder=" "
						id="oldPassword"
						{...register('oldPassword', {
							// required: true,
							pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
						})}
					/>
					<span className="input__label">Old Password</span>
				</label>
				{errors.oldPassword ? (
					<>
						{errors.oldPassword.type === 'required' && (
							<span className="input-invalid">⚠ This is required field</span>
						)}
						{errors.oldPassword.type === 'pattern' && (
							<span className="input-invalid">⚠ Please enter valid password</span>
						)}
					</>
				) : null}
			</motion.div>
			<div className="input__grp">
				<Button value="Update profile" className="btn-modal" />
			</div>
		</form>
	);
};

export default SettingsForm;
