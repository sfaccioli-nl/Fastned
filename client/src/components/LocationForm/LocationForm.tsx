import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocations } from '../../contexts/LocationsContext/locationsContext';
import { createNewLocation, getLocationById, ILocationReqBody, updateLocation } from '../../services/locationsService';
import { sortByDateDesc } from '../../utils/sortByDate';
import ChargersTable, { ICharger } from '../ChargersTable/ChargersTable';
import Button from '../UI/Button/Button';
import styles from './LocationForm.module.scss';

/**
 * Component to add and edit a location
 */
export default function LocationForm(): JSX.Element {
	const { id } = useParams();
	const navigation = useNavigate();
	const { location, locations, setLocation, setChargers, chargers, setLocations, setRefreshLocations } = useLocations();

	const { register, handleSubmit, reset } = useForm();

	/**
	 * on submit form
	 */
	function onSubmit(data: FieldValues) {
		const newLoc: ILocationReqBody = {
			name: data.name,
			location: data.location,
			city: data.city,
			postalCode: data.postalCode,
			country: data.country,
			chargers: chargers?.map((c: ICharger) => c._id)
		};
		if (id) {
			updateLocation(newLoc, id).then(response => {
				setLocation(response);
				setChargers(response.chargers as ICharger[]);
			});
		} else {
			createNewLocation(newLoc).then(response => {
				setLocations(sortByDateDesc([...locations, response]));
				navigation('/');
			});
		}
	}

	useEffect(() => {
		if (id && !location) {
			getLocationById(id).then(response => {
				setLocation(response);
				setChargers(response.chargers as ICharger[]);
				reset({ ...response });
			});
		}
	}, [id, location, reset, setChargers, setLocation]);

	useEffect(() => {
		return () => {
			setLocation(undefined);
			setChargers(undefined);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.container}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<Button type="submit" className={'primary'} onClick={onSubmit}>
					<FontAwesomeIcon icon={faFloppyDisk} />
					{id ? 'Update Location' : 'Save Location'}
				</Button>

				<div className={styles.nameField}>
					<label htmlFor="name">Name</label>
					<input id="name" type="text" placeholder="Name" {...register('name', { required: true })} />
				</div>

				<div className={styles.locationField}>
					<label htmlFor="locationNro">Location No</label>
					<input id="locationNro" type="number" placeholder="Location No" {...register('location', { required: true, valueAsNumber: true })} />
				</div>

				<div className={styles.cityField}>
					<label htmlFor="city">City</label>
					<input id="city" type="text" placeholder="City" {...register('city', { required: true })} />
				</div>

				<div className={styles.postalCodeField}>
					<label htmlFor="postalCode">Postal Code</label>
					<input id="postalCode" type="text" placeholder="Postal Code" {...register('postalCode', { required: true })} />
				</div>

				<div className={styles.countryField}>
					<label htmlFor="country">Country:</label>
					<select id="country" {...register('country', { required: true })}>
						<option value="">--Please choose an option--</option>
						<option value="NLD">Netherlands</option>
						<option value="BEL">Belgium</option>
						<option value="DEU">Germany</option>
					</select>
				</div>
			</form>

			<ChargersTable />
		</div>
	);
}
