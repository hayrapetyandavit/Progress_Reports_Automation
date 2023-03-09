import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import {
	getSubjectByCourseAction,
	getSubjectByTrainerIdAction,
	subjectReset,
} from '../../redux/subject/subjectSlice';
import { subjectSelector, subjectsSelector } from '../../redux/subject/subjectSelector';
import TrainerPopUp from './AddTrainerReports';
import './trainerList.scss';
import { getReportByStudentIdAction } from '../../redux/trainer/trainerSlice';
import { trainerReportSelector } from '../../redux/trainer/trainerSelector';
const TrainerReports: React.FC = () => {
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const [name, setName] = useState('');
	const [loading, setLoading] = useState(true);
	const [userId, setUserId] = useState<string | undefined>();
	const [coursesSelectedOption, setCoursesSelectedOption] = useState();
	const [subjectsSelectedOption, setSubjectsSelectedOption] = useState('');
	// const [subjectsSelectedOption, setSubjectsSelectedOption] = useState();
	const auth = useSelector(authSelector);
	const user = useSelector(userSelector);
	const students = useSelector(studentsSelector);
	const loadingSel = useSelector(loadingSelector);
	const report = useSelector(trainerReportSelector);
	const error = useSelector(errorSelector);
	const message = useSelector(messageSelector);
	const courses = useSelector(coursesSelector);
	const subjects = useSelector(subjectsSelector);
	const courseIds: any = [];
	courses.map((elem) => courseIds.push(elem.id));
	// const coursesOptions = courses.map((item) => {
	// 	return { value: item.name, label: item.name, id: item.id };
	// });
	// const subjectsOptions = subjects.map((item) => {
	// 	return { value: item.name, label: item.name, id: item.id, staffId: item.staffId };
	// });

	useEffect(() => {
		if (auth && localStorage.getItem('user')) {
			dispatch(getStudenstByCoursesAction(courseIds));
			dispatch(getCoursesByTrainerIdAction(user.id));
			dispatch(getSubjectByTrainerIdAction(user.id));
		}
		return () => {
			dispatch(studentReset());
			dispatch(courseReset());
			dispatch(subjectReset());
		};
	}, []);

	useEffect(() => {
		dispatch(getStudenstByCoursesAction(courseIds));
	}, [courses]);

	const handleSelectChange = (e: any) => {
		setCoursesSelectedOption(coursesSelectedOption);
		if (e.target.value === 'All') {
			dispatch(getStudenstByCoursesAction(courseIds));
			dispatch(getSubjectByTrainerIdAction(user.id));
			return;
		}
		dispatch(getSubjectByCourseAction(e.target.value));
		dispatch(getStudenstByCoursesAction([e.target.value]));
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
							<div className="head-filter__grp trainerReport" >
								{show && (
									<TrainerPopUp
										userId={userId}
										setShow={setShow}
										show={show}
										btnType={name}
										subjectsSelectedOption={subjectsSelectedOption}
									/>
								)}
								<select  className="users-sort" onChange={handleSelectChange}>
									<option key={''} value="Select course" disabled selected hidden>
										Select course
									</option>
									<option key={''} value="All">
										All
									</option>
									{courses.map((option) => {
										return (
											<option key={''} value={option.id}>
												{option.name}
											</option>
										);
									})}
								</select>
								<select
									className="users-sort"
									onChange={(e) => {
										setSubjectsSelectedOption(e.target.value);
									}}
								>
									<option key={''} value="Select subject" disabled selected>
										Select subject
									</option>
									{subjects.map((option) => {
										return (
											<option key={''} value={option.id}>
												{option.name}
											</option>
										);
									})}
								</select>
							</div>
						</div>
						<hr />
						<div className={`user_list_wrap ${show && 'blured'}`}>
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
															value="update"
															className={` create-btn ${!subjectsSelectedOption && 'blured'}`}
															title="update"
															dataId={item.id}
															onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
																setUserId(e.currentTarget.dataset.id);
																setShow(true);
																setName('update');
																const data = {
																	studentId: e.currentTarget.dataset.id,
																	subjectId: subjectsSelectedOption,
																};
																dispatch(getReportByStudentIdAction(data));
															}}
														/>
														<Button
															value="create"
															className={` create-btn ${!subjectsSelectedOption && 'blured'}`}
															title="create"
															dataId={item.id}
															onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
																setUserId(e.currentTarget.dataset.id);
																setShow(true);
																setName('create');
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
