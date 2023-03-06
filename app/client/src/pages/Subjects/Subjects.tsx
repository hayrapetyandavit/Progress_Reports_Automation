import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UsersList from '../../components/UsersList/UsersList';
import { authSelector } from '../../redux/auth/authSelector';
import { courseReset, getAllCoursesAction } from '../../redux/course/courseSlice';
import {
	loadingSelector,
	subjectsSelector,
	errorSelector,
	messageSelector,
} from '../../redux/subject/subjectSelector';
import {
	deleteSubjectByIdAction,
	getAllSubjectAction,
	getSubjectByCourseAction,
	getSubjectByIdAction,
	subjectReset,
} from '../../redux/subject/subjectSlice';
// import "./subjects.scss";

const Subjects: React.FC = () => {
	const dispatch = useDispatch();
	const auth = useSelector(authSelector);

	useEffect(() => {
		if (auth && localStorage.getItem('user')) {
			dispatch(getAllSubjectAction());
			dispatch(getAllCoursesAction());
		}
		return () => {
			dispatch(subjectReset());
			dispatch(courseReset());
		};
	}, []);

	const subjects = useSelector(subjectsSelector);
	const loading = useSelector(loadingSelector);
	const error = useSelector(errorSelector); //new line
	const message = useSelector(messageSelector); //new line

	const [displayAdd, setDisplayAdd] = useState(false);
	const [selectedValue, setSelectedValue] = useState('all');

	const handleDelete = (id: any) => {
		dispatch(deleteSubjectByIdAction(id));
	};
	const handleGetTrainer = (id: any) => {
		dispatch(getSubjectByIdAction(id));
	};
	const handleSelectChange = (e: any) => {
		const id = e.target.value;
		if (id === 'all') {
			dispatch(getAllSubjectAction());
		} else {
			dispatch(getSubjectByCourseAction(id));
		}
		setSelectedValue(id);
	};
	return (
		<>
			<UsersList
				title="Subjects"
				data={subjects}
				loading={loading}
				error={error}
				message={message}
				display={displayAdd}
				selectedValue={selectedValue}
				setDisplay={setDisplayAdd}
				onDelete={handleDelete}
				getDataById={handleGetTrainer}
				onSelect={handleSelectChange}
			/>
		</>
	);
};

export default Subjects;
