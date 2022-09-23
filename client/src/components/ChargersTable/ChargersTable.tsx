import { faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { useLocations } from '../../contexts/LocationsContext/locationsContext';
import { useSnackBar } from '../../contexts/SnackBarContext/snackBarContext';
import useMediaQuery from '../../hooks/useMediaQuery';
import { removeChargerById } from '../../services/chargersService';
import { sortByDateDesc } from '../../utils/sortByDate';
import Card, { ICardData } from '../Card/Card';
import { ChargerForm } from '../ChargerForm/ChargerForm';
import GenericTable from '../GenericTable/GenericTable';
import Popup from '../Popup/Popup';
import Button from '../UI/Button/Button';
import Tag from '../UI/Tag/Tag';
import styles from './ChargersTable.module.scss';

export interface ICharger {
	_id: string;
	type: 'HPC' | 'T52' | 'T53C';
	serialNumber: string;
	status: 'CONNECTED' | 'NOT_CONNECTED' | 'REMOVED';
	updatedAt: string;
	location: string;
}

export interface IChargerResponse extends ICharger {
	msg: string;
}

interface IChargersTableValue {
	id: string;
	type: string;
	serialNumber: string;
	status: any;
	updatedAt: string;
	links: any;
}

enum PopupActionType {
	ADD = 'Add Charger',
	EDIT = 'Edit Charger',
	REMOVE = 'Remove Charger'
}

export enum statusTypeMapper {
	CONNECTED = 'connected',
	NOT_CONNECTED = 'notConnected',
	REMOVED = 'removed'
}

/**
 * Chargers table component
 */
export default function ChargersTable(): JSX.Element {
	const [openPopup, setOpenPopup] = useState<boolean>(false);
	const [popupActionType, setPopupActionType] = useState<PopupActionType>(PopupActionType.ADD);
	const [chargerId, setChargerId] = useState<string | undefined>();
	const submitRef = useRef();
	const { chargers, setChargers } = useLocations();
	const { setSnackBar } = useSnackBar();
	const isMedium = useMediaQuery('(max-width: 767px)');

	const tableTitles = ['Id', 'Type ', 'Serial Number', 'Status', 'Last Updated', 'Actions'];

	const statusMapper = {
		CONNECTED: 'Connected',
		NOT_CONNECTED: 'Not connected',
		REMOVED: 'Removed'
	};

	const chargersTableData: IChargersTableValue[] | undefined =
		chargers &&
		chargers.map((charger: ICharger) => ({
			id: charger._id,
			type: charger.type,
			serialNumber: charger.serialNumber,
			status: <Tag text={statusMapper[charger.status]} statusColor={statusTypeMapper[charger.status]} />,
			updatedAt: `${new Date(charger.updatedAt).toLocaleDateString()} ${new Date(charger.updatedAt).toLocaleTimeString()}`,
			links: (
				<div id="actions" className={styles.actions}>
					<FontAwesomeIcon className={styles.edit} icon={faPenToSquare} onClick={() => handlesEdit(charger._id)} />
					<FontAwesomeIcon className={styles.remove} icon={faTrash} onClick={() => handlesRemove(charger._id)} />
				</div>
			)
		}));

	/**
	 * Handles add new button click
	 */
	function handlesAddNew() {
		setChargerId(undefined);
		setPopupActionType(PopupActionType.ADD);
		setOpenPopup(true);
	}

	/**
	 * Handles edit button click
	 */
	function handlesEdit(id: string) {
		setChargerId(id);
		setPopupActionType(PopupActionType.EDIT);
		setOpenPopup(true);
	}

	/**
	 * Handles remove new button click
	 */
	function handlesRemove(id: string) {
		setChargerId(id);
		setPopupActionType(PopupActionType.REMOVE);
		setOpenPopup(true);
	}

	/**
	 * Removes the selected charger
	 */
	function removeCharger() {
		if (chargerId) {
			removeChargerById(chargerId).then(() => {
				const filteredChargers = chargers.filter((charger: ICharger) => charger._id !== chargerId);
				setChargers(sortByDateDesc([...filteredChargers]));
				setOpenPopup(false);
				setSnackBar({
					open: true,
					msg: 'Charger removed successfully',
					type: 'success'
				});
			});
		}
	}

	/**
	 * Generates popup content
	 */
	function generatePopupContent() {
		if ([PopupActionType.ADD, PopupActionType.EDIT].includes(popupActionType)) {
			return <ChargerForm chargerId={chargerId} submitRef={submitRef} setOpenPopup={setOpenPopup} />;
		}

		return <p>Are you sure you want to delete this charger?</p>;
	}

	/**
	 * Maps charger to card data model
	 */
	function mapToCard(charger: IChargersTableValue): ICardData[] {
		return [
			{
				label: 'Type',
				value: charger.type
			},
			{
				label: 'Status',
				value: charger.status
			},
			{
				label: 'Last Updated',
				value: charger.updatedAt
			}
		] as ICardData[];
	}

	return (
		<div className={styles.container}>
			<Button className="primary" onClick={handlesAddNew}>
				<FontAwesomeIcon icon={faPlus} />
				Add Charger
			</Button>

			{chargersTableData && isMedium ? (
				chargersTableData.map((charger: IChargersTableValue, idx: number) => (
					<Card
						key={idx}
						title={charger.serialNumber}
						data={mapToCard(charger)}
						links={
							<div>
								<Button className="primary" type="button" onClick={() => handlesEdit(charger.id)}>
									Edit
								</Button>
								<Button className="secondary" type="button" onClick={() => handlesRemove(charger.id)}>
									Remove
								</Button>
							</div>
						}
					/>
				))
			) : (
				<GenericTable tableHeadTitles={tableTitles} data={chargersTableData} />
			)}

			<Popup
				visible={openPopup}
				setVisible={setOpenPopup}
				title={popupActionType}
				content={generatePopupContent()}
				submitRef={submitRef}
				onSave={removeCharger}
			/>
		</div>
	);
}
