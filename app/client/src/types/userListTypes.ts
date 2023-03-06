import { TCourse } from './courseTypes';

export interface IProps {
	data: {
		id?: number;
		name: string;
		surname?: string;
		email?: string;
		groupId?: number;
		startDate?: string;
		endDate?: string;
		courseId?: number;
		staffId?: number;
	}[];
	title: string;
	display: boolean;
	setDisplay: React.Dispatch<React.SetStateAction<boolean>>;
	onDelete: (id: any) => void;
	getDataById: (id: any) => void;
	onSelect: (id: any) => void;
	loading: boolean;
	error?: boolean;
	message?: any;
	titles?: TCourse[];
	selectedValue?: string;
	hideElement?: string;
}
