import clsx from 'clsx';

type ChipProps = {
	label: string;
	onDelete: () => void;
	readOnly?: boolean;
	className?: string;
};

export default function Chip({ label, onDelete, readOnly, className }: ChipProps) {
	return (
		<div
			className={clsx(
				'flex items-center bg-base-200 rounded-full px-4 py-1 text-sm',
				className,
			)}
		>
			<span>{label}</span>
			<button
				type='button'
				className={clsx('ml-2 text-gray-500 hover:text-gray-700', readOnly && 'hidden')}
				onClick={onDelete}
			>
				&times;
			</button>
		</div>
	);
}
