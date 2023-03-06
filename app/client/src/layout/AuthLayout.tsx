import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { authSelector } from '../redux/auth/authSelector';

import '../style/style.scss';

const AuthLayout: React.FC = () => {
	const auth = useSelector(authSelector);
	if (auth) {
		return <Outlet />;
	}
	return <Navigate to="/login" replace={true} />;
};

export default AuthLayout;
