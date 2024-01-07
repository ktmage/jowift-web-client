import { useTagList } from '@/hooks';
import { Tag } from '@/models';
import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

interface MultipleTagSelectorProps {
	value: Tag[];
	setValue: React.Dispatch<React.SetStateAction<Tag[]>>;
	readonly?: boolean;
}

export default function MultipleTagSelector(props: MultipleTagSelectorProps) {
	const { value, setValue, readonly = false } = props;

	const { data } = useTagList();

	// valueと同じidを持つタグをTagsから探して返す。
	const getTagsFromValues = (values: Tag[]): Tag[] => {
		const availableTags = data ?? [];
		return values.map((value) => availableTags.find((tag) => tag.id === value.id) || value);
	};

	return (
		<Autocomplete
			multiple
			readOnly={readonly}
			options={data ? data : []}
			getOptionLabel={(option) => option.name}
			value={getTagsFromValues(value)}
			onChange={(e, value) => setValue(value)}
			renderInput={(params) => (
				<TextField
					{...params}
					placeholder='タグ'
					size='small'
				/>
			)}
		/>
	);
}
