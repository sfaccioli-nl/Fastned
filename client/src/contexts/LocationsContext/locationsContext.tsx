import { createContext, useContext, useEffect, useState } from 'react';
import { ILocation } from '../../components/LocationsView/LocationsView';
import { getAllLocations, getLocationById } from '../../services/locationsService';

type LocationsProviderProps = { children: React.ReactNode };

const LocationsContext = createContext<any | undefined>(undefined);

/**
 * Locations context provider
 */
function LocationsProvider({ children }: LocationsProviderProps) {
	const [locations, setLocations] = useState<ILocation[]>();
	const [location, setLocation] = useState<ILocation>();
	const [refreshLocations, setRefreshLocations] = useState<boolean>(false);
	const [refreshLocation, setRefreshLocation] = useState<string | undefined>();

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
		if (refreshLocation) {
			getLocationById(refreshLocation)
				.then(location => {
					setLocation(location);
					setRefreshLocation(undefined);
				})
				.catch(e => console.log(e));
		}
	}, [refreshLocation]);

	useEffect(() => {
		getAllLocations()
			.then(locations => setLocations(locations))
			.catch(e => console.log(e));
	}, []);

	const value = { locations, location, setRefreshLocation, setLocations, setLocation, setRefreshLocations };

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
