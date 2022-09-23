import { ILocation } from '../LocationsView/LocationsView';
import styles from './LocationsTable.module.scss';
import GenericTable from '../GenericTable/GenericTable';
import { getRelativeDate } from '../../utils/getRelativeDate';
import Button from '../UI/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import useMediaQuery from '../../hooks/useMediaQuery';
import Card, { ICardData } from '../Card/Card';

interface ILocationsTableProps {
	locations?: ILocation[];
}

export interface ILocationsTableValue {
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
	const isMedium = useMediaQuery('(max-width: 767px)');
	const navigation = useNavigate();

	const locationsTableData: ILocationsTableValue[] | undefined = props.locations?.map(location => ({
		name: location.name,
		location: location.location,
		chargers: location.chargers?.length,
		country: location.country,
		updatedAt: getRelativeDate(location.updatedAt),
		link: isMedium ? (
			`/location/${location._id}`
		) : (
			<Link to={`/location/${location._id}`} key={location._id}>
				<Button className="secondary">Edit</Button>
			</Link>
		)
	}));

	/**
	 * Maps location to card data model
	 */
	function mapToCard(location: ILocationsTableValue): ICardData[] {
		return [
			{
				label: 'Location No',
				value: location.location
			},
			{
				label: 'Chargers',
				value: location.chargers
			},
			{
				label: 'Country',
				value: location.country
			},
			{
				label: 'Last Updated',
				value: getRelativeDate(location.updatedAt)
			}
		] as ICardData[];
	}

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
			{locationsTableData &&
				(isMedium ? (
					locationsTableData.map((location: ILocationsTableValue, idx: number) => (
						<Card key={idx} title={location.name} data={mapToCard(location)} onCardClick={() => navigation(location.link)} />
					))
				) : (
					<GenericTable tableHeadTitles={tableTitles} data={locationsTableData} />
				))}
		</div>
	);
}
