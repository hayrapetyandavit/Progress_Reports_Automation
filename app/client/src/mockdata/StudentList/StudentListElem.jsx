// import React, { useEffect } from 'react';
// import { v4 as uuid } from 'uuid';
// import { motion } from 'framer-motion';
// import Button from '../Button/Button';
// import { TCourse } from '../../types/courseTypes';
// import { TSubject } from '../../types/subjectTypes';
// import { TStudent } from '../../types/studentTypes';
// import { useSelector } from 'react-redux';
// import { coursesSelector, errorSelector, messageSelector } from '../../redux/course/courseSelector';
// import { subjectSelector, subjectsSelector } from '../../redux/subject/subjectSelector';
// import './studentList.scss';

// interface IProps {
// 	title: string;
// 	componentId: string
// }
// export interface IData {

// 		data: TCourse[] | TSubject[]

// 	}

// const StudentListElement: React.FC<IProps> = (props) => {
// 	// const { componentId, title} = props;

// 	const dataSelector = (componentId === "courses") ? coursesSelector.apply : subjectSelector.apply;
// 	const data = useSelector(dataSelector)
// 	console.log(data)

// 	return (
// 		<div></div>
// 		// <motion.div
// 		// 	initial={{ opacity: 0 }}
// 		// 	animate={{ opacity: 1 }}
// 		// 	exit={{ opacity: 0 }}
// 		// 	transition={{ duration: 2, delay: 0.5 }}
// 		// 	className="users__container"
// 		// >
// 		// 	<div className="users__content">
// 		// 		<div className="wrapper-line">
// 		// 			{title}
// 		// 			<hr />
// 		// 			<div className="user_list_wrap">
// 		// 				<div className="main-users__list">
// 		// 					<>
// 		// 						{/* {!loading && !error ? ( */}
// 		// 						<>
// 		// 							<div className="items-title__wrapper">
// 		// 								<div className="items-title">
// 		// 										{/* <span>{data[0]?.data.name ? 'name' : null}</span> */}
// 		// 										{/* <span>{data[0]?.startDate ? 'name' : null}</span> */}
// 		// 										{/* <span>{data[0]?.surname ? 'surname' : null}</span>
// 		// 										<span>{data[0]?.attendance ? 'attendance' : null}</span>
// 		// 										<span>{data[0]?.score ? 'score' : null}</span>
// 		// 										<span>{data[0]?.comment ? 'comment' : null}</span> */}
// 		// 									</div>
// 		// 							</div>
// 		// 							{data.map((item) => {
// 		// 									return (
// 		// 										<motion.div
// 		// 											initial={{ opacity: 0 }}
// 		// 											animate={{ opacity: 1 }}
// 		// 											exit={{ opacity: 0 }}
// 		// 											transition={{
// 		// 												type: 'easeOut',
// 		// 												stiffness: 120,
// 		// 												damping: 20,
// 		// 												duration: 2.5,
// 		// 												delay: 0.2,
// 		// 											}}
// 		// 											className="list-item"
// 		// 											key={uuid()}
// 		// 										>
// 		// 											<div className="info-grp">
// 		// 												<span>{item.name}</span>
// 		// 												{/* <span>{item.surname}</span> */}
// 		// 												{/* <span>{item.email}</span>
// 		// 												<span>{item.startDate?.toLocaleString().slice(0, 10)}</span>
// 		// 												<span>{item.endDate?.toLocaleString().slice(0, 10)}</span> */}
// 		// 											</div>
// 		// 											<div className="edit-grp">
// 		// 												<Button
// 		// 													dataId={item.id}
// 		// 													className="users-btn"
// 		// 													title={`edit report`}
// 		// 													// src={editIcon}
// 		// 													onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
// 		// 														// getDataById(e.currentTarget.dataset.id);
// 		// 														// setDisplay(true);
// 		// 														// setType('edit');
// 		// 													}}
// 		// 												/>
// 		// 											</div>
// 		// 										</motion.div>
// 		// 									);
// 		// 								})}
// 		// 						</>
// 		// 						{/* ) : null} */}
// 		// 						{/* {loading && !error ? <Spinner loading={setLoading} /> : null}
// 		// 						{props.error ? <ErrorMessage message={message} /> : null} */}
// 		// 					</>
// 		// 				</div>
// 		// 			</div>
// 		// 			<hr />
// 		// 		</div>
// 		// 	</div>
// 		// </motion.div>
// 	);
// };

// export default StudentListElement;
