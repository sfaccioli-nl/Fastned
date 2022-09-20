import { Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import LocationForm from '../LocationForm/LocationForm';
import LocationsView from '../LocationsView/LocationsView';

/** App component */
export default function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<LocationsView />} />
				<Route path="/location" element={<LocationForm />} />
				<Route path="/location/:id" element={<LocationForm />} />
			</Route>
		</Routes>
	);
}
