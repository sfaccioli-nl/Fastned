import { useLocations } from '../../contexts/LocationsContext/locationsContext';
import { ICharger } from '../ChargersTable/ChargersTable';
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

/**
 * Locations list component
 */
export default function LocationsView(): JSX.Element {
	const { locations } = useLocations();

	return <LocationsTable locations={locations} />;
}
