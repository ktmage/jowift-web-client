import { SplitViewContext } from '@/components/layouts/SplitViewLayout/SplitViewLayout';
import { useContext } from 'react';

export default function useSplitView() {
	const context = useContext(SplitViewContext);

	if (!context) {
		throw new Error('useSplitView must be used within a SplitViewProvider');
	}

	return context;
}
