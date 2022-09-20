import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useLocations } from '../../contexts/LocationsContext/locationsContext';
import { createNewLocation, ILocationReqBody } from '../../services/locationsService';
import { ILocation } from '../LocationsView/LocationsView';
import Button from '../UI/Button/Button';
import styles from './LocationForm.module.scss';

/**
 * Component to add and edit a location
 */
export default function LocationForm(): JSX.Element {
	const { id } = useParams();
	const { location, locations, setLocation } = useLocations();

	const { register, handleSubmit, reset } = useForm();

	/**
	 * on submit form
	 */
	function onSubmit(data: FieldValues) {
		createNewLocation({ ...data } as ILocationReqBody);
	}

	useEffect(() => {
		if (location) {
			reset({ ...location });
		}
	}, [location, reset]);

	useEffect(() => {
		if (id && !location && locations) {
			const location = locations.find((loc: ILocation) => loc._id === id);

			if (location) {
				setLocation(location);
			}
		}
	}, [id, location, locations, setLocation]);

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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

			<Button type="submit" className={'primary'}>
				Save Location
			</Button>
		</form>
	);
}
