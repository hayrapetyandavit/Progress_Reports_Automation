import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import '../style/style.scss';
import { duration_1_5, opacity_0, opacity_1 } from '../utils/motion/commonObjects';

const MainLayout = () => {
	return (
		<motion.div
			initial={opacity_0}
			animate={opacity_1}
			exit={opacity_0}
			transition={duration_1_5}
			className="wrapper"
		>
			<Outlet />
		</motion.div>
	);
};

export default MainLayout;
