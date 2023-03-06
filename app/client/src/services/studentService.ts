import { TStudent } from '../types/studentTypes';

export const getStudentByIdService = async (id: string): Promise<Response> => {
	const student = await fetch(`http://localhost:3303/studentby/${id}`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return student;
};
/// --- this is by course ID
export const getAllStudentsByCourseService = async (id: string = ''): Promise<Response> => {
	const studentData = await fetch(`http://localhost:3303/student/all/${id}`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return studentData;
};
//  app.post("/student/all/bycourses", getAllStudentsByCourses);
export const getStudentsByCoursesService = async (ids: number[]): Promise<Response> => {
	const studentData = await fetch(`http://localhost:3303/student/all/bycourses`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ids }),
	});
	return studentData;
};

//    app.post("/student/all/bytrainer/:id", getStudentsByTrainerId);
export const getAllStudentsByTrainerIdService = async (id: string): Promise<Response> => {
	const studentData = await fetch(`http://localhost:3303/student/all/bytrainer/${id}`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return studentData;
};

export const getAllStudentsService = async (): Promise<Response> => {
	const studentData = await fetch(`http://localhost:3303/student/all`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return studentData;
};

export const updateStudentByIdService = async (data: TStudent): Promise<Response> => {
	const studentData = await fetch(`http://localhost:3303/student/update/${data.id}`, {
		method: 'PUT',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			...data,
		}),
	});
	return studentData;
};

export const deleteStudentByIdService = async (id: string): Promise<Response> => {
	const studentData = await fetch(`http://localhost:3303/student/delete/${id}`, {
		method: 'DELETE',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
	});
	return studentData;
};

export const createStudentService = async (data: TStudent): Promise<Response> => {
	const studentData = await fetch(`http://localhost:3303/student/create`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			...data,
		}),
	});
	return studentData;
};
