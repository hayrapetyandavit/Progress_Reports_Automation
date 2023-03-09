import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { motion } from 'framer-motion';
import AddItem from '../../components/AddItem/AddItem';
import { coursesSelector } from '../../redux/course/courseSelector';
import Button from '../Button/Button';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'; //new line
import Spinner from '../Spinner/Spinner';
import addIcon from '../../asset/images/pages/add.png';
import editIcon from '../../asset/images/pages/edit.png';
import deleteIcon from '../../asset/images/pages/delete.png';
import { IProps } from '../../types/userListTypes';
import { subjectsSelector } from '../../redux/subject/subjectSelector';
import { opacity_0, opacity_1 } from '../../utils/motion/commonObjects';
import {
	userListAnimate,
	userListExit,
	userListInitial,
	userListTransit,
	userListTransition,
	userListTransit_2,
	userListTransit_2_5,
} from '../../utils/motion/userList';
import './usersList.scss';

const UsersList: React.FC<IProps> = (props) => {
	const [loading, setLoading] = useState(true);
	const [type, setType] = useState('add');
	const courses = useSelector(coursesSelector);
	const subjects = useSelector(subjectsSelector);
	const { data, display, setDisplay, onDelete, getDataById, onSelect, error, message, selectedValue } = props;
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
					>
						{props.title}
					</motion.h2>
					<div className={`users__header ${props.hideElement}`}>
						<div className="head-filter__grp">
							{/* <motion.input
								initial={userListInitial}
								animate={userListAnimate}
								exit={userListExit}
								transition={userListTransit_2}
								type="text"
								className="users-search"
							/> */}
							<motion.select
								initial={userListInitial}
								animate={userListAnimate}
								exit={userListExit}
								transition={userListTransit_2}
								name=""
								id=""
								className="users-sort"
								value={selectedValue}
								onChange={onSelect}
							>
								<option key={uuid()} value={'all'}>
									All
								</option>
								{courses.map((option) => {
									return (
										<option key={uuid()} value={option.id}>
											{option.name}
										</option>
									);
								})}
							</motion.select>
							<motion.select
								initial={{ x: '-50vw', opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								exit={{ x: '-50vw' }}
								transition={{ type: 'easeInOut', stiffness: 120, damping: 40, duration: 2, delay: 0.2 }}
								name=""
								id="secondselect"
								className="users-sort"
								value={selectedValue}
								onChange={onSelect}
							>
								<option key={uuid()} value="all">
									All
								</option>
								{subjects.map((option) => {
									return (
										<option key={uuid()} value={option.id}>
											{option.name}
										</option>
									);
								})}
							</motion.select>
						</div>
						<div className="head-add">
							<Button
								className="add-btn"
								title={`add ${props.title}`}
								src={addIcon}
								onClick={() => {
									setDisplay(true);
									setType('add');
								}}
							/>
							<AddItem title={props.title} show={display} setShow={setDisplay} btnType={type} />
						</div>
					</div>
					{props.hideElement && <div className='users__header'></div>}
					
					<hr />
					<div className={`user_list_wrap ${display && "blured"}`}>
						<div className="main-users__list">
							<>
								{!loading && !error ? (
									<>
										<div className="items-title__wrapper">
											<div className="items-title">
												<span>{data[0]?.name ? 'name' : null}</span>
												<span>{data[0]?.surname ? 'surname' : null}</span>
												<span>{data[0]?.email ? 'email' : null}</span>
												<span>{data[0]?.startDate?.toLocaleString().slice(0, 10) ? 'start date' : null}</span>
												<span>{data[0]?.endDate?.toLocaleString().slice(0, 10) ? 'end date' : null}</span>
											</div>
										</div>
										{data.map((item) => {
											return (
												<motion.div
													initial={opacity_0}
													animate={opacity_1}
													exit={opacity_0}
													transition={userListTransit_2_5}
													className="list-item"
													key={uuid()}
												>
													<div className="info-grp">
														<span>{item.name}</span>
														<span>{item.surname}</span>
														<span>{item.email}</span>
														<span>{item.startDate?.toLocaleString().slice(0, 10)}</span>
														<span>{item.endDate?.toLocaleString().slice(0, 10)}</span>
													</div>
													<div className="edit-grp">
														<Button
															dataId={item.id}
															className={`users-btn ${props.hideElement}`}
															title={`edit ${props.title}`}
															src={editIcon}
															onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
																getDataById(e.currentTarget.dataset.id);
																setDisplay(true);
																setType('edit');
															}}
														/>
														<Button
															dataId={item.id}
															className={`users-btn ${props.hideElement}`}
															title={`delete ${props.title}`}
															src={deleteIcon}
															onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
																onDelete(e.currentTarget.dataset.id);
															}}
														/>
													</div>
												</motion.div>
											);
										})}
									</>
								) : null}
								{loading && !error ? <Spinner loading={setLoading} /> : null}
								{props.error ? <ErrorMessage message={message} /> : null}
							</>
						</div>
					</div>
					<hr />
				</div>
			</div>
		</motion.div>
	);
};

export default UsersList;
