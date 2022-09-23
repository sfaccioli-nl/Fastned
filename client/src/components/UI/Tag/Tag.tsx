import styles from './Tag.module.scss';

interface ITagProps {
	text: string;
	color: string;
}

/**
 * Tag component
 */
export default function Tag(props: ITagProps): JSX.Element {
	return <p className={`${styles.tag} ${styles[props.color]}`}>{props.text}</p>;
}
