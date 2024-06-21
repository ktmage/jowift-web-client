import React, { useState } from 'react';

type TagOption = string;

export default function Autocomplete() {
	const [tags, setTags] = useState<TagOption[]>([]);
	const [inputValue, setInputValue] = useState<string>('');
	const [showOptions, setShowOptions] = useState<boolean>(false);
	const [options, setOptions] = useState<TagOption[]>([
		'React',
		'Vue',
		'Angular',
		'Node.js',
		'Python',
		'Java',
		'TypeScript',
		'JavaScript',
		'HTML',
		'CSS',
	]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		setShowOptions(true);
		const filteredOptions = options.filter((option) =>
			option.toLowerCase().includes(e.target.value.toLowerCase()),
		);
		setOptions(filteredOptions);
	};

	const handleOptionSelect = (option: TagOption) => {
		setTags([...tags, option]);
		setInputValue('');
		setShowOptions(false);
		setOptions([
			'React',
			'Vue',
			'Angular',
			'Node.js',
			'Python',
			'Java',
			'TypeScript',
			'JavaScript',
			'HTML',
			'CSS',
		]);
	};

	const handleCreateNewTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			const newTag = inputValue.trim();
			if (newTag && !tags.includes(newTag)) {
				setTags([...tags, newTag]);
				setInputValue('');
				setShowOptions(false);
			}
		}
	};

	const handleRemoveTag = (tag: TagOption) => {
		setTags(tags.filter((t) => t !== tag));
	};

	return (
		<div className='relative'>
			<div className='flex flex-wrap items-center border border-gray-300 rounded-md p-2'>
				{tags.map((tag, index) => (
					<div
						key={index}
						// TODO: 二行目からはmbを0にしたい
						className='flex items-center bg-gray-200 rounded-md px-2 py-1 mr-2 mb-2'
					>
						<span>{tag}</span>
						<button
							type='button'
							className='ml-2 text-gray-500 hover:text-gray-700'
							onClick={() => handleRemoveTag(tag)}
						>
							&times;
						</button>
					</div>
				))}
				<input
					type='text'
					className='flex-1 bg-transparent outline-none'
					placeholder='タグを入力...'
					value={inputValue}
					onChange={handleInputChange}
					onFocus={() => setShowOptions(true)}
					onKeyDown={handleCreateNewTag}
				/>
			</div>
			{showOptions && (
				<div className='absolute z-10 bg-white border border-gray-300 rounded-md mt-2 w-full'>
					{options.map((option, index) => (
						<div
							key={index}
							className='px-4 py-2 cursor-pointer hover:bg-gray-100'
							onClick={() => handleOptionSelect(option)}
						>
							{option}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
