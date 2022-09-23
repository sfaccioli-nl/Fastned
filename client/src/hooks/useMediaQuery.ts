import { useEffect, useState } from 'react';

/**
 * Hook to use the window's current size
 */
export default function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const media = window.matchMedia(query);
		if (media.matches !== matches) {
			setMatches(media.matches);
		}

		// eslint-disable-next-line func-style
		const listener = () => setMatches(media.matches);
		window.addEventListener('resize', listener);
		return () => window.removeEventListener('resize', listener);
	}, [matches, query]);

	return matches;
}
