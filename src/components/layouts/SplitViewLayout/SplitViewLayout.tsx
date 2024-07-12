import React from 'react';
import clsx from 'clsx';

type SplitViewContent = {
	primary: React.ReactNode;
	secondary: React.ReactNode;
};

type SplitViewDirection =
	| 'horizontal'
	| 'vertical'
	| 'horizontal-reverse'
	| 'vertical-reverse'
	| 'auto';

type SplitViewLayoutProps = {
	contents: SplitViewContent;
	direction?: SplitViewDirection;
	splitRatio: number;
};

export default function SplitViewLayout(props: SplitViewLayoutProps) {
	const { contents, direction, splitRatio } = props;

	return (
		<div
			className={clsx('flex h-screen', {
				'flex-row': direction === 'horizontal',
				'flex-col': direction === 'vertical',
				'flex-row-reverse': direction === 'horizontal-reverse',
				'flex-col-reverse': direction === 'vertical-reverse',
			})}
		>
			<div
				className='border-r-2 transition-all duration-300'
				style={{ width: `${splitRatio * 100}%` }}
			>
				{contents.primary}
			</div>
			<div
				className='transition-all duration-300'
				style={{ width: `${(1 - splitRatio) * 100}%` }}
			>
				{contents.secondary}
			</div>
		</div>
	);
}
