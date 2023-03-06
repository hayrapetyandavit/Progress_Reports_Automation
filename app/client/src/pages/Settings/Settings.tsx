import React from 'react';
import SettingsForm from './SettingsForm';
import './settings.scss';
import { motion } from 'framer-motion';
import { duration_1_5, opacity_0, opacity_1 } from '../../utils/motion/commonObjects';

export default function Settings() {
	return (
		<motion.div
			initial={opacity_0}
			animate={opacity_1}
			exit={opacity_0}
			transition={duration_1_5}
			className="settings__container"
		>
			<SettingsForm />
		</motion.div>
	);
}
