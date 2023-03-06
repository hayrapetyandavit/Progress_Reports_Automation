import { useSearchParams } from 'react-router-dom';
type TUseQueryParams = {
	searchParams: Record<string, any>;
	setSearchParams: (params: Record<string, any>) => void;
};
const useQueryParams = (): TUseQueryParams => {
	const [search, setSearchParams] = useSearchParams();
	const parsedSearchParams = new URLSearchParams(search);
	const searchParams: Record<string, any> = {};
	const keys = new Set();
	[...parsedSearchParams.keys()].forEach((key) => keys.add(key));

	keys.forEach((key) => {
		searchParams[key as string] = parsedSearchParams.getAll(key as string);
	});

	return { searchParams, setSearchParams };
};
export default useQueryParams;
