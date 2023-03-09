import React from 'react';
import Button from '../Button/Button';

interface IProps {
	type: string;
}

const PopUpButton: React.FC<IProps> = (props) => {
	switch (props.type) {
		case 'add':
			return (
				<div className="btn__grp">
					<div className="input__grp">
						<Button value="Save" className="btn-modal" name="save" />
					</div>
					<div className="input__grp">
						<Button value="Save & Add" className="btn-modal" name="saveAndAdd" />
					</div>
				</div>
			);
		case 'edit':
			return (
				<div className="input__grp">
					<Button value="Update" className="btn-modal" name="update" />
				</div>
			);
		case 'create':
			return (
				<div className="input__grp">
					<Button value="Save" className="btn-modal" name="create" />
				</div>
			);
		default:
			return <h3>unknown button</h3>;
	}
};

export default PopUpButton;
