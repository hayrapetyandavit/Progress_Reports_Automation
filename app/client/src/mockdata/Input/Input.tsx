import React from 'react';
import './input.css';

interface IProps extends React.HTMLAttributes<HTMLInputElement> {
	name: string;
	type: string;
	value: string;
	placeholder: string;
}

const Input: React.FC<IProps> = (props: IProps) => {
	const { style, ...rest } = props;

	return (
		<div className="wrap-input">
			<input className="input" {...rest} />
		</div>
	);
};

export default Input;
