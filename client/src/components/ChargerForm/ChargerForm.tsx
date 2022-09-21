import { useForm } from 'react-hook-form';
import styles from './ChargerForm.module.scss';

/**
 * Component to add or edit a charger
 */
export function ChargerForm(): JSX.Element {
	const { register, handleSubmit, reset } = useForm();

	return (
		<form className={styles.form}>
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
		</form>
	);
}
