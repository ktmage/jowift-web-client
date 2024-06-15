import { useTagList } from '@/hooks';
import { TagModel } from '@/models';
import { Autocomplete, TextField } from '@mui/material';
import React from 'react';

interface MultipleTagSelectorProps {
	value: TagModel[];
	setValue: React.Dispatch<React.SetStateAction<TagModel[]>>;
	readonly?: boolean;
}

export default function MultipleTagSelector(props: MultipleTagSelectorProps) {
	const { value, setValue, readonly = false } = props;

	const { tagList } = useTagList();

	// valueと同じidを持つタグをTagsから探して返す。
	const getTagsFromValues = (values: TagModel[]): TagModel[] => {
		const availableTags = tagList ?? [];
		return values.map((value) => availableTags.find((tag) => tag.id === value.id) || value);
	};

	return (
		<Autocomplete
			multiple
			readOnly={readonly}
			options={tagList ? tagList : []}
			getOptionLabel={(option) => option.name}
			value={getTagsFromValues(value)}
			onChange={(_e, value) => setValue(value)}
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
