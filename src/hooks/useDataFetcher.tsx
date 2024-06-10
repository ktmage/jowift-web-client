// src/hooks/useDataFetcher.ts
import useSWR, { Fetcher, SWRConfiguration } from 'swr';
import useNotification from './useNotification';
import { useEffect, useState } from 'react';

interface SWR<T> {
	key: string | null;
	fetcher: Fetcher<T>;
	options?: Partial<SWRConfiguration<T, Error>>;
}

export default function useDataFetcher<T>(swr: SWR<T>, errorMessage: string) {
	const { data, error, isLoading, mutate } = useSWR<T>(swr.key, swr.fetcher);
	const { dispatchNotification } = useNotification();
	const [notified, setNotified] = useState(false);

	useEffect(() => {
		if (error && !notified) {
			dispatchNotification({
				severity: 'error',
				message: errorMessage,
			});
			setNotified(true);
		}
		if (!error && notified) {
			setNotified(false);
		}
	}, [error, dispatchNotification, errorMessage, notified]);

	return { data, error, isLoading, mutate };
}
