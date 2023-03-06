import React from 'react';
import './button.scss';

interface IProps extends React.HTMLAttributes<HTMLInputElement> {
	dataId?: number;
	value?: string;
	src?: string;
	name?: string;
	onClick?: ((e: any) => void) | undefined;
	getID?: React.Dispatch<React.SetStateAction<any>>;
	sendReport?: () => void;
	updateReport?: (e: any) => void;
}

const Button: React.FC<IProps> = (props) => {
	const { className, value, title, src, onClick, dataId, name, getID, sendReport, updateReport } = props;
	return (
		<button
			title={title ? title : ''}
			data-id={dataId}
			type={src ? 'submit' : undefined}
			className={className + ' btn-hover'}
			onClick={(e) => {
				if (onClick) onClick(e);
				if (getID) getID(e.currentTarget.dataset.dataId);
				if (sendReport) sendReport();
				if (updateReport) updateReport(e);
			}}
			name={name}
		>
			{src ? <img src={src} alt="buttonImage" /> : value}
		</button>
	);
};

export default Button;
