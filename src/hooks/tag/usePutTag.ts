import { TagRepository } from '@/repositories';
import { useMutation, useTagList } from '@/hooks';
import { TagModel } from '@/models';
import { MutationOptions } from '@/types';

export default function usePutTag(
	id: string,
	name: string,
	options: MutationOptions<TagModel> = {},
) {
	const tagRepository = new TagRepository();
	const { tagList, mutateTagList } = useTagList();

	const { mutate, isLoading, error } = useMutation<TagModel>(
		async () => {
			return await tagRepository.put(id, name);
		},
		{
			...options,
			onSuccess: (updatedTag: TagModel) => {
				// 更新に成功した場合
				// TagList(キャッシュ)の該当するTagを更新 サーバー側と同期する。
				const newTagList = tagList?.map((tag: TagModel) => {
					if (tag.id === id) {
						return updatedTag;
					}
					return tag;
				});
				mutateTagList(newTagList, false);

				options.onSuccess?.(updatedTag);
			},
		},
	);

	return { putTag: mutate, isLoading, error };
}
