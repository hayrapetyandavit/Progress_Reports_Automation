import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export const togglePassVisibility = (
	e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	setPassVisibile: React.Dispatch<
		React.SetStateAction<{
			icon: IconDefinition;
			type: string;
		}>
	>
) => {
	e.preventDefault();
	setPassVisibile((prevState) => {
		if (prevState.icon === faEyeSlash) {
			return { icon: faEye, type: 'text' };
		}
		return { icon: faEyeSlash, type: 'password' };
	});
};
