import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { motion } from 'framer-motion';
import { uuid } from 'uuidv4';
import Button from '../../components/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import useQueryParams from '../../hooks/useQueryParams';
import { coursesSelector } from '../../redux/course/courseSelector';
import { errorSelector, studentsSelector } from '../../redux/student/studentSelector';
import { subjectsSelector } from '../../redux/subject/subjectSelector';
import { authSelector } from '../../redux/auth/authSelector';
import {
	getAllSubjectAction,
	getSubjectByCourseAction,
	subjectReset,
} from '../../redux/subject/subjectSlice';
import { courseReset, getAllCoursesAction } from '../../redux/course/courseSlice';
import {
	getAllStudentsAction,
	getStudentByCourseAction,
	studentReset,
} from '../../redux/student/studentSlice';
import { getReportAction } from '../../redux/report/reportSlice';
import { opacity_0, opacity_1 } from '../../utils/motion/commonObjects';
import {
	userListAnimate,
	userListExit,
	userListInitial,
	userListTransit,
	userListTransition,
	userListTransit_2_5,
} from '../../utils/motion/userList';

import './reports.scss';

export default function Reports() {
	const { searchParams, setSearchParams } = useQueryParams();
	const [subjectsSelectedOption, setSubjectsSelectedOption] = useState();
	const [coursesSelectedOption, setCoursesSelectedOption] = useState();
	const [loading, setLoading] = useState(true);

	const error = useSelector(errorSelector);
	const courses = useSelector(coursesSelector);
	const subjects = useSelector(subjectsSelector);
	const students = useSelector(studentsSelector);

	const navigate = useNavigate();

	const dispatch = useDispatch();
	const auth = useSelector(authSelector);

	useEffect(() => {
		if (auth && localStorage.getItem('user')) {
			dispatch(getAllSubjectAction());
			dispatch(getAllCoursesAction());
			dispatch(getAllStudentsAction());
		}
		return () => {
			dispatch(subjectReset());
			dispatch(courseReset());
			dispatch(studentReset());
		};
	}, []);

	const subjectsOptions = subjects.map((item) => {
		return { value: item.name, label: item.name, id: item.id, staffId: item.staffId };
	});

	const coursesOptions = courses.map((item) => {
		return { value: item.name, label: item.name, id: item.id };
	});

	const handleSubjectsChange = (subjectsSelectedOption: any) => {
		setSubjectsSelectedOption(subjectsSelectedOption);
		const data = subjectsSelectedOption.reduce(
			(acc: any, el: any) => {
				acc[0].push(+el.id);
				acc[1].push(+el.staffId);
				acc[1] = [...Array.from(new Set(acc[1]))];
				return acc;
			},
			[[], []]
		);
		setSearchParams({ subject: data[0], staff: data[1] });
	};

	const handleCoursesChange = (coursesSelectedOption: any) => {
		setCoursesSelectedOption(coursesSelectedOption);
		console.log(coursesSelectedOption);
		if (coursesSelectedOption.id === 'All') {
			dispatch(getAllSubjectAction());
			dispatch(getAllCoursesAction());
			dispatch(getAllStudentsAction());
			return;
		}
		dispatch(getSubjectByCourseAction(coursesSelectedOption.id));
		dispatch(getStudentByCourseAction(coursesSelectedOption.id));
	};
	function formatOptionLabel(subjectsOptions: any) {
		return <div title={subjectsOptions.label}>{subjectsOptions.label}</div>;
	}

	// console.log(searchParams);

	return (
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
								onChange={handleCoursesChange}
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
							<Select
								value={subjectsSelectedOption}
								onChange={handleSubjectsChange}
								options={subjectsOptions}
								formatOptionLabel={formatOptionLabel}
								isMulti
								styles={{
									control: (baseStyles, state) => ({
										...baseStyles,
										border: state.isFocused ? 0 : 0,
										boxShadow: '0 !important',
										height: 30,
										overflowY: 'auto',
									}),
									multiValue: (provided) => ({
										...provided,
										backgroundColor: '#e0e0e0',
										width: '45px',
										height: '20px',
										cursor: 'pointer',
										fontSize: '12px',
									}),
									valueContainer: (provided, state) => ({
										...provided,
										width: '75%',
										position: 'absolute',
										top: 0,
										left: 0,
									}),
									dropdownIndicator: (provided, state) => ({
										...provided,
										width: '30px',
										position: 'absolute',
										cursor: 'pointer',
										top: '0',
										right: '0',
									}),
									clearIndicator: (provided, state) => ({
										...provided,
										width: '30px',
										position: 'absolute',
										cursor: 'pointer',
										top: '0',
										right: '25px',
										fontSize: '12px',
									}),
									option: (provided) => ({
										...provided,
										fontSize: '14px',
										cursor: 'pointer',
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
												<div className="edit-grp reports-edit-grp">
													<Button
														value="Create report"
														className=" create-btn"
														title="Create report"
														dataId={item.id}
														onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
															localStorage.setItem(
																'reports',
																JSON.stringify({
																	subject: searchParams.subject,
																	staff: searchParams.staff,
																	student: e.currentTarget.dataset.id,
																})
															);
															navigate('/send-report');
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
	);
}
