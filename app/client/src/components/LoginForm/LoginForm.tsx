import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage } from '@hookform/error-message';

import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from '../../asset/images/logo.svg';
import { authState } from '../../types/authTypes';
import { loginAction } from '../../redux/auth/authSlice';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { togglePassVisibility } from '../../utils/helpers/togglePassVisibility';
import { loginTransit, opacity_0, opacity_1 } from '../../utils/motion/commonObjects';

import './loginForm.scss';

const LoginForm: React.FC = () => {
	const dispatch = useDispatch();
	const [isPassVisibile, setPassVisibile] = useState({
		icon: faEyeSlash,
		type: 'password',
	});
	const navigate = useNavigate();
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<authState>();

	const onSubmit: SubmitHandler<authState> = (data) => {
		const form: authState = {
			email: data.email,
			password: data.password,
		};
		const trainerLogin = {
			form: form,
			navigate: navigate,
		};
		dispatch(loginAction(trainerLogin));
	};
	const onFail = (error: any) => {
		console.log(error, 'Error');
	};

	return (
		<motion.div
			initial={opacity_0}
			animate={opacity_1}
			exit={opacity_0}
			transition={loginTransit}
			className="login-form__container"
		>
			<div className="login-form__content">
				<div className="login-form__logo">
					<img src={logo} alt="Sourceminde logo" />
				</div>
				<form className="login-form__fildes" onSubmit={handleSubmit(onSubmit, onFail)}>
					<div className="wrap-input">
						<input
							type="email"
							className="login-input"
							placeholder="Email"
							{...register('email', {
								required: '⚠ this is required field',
								pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/,
							})}
						/>
						{(errors?.email?.type && <span className="focus-input focus-input-email invalid" />) || (
							<span className="focus-input focus-input-email valid" />
						)}
						<ErrorMessage errors={errors} name="email" render={({ message }) => <p>{message}</p>} />
					</div>
					<div className="wrap-input">
						<input
							type={isPassVisibile.type}
							className="login-input"
							placeholder="Password"
							{...register('password', {
								required: '⚠ this is required field',
								pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
							})}
						/>
						{(errors?.password?.type && <span className="focus-input focus-input-password invalid" />) || (
							<span className="focus-input focus-input-password valid"></span>
						)}
						<ErrorMessage errors={errors} name="password" render={({ message }) => <p>{message}</p>} />
					</div>
					<button className="fa-eye-btn" onClick={(e) => togglePassVisibility(e, setPassVisibile)}>
						<FontAwesomeIcon icon={isPassVisibile.icon} size="lg" />
					</button>
					<button type="submit" className="login-btn">
						Log In
					</button>
				</form>
			</div>
		</motion.div>
	);
};

export default LoginForm;
