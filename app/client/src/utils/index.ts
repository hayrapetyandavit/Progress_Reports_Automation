import { toast } from 'react-toastify';

export const notify = (message: string, configs?: Record<string, unknown>) =>
	toast(message, {
		position: 'top-center',
		className: 'toast-message',
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		progress: undefined,
		theme: 'dark',
		...configs,
	});
