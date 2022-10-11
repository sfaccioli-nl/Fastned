import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useLocations } from '../../contexts/LocationsContext/locationsContext';
import { useSnackBar } from '../../contexts/SnackBarContext/snackBarContext';
import { createNewLocation, ILocationReqBody } from '../../services/locationsService';
import { sortByDateDesc } from '../../utils/sortByDate';
import LocationForm from '../LocationForm/LocationForm';
import { ILocationResponse } from '../LocationsView/LocationsView';

/**
 * Create Location component
 */
export default function CreateLocation(): JSX.Element {
	const { locations, setLocations } = useLocations();
	const { setSnackBar } = useSnackBar();
	const navigation = useNavigate();

	const mutation = useMutation(['postLocation'], (newLocation: ILocationReqBody) => createNewLocation(newLocation), {
		onSuccess: (response: ILocationResponse) => {
			if (response.msg) {
				setSnackBar({
					open: true,
					msg: response.msg,
					type: 'error'
				});
			} else {
				setLocations(sortByDateDesc([...locations, response]));
				setSnackBar({
					open: true,
					msg: `Location created successfully`,
					type: 'success'
				});
				navigation('/');
			}
		}
	});

	const { isSuccess } = mutation;

	/**
	 * on submit form
	 */
	async function onSubmit(data: ILocationReqBody) {
		mutation.mutate(data);
	}

	if (isSuccess) {
		navigation('/');
	}

	return <LocationForm submitAction="Save" onSubmit={onSubmit} />;
}
