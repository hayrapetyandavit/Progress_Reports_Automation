// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { v4 as uuid } from 'uuid';
// import { motion } from 'framer-motion';
// import { courseSelector, coursesSelector } from '../../redux/course/courseSelector';
// import Button from '../Button/Button';
// import { authSelector, userSelector } from '../../redux/auth/authSelector';
// import { getCoursesByTrainerIdAction } from '../../redux/course/courseSlice';
// import './studentList.scss';
// import { subjectSelector, subjectsSelector } from '../../redux/subject/subjectSelector';
// import StudentListElement from './StudentListElem';
// import { studentsSelector } from '../../redux/student/studentSelector';
// import { getSubjectByCourseIdAction } from '../../redux/subject/subjectSlice';

// interface IProps {
// 	title: string;
// }

// const StudentList: React.FC<IProps> = (props) => {
// 	const dispatch = useDispatch();
// 	// const auth = useSelector(authSelector);
// 	const courses = useSelector(coursesSelector);
// 	const course = useSelector(courseSelector);
// 	const subjects = useSelector(subjectsSelector);
// 	const subject = useSelector(subjectSelector);
// 	const students = useSelector(studentsSelector);

// 	const user = useSelector(userSelector);
// 	useEffect(() => {
// 		dispatch(getCoursesByTrainerIdAction(user.id));
// 	}, [course, subjects, subject]);

// 	const onCourseSelect = (e: any) => {
// 		const id = e.target.value;
// 		console.log(id);
// 		if (id !== 'all') {
// 			dispatch(getSubjectByCourseIdAction(id));
// 		}
// 	};

// 	const onSubjectSelect = (e: any) => {
// 		const id = e.target.value;
// 		if (id !== 'all') {
// 			// new function to get students by subject ID
// 			// dispatch(getStudentsBySubjectIdAction(id));
// 		}
// 	};

// 	const { title } = props;

// 	return (
// 		<motion.div
// 			initial={{ opacity: 0 }}
// 			animate={{ opacity: 1 }}
// 			exit={{ opacity: 0 }}
// 			transition={{ duration: 2, delay: 0.5 }}
// 			className="users__container"
// 		>
// 			<div className="users__content">
// 				<div className="wrapper-line">
// 					<motion.h2
// 						initial={{ x: '-50vw', opacity: 0 }}
// 						animate={{ x: 0, opacity: 1 }}
// 						exit={{ x: '-50vw' }}
// 						transition={{ type: 'easeInOut', stiffness: 150, damping: 40, duration: 1, delay: 0.5 }}
// 						className="main-title"
// 					>
// 						{title}
// 					</motion.h2>
// 					<div className="users__header">
// 						<div className="head-filter__grp">
// 							<motion.select
// 								initial={{ x: '-50vw', opacity: 0 }}
// 								animate={{ x: 0, opacity: 1 }}
// 								exit={{ x: '-50vw' }}
// 								transition={{ type: 'easeInOut', stiffness: 120, damping: 40, duration: 2, delay: 0.2 }}
// 								className="users-sort"
// 								onSelect={onCourseSelect}
// 							>
// 								<option key={uuid()} value="all">
// 									All
// 								</option>
// 								{courses.map((option) => {
// 									return (
// 										<option key={uuid()} value={option.id}>
// 											{option.name}
// 										</option>
// 									);
// 								})}
// 							</motion.select>
// 							<motion.select
// 								initial={{ x: '-50vw', opacity: 0 }}
// 								animate={{ x: 0, opacity: 1 }}
// 								exit={{ x: '-50vw' }}
// 								transition={{ type: 'easeInOut', stiffness: 120, damping: 40, duration: 2, delay: 0.2 }}
// 								className="users-sort"
// 								onChange={onSubjectSelect}
// 							>
// 								<option key={uuid()} value="all">
// 									All
// 								</option>
// 								{subjects.map((option) => {
// 									return (
// 										<option key={uuid()} value={option.id}>
// 											{option.name}
// 										</option>
// 									);
// 								})}
// 							</motion.select>
// 						</div>
// 					</div>
// 					<StudentListElement title='Students' componentId='students'/>
// 					<hr />
// 				</div>
// 			</div>
// 		</motion.div>
// 	);
// };

// export default StudentList;
