import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { userSelector } from '../redux/auth/authSelector';
import LayoutWrapper from './LayoutWrapper';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import '../style/style.scss';

const AdminLayout: React.FC = () => {
	const user = useSelector(userSelector);

	if (user.roles !== 'ADMIN') {
		return (
			<LayoutWrapper>
				<ErrorMessage message="Access Denied" />
			</LayoutWrapper>
		);
	}
	return (
		<LayoutWrapper>
			<Outlet />
		</LayoutWrapper>
	);
};

export default AdminLayout;
