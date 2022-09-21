import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useLocations } from '../../contexts/LocationsContext/locationsContext';
import { createNewCharger, getChargerById, IChargerReqBody, updateCharger } from '../../services/chargersService';
import { ICharger } from '../ChargersTable/ChargersTable';
import styles from './ChargerForm.module.scss';

interface IChargerForm {
	submitRef: any;
	chargerId?: string;
}

/**
 * Component to add or edit a charger
 */
export function ChargerForm(props: IChargerForm): JSX.Element {
	const [charger, setCharger] = useState<ICharger>();
	const { register, handleSubmit, reset } = useForm();
	const { location, setRefreshLocation } = useLocations();

	/**
	 * on submit form
	 */
	function onSubmit(data: FieldValues) {
		if (charger) {
			updateCharger({ ...data, location: charger.location } as IChargerReqBody, charger._id).then(() => setRefreshLocation(location._id));
		} else {
			createNewCharger({ ...data, location: location._id } as IChargerReqBody).then(() => {
				setRefreshLocation(location._id);
				console.log('creation');
			});
		}
	}

	useEffect(() => {
		if (props.chargerId) {
			getChargerById(props.chargerId).then(response => {
				setCharger(response);
				reset({ ...response });
			});
		}
	}, [props.chargerId, reset]);

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.statusField}>
				<label htmlFor="status">Status</label>
				<select id="status" {...register('status', { required: true })}>
					<option value="">--Please choose an option--</option>
					<option value="CONNECTED">CONNECTED</option>
					<option value="NOT_CONNECTED">NOT CONNECTED</option>
					<option value="REMOVED">REMOVED</option>
				</select>
			</div>

			<div className={styles.typeField}>
				<label htmlFor="type">Type</label>
				<select id="type" {...register('type', { required: true })}>
					<option value="">--Please choose an option--</option>
					<option value="HPC">HPC</option>
					<option value="T52">T52</option>
					<option value="T53C">T53C</option>
				</select>
			</div>

			<div className={styles.serialNumberField}>
				<label htmlFor="serialNumber">Serial Number</label>
				<input id="serialNumber" type="text" placeholder="Serial Number" {...register('serialNumber', { required: true })} />
			</div>

			<button ref={props.submitRef} type="submit" style={{ display: 'none' }} />
		</form>
	);
}
