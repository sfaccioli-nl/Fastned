import { faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { useLocations } from '../../contexts/LocationsContext/locationsContext';
import { useSnackBar } from '../../contexts/SnackBarContext/snackBarContext';
import { removeChargerById } from '../../services/chargersService';
import { sortByDateDesc } from '../../utils/sortByDate';
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

	const tableTitles = ['Id', 'Type ', 'Serial Number', 'Status', 'Last Updated', 'Actions'];

	const chargersTableData: IChargersTableValue[] | undefined =
		chargers &&
		chargers.map((charger: ICharger) => ({
			id: charger._id,
			type: charger.type,
			serialNumber: charger.serialNumber,
			status: <Tag text={charger.status} color={charger.status === 'CONNECTED' ? 'green' : charger.status === 'NOT_CONNECTED' ? 'red' : 'blue'} />,
			updatedAt: `${new Date(charger.updatedAt).toLocaleDateString()} ${new Date(charger.updatedAt).toLocaleTimeString()}`,
			links: (
				<div className={styles.actions}>
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

	return (
		<div className={styles.container}>
			<Button className="primary" onClick={handlesAddNew}>
				<FontAwesomeIcon icon={faPlus} />
				Add Charger
			</Button>

			<GenericTable tableHeadTitles={tableTitles} data={chargersTableData} />

			{(popupActionType === PopupActionType.ADD || popupActionType === PopupActionType.EDIT) && (
				<Popup
					visible={openPopup}
					setVisible={setOpenPopup}
					title={popupActionType}
					content={<ChargerForm chargerId={chargerId} submitRef={submitRef} setOpenPopup={setOpenPopup} />}
					submitRef={submitRef}
				/>
			)}

			{popupActionType === PopupActionType.REMOVE && (
				<Popup
					visible={openPopup}
					setVisible={setOpenPopup}
					title={popupActionType}
					content={<p>Are you sure you want to delete this charger?</p>}
					onSave={removeCharger}
				/>
			)}
		</div>
	);
}
