import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateLocation from '../components/CreateLocation/CreateLocation';
import EditLocation from '../components/EditLocation/EditLocation';
import Layout from '../components/Layout/Layout';
import LocationsView from '../components/LocationsView/LocationsView';
import { LocationsProvider } from '../contexts/LocationsContext/locationsContext';
import { SnackBarProvider } from '../contexts/SnackBarContext/snackBarContext';
import { locationsMock } from '../mocks/locations';
import { server } from '../mocks/server';

test('renders the Add Location button', async () => {
	render(
		<BrowserRouter>
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
		</BrowserRouter>
	);

	await waitFor(() => {
		expect(screen.getByRole('button')).toBeInTheDocument();
		expect(screen.getByText('Add Location')).toBeInTheDocument();
	});
});

describe('renders the locations table', () => {
	test('renders the rows with the location information', async () => {
		render(
			<BrowserRouter>
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
			</BrowserRouter>
		);

		await waitFor(() => {
			expect(screen.getByRole('table')).toBeInTheDocument();

			const tableRows = document.querySelectorAll<HTMLElement>('table tbody tr');
			expect(tableRows.length).toBe(locationsMock.length);

			locationsMock.forEach(location => {
				expect(screen.getByText(location.name)).toBeInTheDocument();
			});
		});
	});

	test('renders a message when there are no locations to display', async () => {
		server.use(
			rest.get(`${process.env.REACT_APP_SERVER_URL}/api/locations`, (req, res, ctx) => {
				return res(ctx.json([]));
			})
		);

		render(
			<BrowserRouter>
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
			</BrowserRouter>
		);

		await waitFor(() => {
			expect(screen.getByRole('table')).toBeInTheDocument();

			const tableRows = document.querySelectorAll<HTMLElement>('table tbody tr');
			expect(tableRows.length).toBe(1);

			expect(screen.getByText('No data to display')).toBeInTheDocument();
		});
	});
});
