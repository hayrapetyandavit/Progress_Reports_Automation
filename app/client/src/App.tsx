import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import AdminLayout from './layout/AdminLayout';
import PublicLayout from './layout/PublicLayout';
import LoginForm from './components/LoginForm/LoginForm';
import Trainers from './pages/Trainers/Trainers';
import Groups from './pages/Courses/Courses';
import Reports from './pages/Reports/Reports';
import Students from './pages/Students/Students';
import Subjects from './pages/Subjects/Subjects';
import Settings from './pages/Settings/Settings';
import AuthLayout from './layout/AuthLayout';
import TrainerLayout from './layout/TrainerLayout';
import TrainerReports from './pages/TrainerReports/TrainerReports';
import NotFound from './components/NotFound/NotFound';
import SendReports from './pages/Reports/SendReports';
import TrainerCourses from './pages/TrainerCourses/trainerCourses';
import TrainerSubjects from './pages/TrainerSubjects/trainerSubjects';
import TrainerStudents from './pages/TrainerStudents/trainerStudents';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<div className="App">
			<ToastContainer />
			<AnimatePresence>
				<Routes>
					<Route element={<MainLayout />}>
						<Route element={<PublicLayout />}>
							<Route path="/login" element={<LoginForm />} />
						</Route>
						<Route element={<AuthLayout />}>
							<Route element={<AdminLayout />}>
								<Route path="/" element={<Groups />} />
								<Route path="/trainers" element={<Trainers />} />
								<Route path="/courses" element={<Groups />} />
								<Route path="/students" element={<Students />} />
								<Route path="/subjects" element={<Subjects />} />
								<Route path="/reports" element={<Reports />} />
								<Route path="/send-report" element={<SendReports />} />
								<Route path="/settings" element={<Settings />} />
							</Route>
							<Route element={<TrainerLayout />}>
								<Route path="/trainer/courses" element={<TrainerCourses />} />
								<Route path="/trainer/subjects" element={<TrainerSubjects />} />
								<Route path="/trainer/students" element={<TrainerStudents />} />
								<Route path="/trainer/reports" element={<TrainerReports />} />
								<Route path="/trainer/settings" element={<Settings />} />
							</Route>
						</Route>
						<Route path="*" element={<NotFound />} />
					</Route>
				</Routes>
			</AnimatePresence>
		</div>
	);
}

export default App;
