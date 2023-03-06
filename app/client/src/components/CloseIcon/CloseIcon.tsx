import React from 'react';
import './closeIcon.scss';

interface IProps {
	onClick: () => void;
}

const CloseIcon: React.FC<IProps> = (props) => {
	return <div className="close-win" onClick={props.onClick}></div>;
};

export default CloseIcon;
