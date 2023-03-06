import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UsersList from '../../components/UsersList/UsersList';
import {
	courseReset,
	deleteCourseByIdAction,
	getAllCoursesAction,
	getCourseByIdAction,
} from '../../redux/course/courseSlice';
import {
	coursesSelector,
	loadingSelector,
	errorSelector,
	messageSelector,
} from '../../redux/course/courseSelector'; //new line
import { authSelector } from '../../redux/auth/authSelector';

const Courses: React.FC = () => {
	const dispatch = useDispatch();
	const auth = useSelector(authSelector);

	useEffect(() => {
		if (auth && localStorage.getItem('user')) {
			dispatch(getAllCoursesAction());
		}
		return () => {
			dispatch(courseReset());
		};
	}, []);
	const courses = useSelector(coursesSelector);
	const loading = useSelector(loadingSelector);
	const error = useSelector(errorSelector);
	const message = useSelector(messageSelector);

	const [displayAdd, setDisplayAdd] = useState(false);

	const handleDelete = (id: any) => {
		dispatch(deleteCourseByIdAction(id));
	};
	const handleGetCourse = (id: any) => {
		dispatch(getCourseByIdAction(id));
	};
	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		// setSelect(e.target.value);
	};
	return (
		<>
			<UsersList
				title="Courses"
				data={courses}
				loading={loading}
				error={error} //new line
				message={message}
				display={displayAdd}
				setDisplay={setDisplayAdd}
				onDelete={handleDelete}
				getDataById={handleGetCourse}
				onSelect={handleSelectChange}
				titles={[{ name: 'Name', startDate: 'Start Date', endDate: 'End Date' }]}
			/>
		</>
	);
};

export default Courses;
