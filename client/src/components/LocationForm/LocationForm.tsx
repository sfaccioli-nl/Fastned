import { faClose, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocations } from '../../contexts/LocationsContext/locationsContext';
import { useSnackBar } from '../../contexts/SnackBarContext/snackBarContext';
import { ILocationReqBody, removeLocationById } from '../../services/locationsService';
import { sortByDateDesc } from '../../utils/sortByDate';
import ChargersTable, { ICharger } from '../ChargersTable/ChargersTable';
import { ILocation } from '../LocationsView/LocationsView';
import Popup from '../Popup/Popup';
import Button from '../UI/Button/Button';
import styles from './LocationForm.module.scss';
import { ICountry } from '../../services/countriesService';
import { useMutation } from '@tanstack/react-query';

interface ILocationFormProps {
	submitAction: string;
	onSubmit: (data: ILocationReqBody) => Promise<void>;
	location?: ILocation;
}

/**
 * Component to add and edit a location
 */
export default function LocationForm(props: ILocationFormProps): JSX.Element {
	const [openPopup, setOpenPopup] = useState<boolean>(false);
	const { setSnackBar } = useSnackBar();
	const navigation = useNavigate();
	const submitRef = useRef<HTMLButtonElement | null>(null);
	const { locations, chargers, countries, setLocation, setLocations, setChargers } = useLocations();

	const { id } = useParams();
	const {
		register,
		formState: { errors },
		handleSubmit,
		control
	} = useForm({
		defaultValues: props.location || {}
	});

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

		props.onSubmit(newLoc);
	}

	const mutation = useMutation((id: string) => removeLocationById(id), {
		onSuccess: () => {
			const filteredLocations = locations.filter((location: ILocation) => location._id !== id);
			setLocations(sortByDateDesc([...filteredLocations]));
			setSnackBar({
				open: true,
				msg: 'Location removed successfully',
				type: 'success'
			});
			navigation('/');
		}
	});

	const { isSuccess } = mutation;

	if (isSuccess) {
		navigation('/');
	}

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
				<button ref={submitRef} type="submit" style={{ display: 'none' }} />

				<div className={styles.nameField}>
					<label htmlFor="name">Name</label>
					<input id="name" type="text" placeholder="Name" {...register('name', { required: 'Name is required' })} />
					<ErrorMessage errors={errors} name="name" render={({ message }) => <p className={styles.error}>{message}</p>} />
				</div>

				<div className={styles.locationField}>
					<label htmlFor="locationNro">Location No</label>
					<input
						id="locationNro"
						type="number"
						placeholder="Location No"
						{...register('location', { required: 'Location is required', valueAsNumber: true })}
					/>
					<ErrorMessage errors={errors} name="location" render={({ message }) => <p className={styles.error}>{message}</p>} />
				</div>

				<div className={styles.cityField}>
					<label htmlFor="city">City</label>
					<input id="city" type="text" placeholder="City" {...register('city', { required: 'City is required' })} />
					<ErrorMessage errors={errors} name="city" render={({ message }) => <p className={styles.error}>{message}</p>} />
				</div>

				<div className={styles.postalCodeField}>
					<label htmlFor="postalCode">Postal Code</label>
					<input id="postalCode" type="text" placeholder="Postal Code" {...register('postalCode', { required: 'Postal Code is required' })} />
					<ErrorMessage errors={errors} name="postalCode" render={({ message }) => <p className={styles.error}>{message}</p>} />
				</div>

				<div className={styles.countryField}>
					<label htmlFor="country">Country:</label>
					<Controller
						control={control}
						name="country"
						render={({ field }) => {
							return (
								<select {...field} {...register('country', { required: 'Country is required' })}>
									{(countries || []).map((country: ICountry, idx: any) => (
										<option key={idx} value={country.code}>
											{country.name}
										</option>
									))}
								</select>
							);
						}}
					/>
					<ErrorMessage errors={errors} name="country" render={({ message }) => <p className={styles.error}>{message}</p>} />
				</div>
			</form>

			{id && (
				<Popup
					visible={openPopup}
					setVisible={setOpenPopup}
					title="Remove Location"
					content={<p>Are you sure you want to delete the location?</p>}
					onSave={() => mutation.mutate(id)}
				/>
			)}

			<ChargersTable />

			<div className={styles.locationActions}>
				{id && (
					<Button type="submit" className={'secondary'} onClick={() => setOpenPopup(true)}>
						<FontAwesomeIcon icon={faClose} />
						Remove Location
					</Button>
				)}

				<Button
					type="submit"
					className={'primary'}
					onClick={() => {
						if (submitRef && submitRef.current) {
							submitRef.current.click();
						}
					}}>
					<FontAwesomeIcon icon={faFloppyDisk} />
					{`${props.submitAction} Location`}
				</Button>
			</div>
		</div>
	);
}
