import styles from './SnackBar.module.scss';

interface ISnackBarProps {
	message: string;
	open: boolean;
	type: string;
}

/**
 * Snackbar component for notifications
 */
export default function SnackBar(props: ISnackBarProps): JSX.Element {
	return props.open ? (
		<div className={`${styles.container} ${styles[props.type]}`}>
			<p>{props.message}</p>
		</div>
	) : (
		<></>
	);
}
