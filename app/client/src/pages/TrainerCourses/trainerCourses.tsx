import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UsersList from '../../components/UsersList/UsersList';
import { authSelector, userSelector } from '../../redux/auth/authSelector';
import { coursesSelector, errorSelector, loadingSelector, messageSelector } from '../../redux/course/courseSelector';
import { courseReset, getCoursesByTrainerIdAction } from '../../redux/course/courseSlice';


const TrainerCourses: React.FC = () => {
	const dispatch = useDispatch();
	const auth  = useSelector(authSelector);
	const user = useSelector(userSelector);
	useEffect(() => {
		if (auth && localStorage.getItem('user')) {
			dispatch(getCoursesByTrainerIdAction(user.id));
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
		// dispatch(deleteCourseByIdAction(id));
	};
	const handleGetCourse = (id: any) => {
		// dispatch(getCourseByIdAction(id));
	};
	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		// setSelect(e.target.value);
	};
	return (
		<>
			<UsersList
				title="All Courses"
				data={courses}
				loading={loading}
				error={error} //new line
				message={message}
				display={displayAdd}
				hideElement="hide"
				setDisplay={setDisplayAdd}
				onDelete={handleDelete}
				getDataById={handleGetCourse}
				onSelect={handleSelectChange}
			/>
		</>
	);
};

export default TrainerCourses;
