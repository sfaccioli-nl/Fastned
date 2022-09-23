import styles from './Card.module.scss';

interface ICardProps {
	title: string;
	data: ICardData[];
	onCardClick?: () => void;
	links?: any;
}

export interface ICardData {
	label: string;
	value: string | number | any;
}

/**
 * Card component to render every row
 */
export default function Card({ title, data, onCardClick, links }: ICardProps): JSX.Element {
	/**
	 * Handles card click
	 */
	function handleClick() {
		onCardClick?.();
	}

	return (
		<div className={styles.container} onClick={() => handleClick()}>
			<h2>{title}</h2>
			<div className={styles.info}>
				{data.map((element, idx) => (
					<div key={idx} className={styles.field}>
						<h3>{element.label}</h3>
						<span>{element.value}</span>
					</div>
				))}
			</div>
			{links}
		</div>
	);
}
