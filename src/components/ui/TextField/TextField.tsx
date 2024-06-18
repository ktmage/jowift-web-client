import { TextareaHTMLAttributes, useEffect, useRef } from 'react';
import clsx from 'clsx';

/**
 * Props for the TextField component.
 */
interface TextFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	/**
	 * The value of the TextField.
	 * @default 'body'
	 * */
	typography?: 'title' | 'body';
}

export default function TextField({
	value,
	className,
	typography = 'body',
	...rest
}: TextFieldProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	// テキストエリアの高さを自動調整する
	useEffect(() => {
		if (textareaRef.current && containerRef.current) {
			textareaRef.current.style.height = 'auto';
			containerRef.current.style.height = 'auto';
			const scrollHeight = textareaRef.current.scrollHeight;
			textareaRef.current.style.height = `${scrollHeight}px`;
			containerRef.current.style.height = `${scrollHeight}px`;
		}
	}, [value]);

	return (
		<div
			ref={containerRef}
			className='w-full'
		>
			<textarea
				ref={textareaRef}
				className={clsx(
					'textarea w-full break-words min-h-fit resize-none overflow-hidden',
					'border-0 outline-none bg-transparent',
					'focus:outline-none disabled:bg-transparent',
					typography === 'title' && 'text-2xl font-bold',
					className,
				)}
				rows={1}
				value={value}
				{...rest}
			/>
		</div>
	);
}
