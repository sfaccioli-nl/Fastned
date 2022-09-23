import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { locationsMock } from './locations';

export const server = setupServer(
	rest.get('/api/locations', (req, res, ctx) => {
		return res(ctx.json(locationsMock));
	})
);
