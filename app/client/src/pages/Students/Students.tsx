import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UsersList from '../../components/UsersList/UsersList';
import {
	deleteStudentByIdAction,
	getAllStudentsAction,
	getStudentByCourseAction,
	getStudentByIdAction,
	studentReset,
} from '../../redux/student/studentSlice';
import {
	loadingSelector,
	studentsSelector,
	messageSelector,
	errorSelector,
} from '../../redux/student/studentSelector';
import { courseReset, getAllCoursesAction } from '../../redux/course/courseSlice';
import { authSelector } from '../../redux/auth/authSelector';

const Students: React.FC = () => {
	const dispatch = useDispatch();
	const auth = useSelector(authSelector);

	useEffect(() => {
		if (auth && localStorage.getItem('user')) {
			dispatch(getAllStudentsAction());
			dispatch(getAllCoursesAction());
		}
		return () => {
			dispatch(courseReset());
			dispatch(studentReset());
		};
	}, []);
	const students = useSelector(studentsSelector);
	const loading = useSelector(loadingSelector);
	const error = useSelector(errorSelector); //new line
	const message = useSelector(messageSelector);
	const [displayAdd, setDisplayAdd] = useState(false);
	const [selectedValue, setSelectedValue] = useState('all');

	const handleDelete = (id: any) => {
		dispatch(deleteStudentByIdAction(id));
	};
	const handleGetStudent = (id: any) => {
		dispatch(getStudentByIdAction(id));
	};
	const handleSelectChange = (e: any) => {
		const id = e.target.value;
		if (id === 'all') {
			dispatch(getAllStudentsAction());
		} else {
			dispatch(getStudentByCourseAction(id));
		}
		setSelectedValue(id);
	};
	return (
		<>
			<UsersList
				title="Students"
				data={students}
				loading={loading}
				error={error}
				message={message}
				display={displayAdd}
				selectedValue={selectedValue}
				setDisplay={setDisplayAdd}
				onDelete={handleDelete}
				getDataById={handleGetStudent}
				onSelect={handleSelectChange}
			/>
		</>
	);
};

export default Students;
