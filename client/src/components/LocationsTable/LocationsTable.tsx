import { ILocation } from '../LocationsView/LocationsView';
import styles from './LocationsTable.module.scss';
import GenericTable from '../GenericTable/GenericTable';
import { getRelativeDate } from '../../utils/getRelativeDate';
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface ILocationsTableProps {
	locations?: ILocation[];
}

interface ILocationsTableValue {
	name: string;
	location: number;
	chargers: number;
	country: string;
	updatedAt: string;
	link: any;
}

/**
 * Locations table component
 */
export default function LocationsTable(props: ILocationsTableProps): JSX.Element {
	const tableTitles = ['Location', 'Location No', 'Chargers', 'Country', 'Last Updated', 'Actions'];

	const locationsTableData: ILocationsTableValue[] | undefined = props.locations?.map(location => ({
		name: location.name,
		location: location.location,
		chargers: location.chargers.length,
		country: location.country,
		updatedAt: getRelativeDate(location.updatedAt),
		link: (
			<Link to={`/location/${location._id}`} key={location._id}>
				<Button className="secondary">Edit</Button>
			</Link>
		)
	}));

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<p>Locations</p>
				<Link to="/location">
					<Button className="primary">
						<FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
						Add Location
					</Button>
				</Link>
			</div>

			<GenericTable tableHeadTitles={tableTitles} data={locationsTableData} />
		</div>
	);
}
