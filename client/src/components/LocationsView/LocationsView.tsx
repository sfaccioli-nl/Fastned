import { useEffect, useState } from 'react';
import { getAllLocations } from '../../services/locationsService';
import LocationsTable from '../LocationsTable/LocationsTable';

export interface ILocation {
	_id: number;
	name: string;
	location: number;
	chargers: ICharger[];
	city: string;
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

	useEffect(() => {
		getAllLocations()
			.then(locations => setLocations(locations))
			.catch(e => console.log(e));
	}, []);

	return <LocationsTable locations={locations} />;
}
