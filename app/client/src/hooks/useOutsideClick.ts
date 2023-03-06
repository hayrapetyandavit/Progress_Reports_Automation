import { useEffect } from 'react';

export const useOutsideClick = (
	ref: React.RefObject<HTMLDivElement>,
	setShow: React.Dispatch<React.SetStateAction<boolean>>
) => {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
				setShow(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref]);
};
