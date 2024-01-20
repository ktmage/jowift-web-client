import { useRef, useEffect, useState } from 'react';

export default function useOverflowDetect() {
	const ref = useRef<HTMLDivElement>(null);
	const [isOverflowing, setIsOverflowing] = useState(false);

	useEffect(() => {
		function checkOverflow() {
			const element = ref.current;
			if (element) {
				setIsOverflowing(element.scrollWidth > element.clientWidth);
			}
		}

		checkOverflow();

		window.addEventListener('resize', checkOverflow);
		return () => {
			window.removeEventListener('resize', checkOverflow);
		};
	}, []);

	return [ref, isOverflowing] as const;
}
