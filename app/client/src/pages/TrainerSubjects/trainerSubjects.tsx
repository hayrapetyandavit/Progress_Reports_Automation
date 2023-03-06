import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UsersList from '../../components/UsersList/UsersList';
import { authSelector, userSelector } from '../../redux/auth/authSelector';
import {
	errorSelector,
	loadingSelector,
	messageSelector,
	subjectsSelector,
} from '../../redux/subject/subjectSelector';
import { getSubjectByTrainerIdAction, subjectReset } from '../../redux/subject/subjectSlice';

const TrainerSubjects: React.FC = () => {
	const dispatch = useDispatch();
	const auth = useSelector(authSelector);
	const user = useSelector(userSelector);
	useEffect(() => {
		if (auth && localStorage.getItem('user')) {
			dispatch(getSubjectByTrainerIdAction(user.id));
		}
		return () => {
			dispatch(subjectReset());
		};
	}, []);

	const subjects = useSelector(subjectsSelector);
	const loading = useSelector(loadingSelector);
	const error = useSelector(errorSelector);
	const message = useSelector(messageSelector);

	const [displayAdd, setDisplayAdd] = useState(false);

	const handleDelete = (id: any) => {};
	const handleGetTrainer = (id: any) => {};
	const handleSelectChange = (e: any) => {};
	return (
		<>
			<UsersList
				title="All Subjects"
				data={subjects}
				loading={loading}
				error={error}
				message={message}
				hideElement="hide"
				display={displayAdd}
				setDisplay={setDisplayAdd}
				onDelete={handleDelete}
				getDataById={handleGetTrainer}
				onSelect={handleSelectChange}
			/>
		</>
	);
};

export default TrainerSubjects;
