import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useLocations } from '../../contexts/LocationsContext/locationsContext';
import { createNewCharger, getChargerById, IChargerReqBody, updateCharger } from '../../services/chargersService';
import { sortByDateDesc } from '../../utils/sortByDate';
import { ICharger } from '../ChargersTable/ChargersTable';
import styles from './ChargerForm.module.scss';

interface IChargerForm {
	submitRef: any;
	chargerId?: string;
	setOpenPopup: (s: boolean) => void;
}

/**
 * Component to add or edit a charger
 */
export function ChargerForm(props: IChargerForm): JSX.Element {
	const { register, handleSubmit, reset } = useForm();
	const { location, setChargers, chargers } = useLocations();

	/**
	 * on submit form
	 */
	function onSubmit(data: FieldValues) {
		if (props.chargerId) {
			updateCharger({ ...data } as IChargerReqBody, props.chargerId).then(response => {
				const filteredChargers = chargers.filter((charger: ICharger) => charger._id !== props.chargerId);
				setChargers(sortByDateDesc([...filteredChargers, response]));
				props.setOpenPopup(false);
			});
		} else {
			createNewCharger({ ...data, location: location?._id } as IChargerReqBody).then(response => {
				setChargers(sortByDateDesc([...(chargers ?? []), response]));
				props.setOpenPopup(false);
			});
		}
	}

	useEffect(() => {
		if (props.chargerId) {
			getChargerById(props.chargerId).then(response => {
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
