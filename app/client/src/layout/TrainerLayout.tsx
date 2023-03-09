import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../redux/auth/authSelector';
import LayoutWrapper from './LayoutWrapper';
import { Outlet } from 'react-router';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';

import '../style/style.scss';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { courseReset, getCoursesByTrainerIdAction } from '../redux/course/courseSlice';
import { getSubjectByTrainerIdAction, subjectReset } from '../redux/subject/subjectSlice';

const TrainerLayout: React.FC = () => {
	const user = useSelector(userSelector);
	const dispatch = useDispatch();
	// useEffect(() => {
	// 	dispatch(getCoursesByTrainerIdAction(user.id));
	// 	dispatch(getSubjectByTrainerIdAction(user.id));
	// }, []);
	if (user.roles !== 'USER') {
		return (
			<LayoutWrapper>
				<ErrorMessage message="Access Denied" />
			</LayoutWrapper>
		);
	}
	return (
		<LayoutWrapper>
			<Outlet />
		</LayoutWrapper>
	);
};

export default TrainerLayout;
