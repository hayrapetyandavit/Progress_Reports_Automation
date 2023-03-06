import img from './error.gif';
import './errorMessage.scss';

interface IProps {
	message: any;
	error?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ErrorMessage: React.FC<IProps> = (props) => {
	return (
		<div className="error-wrapper">
			<img className="error-image" src={img} alt="Error" />
			<h2 className="error-title">{props.message}</h2>
		</div>
	);
};

export default ErrorMessage;
