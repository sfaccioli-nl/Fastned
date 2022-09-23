import { statusTypeMapper } from '../../ChargersTable/ChargersTable';
import styles from './Tag.module.scss';

interface ITagProps {
	text: string;
	statusColor: statusTypeMapper;
}

/**
 * Tag component
 */
export default function Tag(props: ITagProps): JSX.Element {
	return <span className={`${styles.tag} ${styles[props.statusColor]}`}>{props.text}</span>;
}
