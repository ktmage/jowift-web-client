import { TagModel } from '@/models';
import { useEffect, useState } from 'react';
import { useTagList } from '@/hooks';

export default function useCachedTag(id: string) {
	const [tag, setTag] = useState<TagModel | null>(null);
	const { tagList, isLoading, error } = useTagList();

	useEffect(() => {
		if (tagList) {
			const targetTag = tagList.find((tag: TagModel) => tag.id === id);
			if (targetTag) {
				setTag(targetTag);
			}
		}
	}, [tagList, id]);

	return { tag, isLoading, error };
}
