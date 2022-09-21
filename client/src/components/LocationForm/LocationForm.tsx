import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocations } from '../../contexts/LocationsContext/locationsContext';
import { createNewLocation, ILocationReqBody, updateLocation } from '../../services/locationsService';
import { ChargerForm } from '../ChargerForm/ChargerForm';
import { ILocation } from '../LocationsView/LocationsView';
import Popup from '../Popup/Popup';
import Button from '../UI/Button/Button';
import styles from './LocationForm.module.scss';

/**
 * Component to add and edit a location
 */
export default function LocationForm(): JSX.Element {
	const [openPopup, setOpenPopup] = useState<boolean>(false);

	const { id } = useParams();
	const navigation = useNavigate();
	const { location, locations, setLocation, setRefreshLocations } = useLocations();

	const { register, handleSubmit, reset } = useForm();

	/**
	 * on submit form
	 */
	function onSubmit(data: FieldValues) {
		if (id) {
			updateLocation({ ...data } as ILocationReqBody, id).then(() => setRefreshLocations(true));
		} else {
			createNewLocation({ ...data } as ILocationReqBody).then(() => {
				setRefreshLocations(true);
				navigation('/');
			});
		}
	}

	useEffect(() => {
		if (id && !location && locations) {
			const location = locations.find((loc: ILocation) => loc._id === id);

			if (location) {
				setLocation(location);
				reset({ ...location });
			}
		}
	}, [id, location, locations, reset, setLocation]);

	useEffect(() => {
		return () => {
			return setLocation(null);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.container}>
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
					{id ? 'Update Location' : 'Save Location'}
				</Button>
			</form>

			<div>
				<Button className="primary" onClick={() => setOpenPopup(true)}>
					<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
					Add Charger
				</Button>
			</div>

			<Popup visible={openPopup} setVisible={setOpenPopup} title="Add Charger" content={<ChargerForm />} />
		</div>
	);
}
