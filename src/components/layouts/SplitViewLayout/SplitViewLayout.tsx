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
};

export default function SplitViewLayout(props: SplitViewLayoutProps) {
	return (
		<div
			className={clsx('flex h-screen', {
				'flex-row': props.direction === 'horizontal',
				'flex-col': props.direction === 'vertical',
				'flex-row-reverse': props.direction === 'horizontal-reverse',
				'flex-col-reverse': props.direction === 'vertical-reverse',
			})}
		>
			<div className='w-1/3'>{props.contents.primary}</div>
			<div className='flex-grow'>{props.contents.secondary}</div>
		</div>
	);
}
