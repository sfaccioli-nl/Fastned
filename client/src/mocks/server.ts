import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { locationsMock } from './locations';

export const server = setupServer(
	rest.get(`${process.env.REACT_APP_SERVER_URL}/api/locations`, (req, res, ctx) => {
		return res(ctx.json(locationsMock));
	}),
	rest.get(`${process.env.REACT_APP_SERVER_URL}/api/locations/:id`, (req, res, ctx) => {
		const { id } = req.params;
		const location = locationsMock.find(location => location._id === id);

		return res(ctx.json(location));
	})
);
