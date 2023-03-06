import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import { authSelector, userSelector } from '../../redux/auth/authSelector';
import { coursesSelector } from '../../redux/course/courseSelector';
import {
	errorSelector,
	loadingSelector,
	messageSelector,
	studentsSelector,
} from '../../redux/student/studentSelector';
import {
	getStudenstByCoursesAction,
	getStudentByCourseAction,
	getStudentsByTrainerIdAction,
	studentReset,
} from '../../redux/student/studentSlice';
import { opacity_0, opacity_1 } from '../../utils/motion/commonObjects';
import {
	userListAnimate,
	userListExit,
	userListInitial,
	userListTransit,
	userListTransition,
	userListTransit_2_5,
} from '../../utils/motion/userList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { courseReset, getCoursesByTrainerIdAction } from '../../redux/course/courseSlice';

const TrainerReports: React.FC = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);
	const [coursesSelectedOption, setCoursesSelectedOption] = useState();
	const auth = useSelector(authSelector);
	const user = useSelector(userSelector);
	const students = useSelector(studentsSelector);
	const loadingSel = useSelector(loadingSelector);
	const error = useSelector(errorSelector);
	const message = useSelector(messageSelector);
	const courses = useSelector(coursesSelector);
	const courseIds: any = [];
	courses.map((elem) => courseIds.push(elem.id));
	const coursesOptions = courses.map((item) => {
		return { value: item.name, label: item.name, id: item.id };
	});

	useEffect(() => {
		console.log(courseIds);
		if (auth && localStorage.getItem('user')) {
			dispatch(getStudenstByCoursesAction(courseIds));
			dispatch(getCoursesByTrainerIdAction(user.id));
		}
		return () => {
			dispatch(studentReset());
			dispatch(courseReset());
		};
	}, []);

	useEffect(() => {
		console.log(courseIds);
		dispatch(getStudenstByCoursesAction(courseIds));
	}, [courses]);

	const handleSelectChange = (coursesSelectedOption: any) => {
		setCoursesSelectedOption(coursesSelectedOption);
		if (coursesSelectedOption.id === 'All') {
			dispatch(getStudenstByCoursesAction(courseIds));
			return;
		}
		dispatch(getStudenstByCoursesAction([coursesSelectedOption.id]));
	};

	return (
		<>
			<motion.div
				initial={opacity_0}
				animate={opacity_1}
				exit={opacity_0}
				transition={userListTransit}
				className="users__container"
			>
				<div className="users__content">
					<div className="wrapper-line">
						<motion.h2
							initial={userListInitial}
							animate={userListAnimate}
							exit={userListExit}
							transition={userListTransition}
							className="main-title"
							style={{ margin: '0 0 12px 0' }}
						>
							Reports
						</motion.h2>
						<div className="users__header">
							<div className="head-filter__grp">
								<Select
									value={coursesSelectedOption}
									onChange={handleSelectChange}
									options={[{ value: 'All', label: 'All', id: 'All' }, ...coursesOptions]}
									styles={{
										control: (baseStyles, state) => ({
											...baseStyles,
											border: state.isFocused ? 0 : 0,
											boxShadow: '0 !important',
										}),
										dropdownIndicator: (provided, state) => ({
											...provided,
											width: '30px',
											cursor: 'pointer',
										}),
										option: (provided, state) => ({
											...provided,
											cursor: 'pointer',
											fontSize: '12px',
										}),
									}}
									className="react-select"
								/>
							</div>
						</div>
						<hr />
						<div className="user_list_wrap">
							<div className="main-users__list">
								{!loading && !error ? (
									<>
										<div className="items-title__wrapper">
											<div className="items-title">
												<span>name</span>
												<span>surname</span>
												<span>email</span>
											</div>
										</div>
										{students.map((item) => {
											return (
												<motion.div
													initial={opacity_0}
													animate={opacity_1}
													exit={opacity_0}
													transition={userListTransit_2_5}
													className="list-item"
												>
													<div className="info-grp">
														<span>{item.name}</span>
														<span>{item.surname}</span>
														<span>{item.email}</span>
													</div>
													<div className="edit-grp">
														<Button
															value="Create report"
															className=" create-btn"
															title="Create report"
															dataId={item.id}
															onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
																// localStorage.setItem(
																// 	'reports',
																// 	JSON.stringify({
																// 		subject: searchParams.subject,
																// 		staff: searchParams.staff,
																// 		student: e.currentTarget.dataset.id,
																// 	})
																// );
																// navigate('/send-report');
															}}
														/>
													</div>
												</motion.div>
											);
										})}
									</>
								) : null}
								{loading && !error ? <Spinner loading={setLoading} /> : null}
								{error ? <ErrorMessage message="Students get failed" /> : null}
							</div>
						</div>
						<hr />
					</div>
				</div>
			</motion.div>
		</>
	);
};

export default TrainerReports;
