import { useEffect, useState } from 'react';

export default function useLocalStorage<T>(
	key: string,
	initialValue: T,
	validate: (value: T) => boolean,
) {
	const [value, setValue] = useState<T>(() => {
		try {
			const storedValue = localStorage.getItem(key);
			const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue;
			return validate(parsedValue) ? parsedValue : initialValue;
		} catch (error) {
			console.error(`Error parsing local storage key “${key}”:`, error);
			localStorage.removeItem(key);
			return initialValue;
		}
	});

	useEffect(() => {
		if (validate(value)) {
			localStorage.setItem(key, JSON.stringify(value));
		}
	}, [value, key, validate]);

	return { value, setValue };
}
