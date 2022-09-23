import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useLocations } from '../../contexts/LocationsContext/locationsContext';
import { useSnackBar } from '../../contexts/SnackBarContext/snackBarContext';
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
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm();
	const { location, setChargers, chargers } = useLocations();
	const { setSnackBar } = useSnackBar();

	/**
	 * on submit form
	 */
	function onSubmit(data: FieldValues) {
		const promise = props.chargerId
			? updateCharger({ ...data } as IChargerReqBody, props.chargerId)
			: createNewCharger({ ...data, location: location?._id } as IChargerReqBody);

		promise.then(response => {
			if (response.msg) {
				setSnackBar({
					open: true,
					msg: response.msg,
					type: 'error'
				});
				props.setOpenPopup(false);
			} else {
				const chargersToSet = props.chargerId ? chargers.filter((charger: ICharger) => charger._id !== props.chargerId) : chargers ?? [];
				setChargers(sortByDateDesc([...chargersToSet, response]));
				props.setOpenPopup(false);
				setSnackBar({
					open: true,
					msg: `Charger ${props.chargerId ? 'updated' : 'created'} successfully`,
					type: 'success'
				});
			}
		});
	}

	useEffect(() => {
		if (props.chargerId) {
			getChargerById(props.chargerId).then(response => {
				reset({ ...response });
			});
		}
	}, [props.chargerId, reset]);

	return (
		<>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.statusField}>
					<label htmlFor="status">Status</label>
					<select id="status" {...register('status', { required: 'Status is required' })}>
						<option value="">--Please choose an option--</option>
						<option value="CONNECTED">CONNECTED</option>
						<option value="NOT_CONNECTED">NOT CONNECTED</option>
						<option value="REMOVED">REMOVED</option>
					</select>
					<ErrorMessage errors={errors} name="status" />
				</div>

				<div className={styles.typeField}>
					<label htmlFor="type">Type</label>
					<select id="type" {...register('type', { required: 'Type is required' })}>
						<option value="">--Please choose an option--</option>
						<option value="HPC">HPC</option>
						<option value="T52">T52</option>
						<option value="T53C">T53C</option>
					</select>
					<ErrorMessage errors={errors} name="type" />
				</div>

				<div className={styles.serialNumberField}>
					<label htmlFor="serialNumber">Serial Number</label>
					<input id="serialNumber" type="text" placeholder="Serial Number" {...register('serialNumber', { required: 'Serial number is required' })} />
					<ErrorMessage errors={errors} name="serialNumber" />
				</div>

				<button ref={props.submitRef} type="submit" style={{ display: 'none' }} />
			</form>
		</>
	);
}
