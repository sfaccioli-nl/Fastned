import { createContext, useContext, useEffect, useState } from 'react';
import { ICharger } from '../../components/ChargersTable/ChargersTable';
import { ILocation } from '../../components/LocationsView/LocationsView';
import { getAllCountries, ICountry } from '../../services/countriesService';
import { getAllLocations } from '../../services/locationsService';
import { sortByDateDesc } from '../../utils/sortByDate';

type LocationsProviderProps = { children: React.ReactNode };

const LocationsContext = createContext<any | undefined>(undefined);

/**
 * Locations context provider
 */
function LocationsProvider({ children }: LocationsProviderProps) {
	const [locations, setLocations] = useState<ILocation[]>();
	const [location, setLocation] = useState<ILocation>();
	const [chargers, setChargers] = useState<ICharger[]>();
	const [countries, setCountries] = useState<ICountry[]>();

	useEffect(() => {
		getAllLocations()
			.then(locations => {
				setLocations(sortByDateDesc<ILocation>(locations));
			})
			.catch(e => console.log(e));

		getAllCountries()
			.then(countries => {
				setCountries(countries.sort());
			})
			.catch(e => console.log(e));
	}, []);

	const value = { locations, location, chargers, countries, setChargers, setLocations, setLocation };

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
