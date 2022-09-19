import { useEffect, useState } from 'react';
import LocationsTable from '../LocationsTable/LocationsTable';

export interface ILocation {
	_id: number;
	name: string;
	location: number;
	chargers: ICharger[];
	postalCode: string;
	updatedAt: string;
	country: string;
}

interface ICharger {
	id: number;
	type: 'HPC' | 'T52' | 'T53C';
	serialNumber: string;
	status: 'CONNECTED' | 'NOT_CONNECTED' | 'REMOVED';
	lastUpdated: string;
}

/**
 * Locations list component
 */
export default function LocationsView(): JSX.Element {
	const [locations, setLocations] = useState<ILocation[]>();

	/**
	 * Fetches locations from DB
	 */
	async function getLocations() {
		try {
			const data = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/locations`, { method: 'GET' }).then(res => res.json());
			setLocations(data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getLocations();
	}, []);

	return <LocationsTable locations={locations} />;
}
