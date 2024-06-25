import { TagRepository } from '@/repositories';
import { useMutation, useTagList } from '@/hooks';
import { TagModel } from '@/models';
import { MutationOptions } from '@/types';

export default function usePostTag(options: MutationOptions<TagModel> = {}) {
	const tagRepository = new TagRepository();
	const { tagList, mutateTagList } = useTagList();

	const { mutate, isLoading, error } = useMutation<TagModel, string[]>(
		async (name: string) => {
			return await tagRepository.post(name);
		},
		{
			...options,
			onSuccess: (createdTag: TagModel) => {
				// 作成に成功した場合
				// TagList(キャッシュ)に新しいTagを追加 サーバー側と同期する。
				const newTagList = tagList ? [...tagList, createdTag] : [createdTag];
				mutateTagList(newTagList, false);

				options.onSuccess?.(createdTag);
			},
		},
	);

	return { postTag: mutate, isLoading, error };
}
