import { useLocations } from '../../contexts/LocationsContext/locationsContext';
import LocationsTable from '../LocationsTable/LocationsTable';

export interface ILocation {
	_id: string;
	name: string;
	location: number;
	chargers: ICharger[];
	city: string;
	postalCode: string;
	updatedAt: string;
	country: string;
}

interface ICharger {
	id: string;
	type: 'HPC' | 'T52' | 'T53C';
	serialNumber: string;
	status: 'CONNECTED' | 'NOT_CONNECTED' | 'REMOVED';
	lastUpdated: string;
}

/**
 * Locations list component
 */
export default function LocationsView(): JSX.Element {
	const { locations } = useLocations();

	return <LocationsTable locations={locations} />;
}
