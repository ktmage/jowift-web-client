import clsx from 'clsx';
import React from 'react';

/**
 * Props for the IconButton component.
 */
interface IconButtonProps {
	/**
	 * The content of the IconButton.
	 * @example <SaveIcon />
	 */
	children?: React.ReactNode;

	/**
	 * Additional classes to apply to the IconButton.
	 */
	className?: string;

	/**
	 * The size of the IconButton.
	 * @default 'medium'
	 */
	size?: 'small' | 'medium' | 'large';

	/**
	 * The variant of the IconButton.
	 * @default 'contained'
	 */
	variant?: 'contained' | 'ghost';

	/**
	 * The mode of the IconButton.
	 * @default 'primary'
	 */
	mode?: 'primary' | 'secondary';

	/**
	 * Whether the IconButton is disabled.
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * The callback function to be executed when the IconButton is clicked.
	 */
	onClick?: () => void;
}

export default function IconButton({
	children,
	className,
	size = 'medium',
	variant = 'contained',
	mode = 'primary',
	disabled = false,
	onClick,
}: IconButtonProps) {
	return (
		<button
			type='button'
			className={clsx(
				'btn btn-circle',
				size === 'small' && 'btn-sm',
				size === 'large' && 'btn-lg',
				size === 'medium' && 'btn-md',
				variant === 'contained' && 'btn-primary',
				variant === 'ghost' && 'btn-ghost',
				mode === 'primary' && 'btn-primary',
				mode === 'secondary' && 'btn-secondary',
				className,
			)}
			onClick={onClick}
			disabled={disabled}
		>
			{React.cloneElement(children as React.ReactElement, { fontSize: size })}
		</button>
	);
}
