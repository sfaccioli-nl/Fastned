import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import Button from '../UI/Button/Button';
import styles from './LocationForm.module.scss';

/**
 * Component to add and edit a location
 */
export default function LocationForm(): JSX.Element {
	const locationState = useLocation();
	const location = locationState.state;

	const {
		register,
		handleSubmit,
		reset,
		watch,
		formState: { errors }
	} = useForm();

	/**
	 * Puts a location in the DB
	 */
	async function addLocation(data: any) {
		console.log(JSON.stringify(data));

		try {
			const result = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/locations`, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(res => res.json());
			console.log(result);
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * on submit form
	 */
	function onSubmit(data: FieldValues) {
		addLocation(data);
	}

	useEffect(() => {
		reset({ ...location });
	}, [location, reset]);

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.nameField}>
				<label htmlFor="name">Name</label>
				<input id="name" type="text" placeholder="Name" {...register('name', { required: true })} value={location && location.name} />
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
