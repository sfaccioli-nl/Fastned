import { Route, Routes } from 'react-router-dom';
import { LocationsProvider } from '../../contexts/LocationsContext/locationsContext';
import { SnackBarProvider } from '../../contexts/SnackBarContext/snackBarContext';
import CreateLocation from '../CreateLocation/CreateLocation';
import EditLocation from '../EditLocation/EditLocation';
import Layout from '../Layout/Layout';
import LocationsView from '../LocationsView/LocationsView';

/** App component */
export default function App() {
	return (
		<LocationsProvider>
			<SnackBarProvider>
				<Routes>
					<Route element={<Layout />}>
						<Route index element={<LocationsView />} />
						<Route path="/location/create" element={<CreateLocation />} />
						<Route path="/location/:id" element={<EditLocation />} />
					</Route>
				</Routes>
			</SnackBarProvider>
		</LocationsProvider>
	);
}
