import LayoutWrapper from '../../layout/LayoutWrapper';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const NotFound: React.FC = () => {
	return (
		<LayoutWrapper>
			<ErrorMessage message="404 - Page Not Found!" />
		</LayoutWrapper>
	);
};

export default NotFound;
