import { PropsWithChildren } from 'react';
import styles from './Button.module.scss';

interface IButton extends PropsWithChildren {
	className: 'primary' | 'secondary';
	type?: 'button' | 'submit' | 'reset' | undefined;
	onClick?: (data?: any) => void;
}

/**
 * Flat button component
 */
export default function Button(props: IButton): JSX.Element {
	return (
		<button type={props.type} className={`${styles.button} ${styles[props.className]}`} onClick={props.onClick}>
			{props.children}
		</button>
	);
}
