import { TSubject } from '../types/subjectTypes';

export const getSubjectByIdService = async (id: string): Promise<Response> => {
	const subjectData = await fetch(`http://localhost:3303/subjectby/${id}`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return subjectData;
};

export const getAllSubjectService = async (): Promise<Response> => {
	const subjectData = await fetch(`http://localhost:3303/subject/all`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return subjectData;
};

export const getSubjectByCourseService = async (id: string): Promise<Response> => {
	console.log(id);
	
	const subjectData = await fetch(`http://localhost:3303/subject/course/${id}`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return subjectData;
};

// --start
// app.get("/subject/trainer/:id", getSubjectsByTrainerId);
export const getSubjectsByTrainerIdService = async (id: string): Promise<Response> => {
	console.log(id);
	
	const subjectData = await fetch(`http://localhost:3303/subject/trainer/${id}`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return subjectData;
};
// end

export const updateSubjectByIdService = async (data: TSubject): Promise<Response> => {
	const subjectData = await fetch(`http://localhost:3303/subject/update/${data.id}`, {
		method: 'PUT',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			...data,
		}),
	});
	return subjectData;
};

export const deleteSubjectByIdService = async (id: any): Promise<Response> => {
	const subjectData = await fetch(`http://localhost:3303/subject/delete/${id}`, {
		method: 'DELETE',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return subjectData;
};
// /subject/trainers/:id

export const createSubjectService = async (data: TSubject): Promise<Response> => {
	const subjectData = await fetch(`http://localhost:3303/subject/create`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			...data,
		}),
	});
	return subjectData;
};
