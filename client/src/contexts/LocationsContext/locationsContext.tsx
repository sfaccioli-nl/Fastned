import { useQuery } from '@tanstack/react-query';
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

	const { data: locationsData } = useQuery(['locationsData'], () => getAllLocations());

	const { data: countriesData } = useQuery(['countriesData'], () => getAllCountries());

	useEffect(() => {
		if (locationsData) {
			setLocations(sortByDateDesc([...locationsData]));
		}

		if (countriesData) {
			setCountries(countriesData);
		}
	}, [locationsData, countriesData]);

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
