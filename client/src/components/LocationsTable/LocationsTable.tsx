import { getRelativeDate } from '../../utils/getRelativeDate';
import { ILocation } from '../LocationsView/LocationsView';
import Button from '../UI/Button/Button';
import styles from './LocationsTable.module.scss';

interface ILocationsTableProps {
	locations?: ILocation[];
}

/**
 * Locations table component
 */
export default function LocationsTable(props: ILocationsTableProps): JSX.Element {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<p>Locations</p>
				<Button className="primary">Add Location</Button>
			</div>
			<table className={styles.table}>
				<thead className={styles.thead}>
					<tr className={styles.theadTr}>
						<th>Location</th>
						<th>Location No</th>
						<th>Chargers</th>
						<th>Country</th>
						<th>Last Updated</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{props.locations &&
						props.locations.map(location => (
							<tr key={location._id} className={styles.tbodyTr}>
								<td>{location.name}</td>
								<td>{location.location}</td>
								<td>{location.chargers.length}</td>
								<td>{location.country}</td>
								<td>{getRelativeDate(location.updatedAt)}</td>
								<td>
									<Button className="secondary">Edit</Button>
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}
