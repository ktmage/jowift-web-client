import clsx from 'clsx';

type ChipProps = {
	label: string;
	onDelete: () => void;
	readonly?: boolean;
};

export default function Chip({ label, onDelete, readonly }: ChipProps) {
	return (
		<div className='flex items-center bg-gray-200 rounded-full px-4 py-1 mr-2'>
			<span>{label}</span>
			<button
				type='button'
				className={clsx('ml-2 text-gray-500 hover:text-gray-700', readonly && 'hidden')}
				onClick={onDelete}
			>
				&times;
			</button>
		</div>
	);
}
