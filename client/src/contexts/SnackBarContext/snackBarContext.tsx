import { createContext, useContext, useEffect, useState } from 'react';

type SnackBarProviderProps = { children: React.ReactNode };

const SnackBarContext = createContext<any | undefined>(undefined);

/**
 * Snackbar context provider
 */
function SnackBarProvider({ children }: SnackBarProviderProps) {
	const [snackBar, setSnackBar] = useState({
		open: false,
		msg: '',
		type: ''
	});

	useEffect(() => {
		const timer = setTimeout(() => {
			setSnackBar({ open: false, msg: '', type: '' });
		}, 5000);
		return () => clearTimeout(timer);
	}, [snackBar.open]);

	const value = { snackBar, setSnackBar };

	return <SnackBarContext.Provider value={value}>{children}</SnackBarContext.Provider>;
}

/**
 * Custom consumer hook
 */
function useSnackBar() {
	const context = useContext(SnackBarContext);
	if (context === undefined) {
		throw new Error('useSnackBar must be used within a SnackBarProvider');
	}
	return context;
}

export { SnackBarProvider, useSnackBar };
