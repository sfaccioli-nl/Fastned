import { ILocation } from '../components/LocationsView/LocationsView';

export const locationsMock: ILocation[] = [
	{
		_id: '632d23c7411681c9d3ab07e3',
		name: 'mockedLocation1',
		location: 886543,
		city: 'Ams',
		postalCode: '777',
		country: 'BEL',
		chargers: [
			{
				_id: '632d24e6411681c9d3ab0817',
				type: 'T52',
				serialNumber: '123-44',
				status: 'CONNECTED',
				location: '632d23c7411681c9d3ab07e3',
				updatedAt: '2022-09-23T03:15:50.858Z'
			}
		],
		updatedAt: '2022-09-23T03:15:50.910Z'
	},

	{
		_id: '632d23c7411681c9d3ab07e3',
		name: 'mockedLocation2',
		location: 886543,
		city: 'Ams',
		postalCode: '777',
		country: 'NDL',
		chargers: [],
		updatedAt: '2022-09-23T03:15:50.910Z'
	}
];
