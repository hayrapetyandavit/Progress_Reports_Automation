import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import Header from '../components/Header/Header';
import LeftMenu from '../components/LeftMenu/LeftMenu';
import { layoutWrapTransit, opacity_0, opacity_1 } from '../utils/motion/commonObjects';

const LayoutWrapper: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<motion.div
			initial={opacity_0}
			animate={opacity_1}
			exit={opacity_0}
			transition={layoutWrapTransit}
			className="main__container"
		>
			<Header />
			<div className="page__container">
				<div className="page__content">
					<LeftMenu />
					{children}
				</div>
			</div>
		</motion.div>
	);
};

export default LayoutWrapper;
