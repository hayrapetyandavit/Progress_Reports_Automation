export const getPath = (userRole: string) => {
	if (userRole === 'ADMIN') {
		return '';
	} else {
		return 'trainer/';
	}
};
