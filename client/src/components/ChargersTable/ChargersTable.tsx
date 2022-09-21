import { faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef, useState } from 'react';
import { useLocations } from '../../contexts/LocationsContext/locationsContext';
import { getRelativeDate } from '../../utils/getRelativeDate';
import { ChargerForm } from '../ChargerForm/ChargerForm';
import GenericTable from '../GenericTable/GenericTable';
import Popup from '../Popup/Popup';
import Button from '../UI/Button/Button';
import styles from './ChargersTable.module.scss';

export interface ICharger {
	_id: string;
	type: 'HPC' | 'T52' | 'T53C';
	serialNumber: string;
	status: 'CONNECTED' | 'NOT_CONNECTED' | 'REMOVED';
	updatedAt: string;
	location: string;
}

interface IChargersTableValue {
	id: string;
	type: string;
	serialNumber: string;
	status: string;
	updatedAt: string;
	links: any;
}

/**
 * Chargers table component
 */
export default function ChargersTable(): JSX.Element {
	const [openPopup, setOpenPopup] = useState<boolean>(false);
	const [chargerId, setChargerId] = useState<string | undefined>();
	const submitRef = useRef();
	const { chargers } = useLocations();

	const tableTitles = ['Id', 'Type ', 'Serial Number', 'Status', 'Last Updated', 'Actions'];

	const chargersTableData: IChargersTableValue[] | undefined = chargers.map((charger: ICharger) => ({
		id: charger._id,
		type: charger.type,
		serialNumber: charger.serialNumber,
		status: charger.status,
		updatedAt: getRelativeDate(charger.updatedAt),
		links: (
			<div className={styles.actions}>
				<FontAwesomeIcon className={styles.edit} icon={faPenToSquare} onClick={() => handlesEdit(charger._id)} />
				<FontAwesomeIcon className={styles.remove} icon={faTrash} onClick={() => handlesEdit(charger._id)} />
			</div>
		)
	}));

	/**
	 * Handles edit button click
	 */
	function handlesEdit(id: string) {
		setChargerId(id);
		setOpenPopup(true);
	}

	/**
	 * Handles add new button click
	 */
	function handlesAddNew() {
		setChargerId(undefined);
		setOpenPopup(true);
	}

	return (
		<div className={styles.container}>
			<Button className="primary" onClick={handlesAddNew}>
				<FontAwesomeIcon icon={faPlus} />
				Add Charger
			</Button>

			<GenericTable tableHeadTitles={tableTitles} data={chargersTableData} />

			<Popup
				visible={openPopup}
				setVisible={setOpenPopup}
				title="Add Charger"
				submitRef={submitRef}
				content={<ChargerForm chargerId={chargerId} submitRef={submitRef} setOpenPopup={setOpenPopup} />}
			/>
		</div>
	);
}
