import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useLocations } from '../../contexts/LocationsContext/locationsContext';
import { useSnackBar } from '../../contexts/SnackBarContext/snackBarContext';
import { ILocationReqBody, updateLocation } from '../../services/locationsService';
import { sortByDateDesc } from '../../utils/sortByDate';
import LocationForm from '../LocationForm/LocationForm';
import { ILocation, ILocationResponse } from '../LocationsView/LocationsView';

/**
 * Fetch location function
 */
async function fetchLocation({ queryKey }: any) {
	// eslint-disable-next-line unused-imports/no-unused-vars
	const [_key, { id }] = queryKey;
	const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/locations/${id}`);

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return response.json();
}

/**
 * Create location component
 */
export default function EditLocation(): JSX.Element {
	const { id } = useParams();
	const { data: location } = useQuery(['location', { id }], fetchLocation);
	const { locations, setLocations } = useLocations();
	const { setSnackBar } = useSnackBar();

	const mutation = useMutation(['editLocation'], (newLocation: ILocationReqBody) => updateLocation(newLocation, id ?? ''), {
		onSuccess: (response: ILocationResponse) => {
			if (response.msg) {
				setSnackBar({
					open: true,
					msg: response.msg,
					type: 'error'
				});
			} else {
				const locationsToSet = locations.filter((location: ILocation) => location._id !== id);
				setLocations(sortByDateDesc([...locationsToSet, response]));
				setSnackBar({
					open: true,
					msg: `Location created successfully`,
					type: 'success'
				});
			}
		}
	});

	/**
	 * on submit form
	 */
	async function onSubmit(data: ILocationReqBody) {
		mutation.mutate(data);
	}

	return <>{location && <LocationForm submitAction="Update" onSubmit={onSubmit} location={location} />}</>;
}
