import { rest } from 'msw';
import { locationsMock } from '../mocks/locations';
import { server } from '../mocks/server';
import { getAllLocations, getLocationById } from '../services/locationsService';

describe('getAllLocations method', () => {
	test('should get data on resolve', async () => {
		const locations = await getAllLocations();
		expect(locations.length).toEqual(locationsMock.length);
		expect(locations).toEqual(locationsMock);
	});
});

describe('getLocationById method', () => {
	test('should get location on resolve', async () => {
		const location = await getLocationById(locationsMock[0]._id);
		expect(location).toEqual(locationsMock[0]);
	});

	test('should return a message on reject', async () => {
		server.use(
			rest.get(`${process.env.REACT_APP_SERVER_URL}/api/locations/:id`, (req, res, ctx) => {
				return res(ctx.json({ msg: 'The location with the given ID was not found' }));
			})
		);

		const location = await getLocationById('632d23c7411681c9d3ab07e3ss');
		expect(location.msg).toEqual('The location with the given ID was not found');
	});
});
