import React, { useState, useRef, useEffect } from 'react';
import Chip from './Chip/Chip';
import clsx from 'clsx';

interface MultipleSelectorProps {
	options: string[];
	value: string[];
	placeholder: string;
	onChange: (newValue: string[]) => void;
	onCreate?: (newTag: string) => void;
	readOnly?: boolean;
	alwaysOpen?: boolean;
	noElevation?: boolean;
}

export default function MultipleSelector({
	options,
	value,
	placeholder,
	onChange,
	onCreate,
	readOnly = false,
	alwaysOpen = false,
	noElevation = false,
}: MultipleSelectorProps) {
	const [inputValue, setInputValue] = useState<string>('');
	const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const filtered = options.filter((option) =>
			option.toLowerCase().includes(inputValue.toLowerCase()),
		);
		setFilteredOptions(filtered);
	}, [inputValue, options]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		setIsOpen(true);
	};

	const handleSelectItem = (item: string) => {
		if (!value.includes(item)) {
			onChange([...value, item]);
			if (!options.includes(item) && onCreate) {
				onCreate(item);
			}
		}
		setInputValue('');
		setIsOpen(false);
		inputRef.current?.focus();
	};

	const handleRemoveItem = (item: string) => {
		onChange(value.filter((i) => i !== item));
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && inputValue.trim() !== '') {
			handleSelectItem(inputValue.trim());
		} else if (e.key === 'Escape') {
			setIsOpen(false);
		}
	};

	return (
		<div
			ref={wrapperRef}
			className='relative'
		>
			<div className='flex flex-wrap gap-2 px-4 py-2'>
				{value.map((item) => (
					<Chip
						key={item}
						label={item}
						onDelete={() => handleRemoveItem(item)}
						readOnly={readOnly}
					/>
				))}
				<input
					ref={inputRef}
					type='text'
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					onFocus={() => setIsOpen(true)}
					className={clsx(
						'flex-1 bg-transparent outline-none',
						'focus:outline-none disabled:bg-transparent',
						readOnly && 'hidden',
					)}
					placeholder={placeholder}
				/>
			</div>
			{(isOpen || alwaysOpen) && !readOnly && (
				<ul
					className={clsx(
						noElevation ? '' : 'shadow-lg',
						'w-full bg-base-200 border-base-300 mt-1 rounded-md overflow-auto z-10',
						'min-h-60 max-h-60',
					)}
				>
					{filteredOptions.map((option) => (
						<li
							key={option}
							onClick={() => handleSelectItem(option)}
							className='px-4 py-2 hover:bg-base-300 cursor-pointer'
						>
							{option}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
