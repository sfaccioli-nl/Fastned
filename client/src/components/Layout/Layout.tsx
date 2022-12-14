import { Link, Outlet } from 'react-router-dom';
import { useSnackBar } from '../../contexts/SnackBarContext/snackBarContext';
import SnackBar from '../SnackBar/SnackBar';
import styles from './Layout.module.scss';

/**
 * Layout component
 */
export default function Layout(): JSX.Element {
	const { snackBar } = useSnackBar();

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Link to={'/'}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 201 20">
						<g fill="none" fillRule="evenodd">
							<path
								fill="#4a4a49"
								d="M3.7 3.5v4.2c0 .1.1.1.1.1h6.5c.1 0 .1.1.1.1L9.2 11H3.8l-.1.1v7.6c0 .1 0 .1-.1.1H.1c-.1 0-.1 0-.1-.1V.3C0 .2 0 .2.1.2h13.1s.1 0 .1.1l-1.2 3v.1H3.8l-.1.1"
								mask="url(#mask-2)"
								transform="translate(0 .95)"></path>
							<path
								fill="#4a4a49"
								d="M24.8 19.7l-1.5-4.3c0-.1 0-.1-.1-.1h-5.8c-.1 0-.1 0-.1.1l-1.5 4.3h-3.7c-.1 0-.2 0-.1-.1l6.8-18.4c0-.1.1-.1.1-.1h2.8l.1.1 6.8 18.4c.1.1 0 .1-.1.1h-3.7M20.3 6.9l-1.8 5s0 .1.1.1h3.5l.1-.1-1.7-5c-.1-.1-.2-.1-.2 0"></path>
							<path
								fill="#4a4a49"
								d="M5.6 18.9c-2-.1-3.9-.7-5.4-1.7 0 0-.1 0 0-.1.2-.6.9-2.4 1.1-3 0-.1.1-.1.2 0 1.1.9 2.9 1.5 4.4 1.6 2.2.1 3.4-.6 3.5-2.1.1-.6-.1-1.2-.5-1.6-.3-.4-.7-.5-1.6-.7L5 10.8c-1.6-.3-2.7-.9-3.5-1.8C.6 8.1.2 6.8.3 5.3.6 2 3.2-.2 7.3.1c1.7.1 3.2.5 4.4 1.2v.1c-.3.6-.8 2.1-1.1 2.8 0 .1-.1.1-.2.1-1-.7-2.4-1-3.4-1.1-2-.1-3 .9-3 2.2-.1.5 0 .9.4 1.3.3.4.9.7 1.7.9l2.2.4c1.7.4 2.8.9 3.5 1.7 1 1 1.4 2.4 1.3 4-.3 3.6-3.5 5.5-7.5 5.2"
								mask="url(#mask-4)"
								transform="translate(30.922 .95)"></path>
							<path
								fill="#4a4a49"
								d="M46.1 4.4c-.1 0-.1-.1-.1-.1V1.2s0-.1.1-.1H60c.1 0 .1.1.1.1L59 4.3c-.1 0-.1.1-.1.1H55s-.1 0-.1.1v15.2h-3.6-.1V4.5c0-.1 0-.1-.1-.1h-5zm28.8 15.3L67.5 8.6c0-.1-.1-.1-.1 0v11.1h-3.7-.1V1.2l.1-.1h3.2s.1 0 .1.1l7.3 11.1c.1 0 .2 0 .2-.1v-11s0-.1.1-.1h3.5l.1.1v18.5H74.9m8 0V1.2l.1-.1h12.4s.1.1 0 .1l-1.1 3.1-.1.1h-7.5s-.1 0-.1.1v4.1c0 .1.1.1.1.1h5.8c.1 0 .1.1.1.2l-1.1 3-.1.1h-4.7s-.1 0-.1.1v4.3c0 .1.1.1.1.1h8.6c.1 0 .1 0 .1.1v3.1H83h-.1m29-2.7c-1.4 1.9-3.1 2.7-5.7 2.7H99.3V1.2s0-.1.1-.1h6.8c2.6 0 4.3.9 5.7 2.7 1.2 1.6 1.2 3.5 1.2 6.6 0 3.1 0 5-1.2 6.6m-3.3-11.5c-.6-.7-1.5-1.1-2.8-1.1h-2.7s-.1 0-.1.1v11.9c0 .1.1.1.1.1h2.7c1.3 0 2.2-.4 2.8-1.2.7-.8.8-1.9.8-4.9 0-2.9-.1-4.1-.8-4.9"></path>
							<path
								fill="#FFDA39"
								d="M64 0L30.9 10 .2 0c-.8 9.6 4.1 11.2 4.1 11.2l23.6 7.7c.8.3 1.9.4 3 .4 1.2 0 2.2-.2 3.1-.5l25.2-7.6S64.1 9.6 64 0"
								mask="url(#mask-6)"
								transform="translate(136.857 .153)"></path>
						</g>
					</svg>
				</Link>

				<SnackBar message={snackBar.msg} open={snackBar.open} type={snackBar.type} />
			</div>
			<div className={styles.content}>
				<Outlet />
			</div>
		</div>
	);
}
