// src/hooks/useDataFetcher.ts
import useSWR, { Fetcher, SWRConfiguration } from 'swr';
import useNotification from './useNotification';
import { useEffect, useState } from 'react';

export default function useDataFetcher<T>(
	key: string | null,
	fetcher: Fetcher<T>,
	options?: Partial<SWRConfiguration<T, Error>>,
) {
	const { data, error, isLoading, mutate } = useSWR<T>(key, fetcher, options);
	const { dispatchNotification } = useNotification();
	const [notified, setNotified] = useState(false);

	useEffect(() => {
		if (error && !notified) {
			dispatchNotification({
				severity: 'error',
				message: error.message,
			});
			setNotified(true);
		}
		if (!error && notified) {
			setNotified(false);
		}
	}, [error, dispatchNotification, notified]);

	return { data, error, isLoading, mutate };
}
