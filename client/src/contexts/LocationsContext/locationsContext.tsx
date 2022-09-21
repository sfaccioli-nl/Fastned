import { createContext, useContext, useEffect, useState } from 'react';
import { ICharger } from '../../components/ChargersTable/ChargersTable';
import { ILocation } from '../../components/LocationsView/LocationsView';
import { getAllLocations } from '../../services/locationsService';

type LocationsProviderProps = { children: React.ReactNode };

const LocationsContext = createContext<any | undefined>(undefined);

/**
 * Locations context provider
 */
function LocationsProvider({ children }: LocationsProviderProps) {
	const [locations, setLocations] = useState<ILocation[]>();
	const [location, setLocation] = useState<ILocation>();
	const [refreshLocations, setRefreshLocations] = useState<boolean>(false);
	const [chargers, setChargers] = useState<ICharger[]>();

	useEffect(() => {
		if (refreshLocations) {
			getAllLocations()
				.then(locations => {
					setLocations(locations);
					setRefreshLocations(false);
				})
				.catch(e => console.log(e));
		}
	}, [refreshLocations]);

	useEffect(() => {
		getAllLocations()
			.then(locations => setLocations(locations))
			.catch(e => console.log(e));
	}, []);

	const value = { locations, location, chargers, setChargers, setLocations, setLocation, setRefreshLocations };

	return <LocationsContext.Provider value={value}>{children}</LocationsContext.Provider>;
}

/**
 * Custom consumer hook
 */
function useLocations() {
	const context = useContext(LocationsContext);
	if (context === undefined) {
		throw new Error('useLocations must be used within a LocationsProvider');
	}
	return context;
}

export { LocationsProvider, useLocations };
