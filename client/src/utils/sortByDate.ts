type SortType<T> = Array<T & { updatedAt: string }>;

/**
 * Sort array by date desc
 */
export function sortByDateDesc<T>(arrToSort: SortType<T>): Array<T> {
	return [...arrToSort].sort((a, b) => {
		return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
	});
}
