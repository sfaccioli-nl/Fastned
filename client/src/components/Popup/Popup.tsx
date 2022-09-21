import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../UI/Button/Button';
import styles from './Popup.module.scss';

interface IPopup {
	visible: boolean;
	setVisible: (arg: boolean) => void;
	title: string;
	content: JSX.Element;
	submitRef: any;
	onSave?: () => void;
}

/**
 * Popup component
 */
export default function Popup(props: IPopup): JSX.Element {
	return (
		<>
			{props.visible && (
				<div className={styles.container}>
					<div className={styles.contentBox}>
						<div className={styles.header}>
							<p>{props.title}</p>
							<FontAwesomeIcon icon={faClose} onClick={() => props.setVisible(false)} />
						</div>
						<div className={styles.content}>{props.content}</div>
						<div className={styles.actions}>
							<Button className="primary" onClick={() => props.submitRef.current.click()}>
								Save
							</Button>
							<Button className="secondary" onClick={() => props.setVisible(false)}>
								Cancel
							</Button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
