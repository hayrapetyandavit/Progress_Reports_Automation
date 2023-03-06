import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/auth/authSelector';
import { getPath } from '../../utils/helpers/getPath';
import { container, item } from '../../utils/motion/leftMenu';

import './leftMenu.scss';

const LeftMenu: React.FC = () => {
	const navigate = useNavigate();
	const handleListItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
		navigate(e.currentTarget.id);
	};
	const user = useSelector(userSelector);

	const icons = ['courses-icon', 'students-icon', 'trainers-icon', 'subjects-icon', 'reports-icon'];

	return (
		<div className="menu">
			<div className="menu__container">
				<nav>
					<motion.ul variants={container} initial="hidden" animate="show">
						{icons.map((icon) => {
							let hide = '';
							if (user.roles === 'USER' && icon.slice(0, -5) === 'trainers') {
								hide = 'hideLi';
							}
							return (
								<motion.li
									className={hide}
									variants={item}
									key={icon}
									id={`${getPath(user.roles)}${icon.slice(0, -5)}`}
									onClick={handleListItemClick}
								>
									<div className={icon}></div>
								</motion.li>
							);
						})}
					</motion.ul>
				</nav>
			</div>
		</div>
	);
};

export default LeftMenu;
