import React from 'react';

interface IProps {
	type: string;
	title: string;
}

const PopUpTitle: React.FC<IProps> = (props) => {
	const { type, title } = props;
	switch (type) {
		case 'add':
			return <h3>add {title}</h3>;
		case 'edit':
			return <h3>update {title}</h3>;
		case 'create':
			return <h3> create report</h3>;
		case 'update':
			return <h3>update report</h3>;
		default:
			return <h3>unknown popup</h3>;
	}
};

export default PopUpTitle;
