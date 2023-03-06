import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UsersList from '../../components/UsersList/UsersList';
import { authSelector } from '../../redux/auth/authSelector';
import { courseReset, getAllCoursesAction } from '../../redux/course/courseSlice';

import {
	loadingSelector,
	errorSelector,
	messageSelector,
	trainersSelector,
} from '../../redux/trainer/trainerSelector';
import {
	deleteTrainerByIdAction,
	getAllTrainersAction,
	getTrainerByCourseAction,
	getTrainerByIdAction,
	trainerReset,
} from '../../redux/trainer/trainerSlice';

import './trainers.scss';

const Trainers: React.FC = () => {
	const dispatch = useDispatch();
	const auth = useSelector(authSelector);

	useEffect(() => {
		if (auth && localStorage.getItem('user')) {
			dispatch(getAllTrainersAction());
			dispatch(getAllCoursesAction());
		}
		return () => {
			dispatch(trainerReset());
			dispatch(courseReset());
		};
	}, []);

	const [displayAdd, setDisplayAdd] = useState(false);
	const [selectedValue, setSelectedValue] = useState('all');
	const trainers = useSelector(trainersSelector);
	const loading = useSelector(loadingSelector);
	const error = useSelector(errorSelector); //new line
	const message = useSelector(messageSelector); //new line

	const handleDelete = (id: any) => {
		dispatch(deleteTrainerByIdAction(id));
	};
	const handleGetTrainer = (id: any) => {
		dispatch(getTrainerByIdAction(id));
	};
	const handleSelectChange = (e: any) => {
		const id = e.target.value;
		if (id === 'all') {
			dispatch(getAllTrainersAction());
		} else {
			dispatch(getTrainerByCourseAction(id));
		}
		setSelectedValue(id);
	};
	return (
		<>
			<UsersList
				title="Trainers"
				data={trainers}
				display={displayAdd}
				loading={loading}
				selectedValue={selectedValue}
				error={error} //new line
				message={message}
				setDisplay={setDisplayAdd}
				onDelete={handleDelete}
				getDataById={handleGetTrainer}
				onSelect={handleSelectChange}
			/>
		</>
	);
};

export default Trainers;
