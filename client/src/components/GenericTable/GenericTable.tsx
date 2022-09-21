import styles from './GenericTable.module.scss';

interface IGenericTableProps<T extends Object> {
	tableHeadTitles: string[];
	data: T[] | undefined;
}

/**
 * Generic table component
 */
export default function GenericTable<T extends Object>(props: IGenericTableProps<T>): JSX.Element {
	return (
		<table className={styles.table}>
			<thead className={styles.thead}>
				<tr className={styles.theadTr}>
					{props.tableHeadTitles.map((title, idx) => (
						<th key={`{${idx}-${title}}`}>{title}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{props.data &&
					props.data.map((row, rowIdx) => (
						<tr key={rowIdx} className={styles.tbodyTr}>
							{Object.values(row).map((detail, detailIdx) => (
								<td key={detailIdx}>{detail}</td>
							))}
						</tr>
					))}
			</tbody>
		</table>
	);
}
