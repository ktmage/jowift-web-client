import { TagRepository } from '@/repositories';
import { useMutation, useTagList } from '@/hooks';
import { MutationOptions } from '@/types';

export default function useDeleteTag(options: MutationOptions<string> = {}) {
	const tagRepository = new TagRepository();
	const { tagList, mutateTagList } = useTagList();

	const { mutate, isLoading, error } = useMutation<string, string[]>(
		async (id: string) => {
			return await tagRepository.delete(id);
		},
		{
			...options,
			onSuccess: (deletedTagId: string) => {
				// 削除に成功した場合
				// TagList(キャッシュ)の該当するTagを削除 サーバー側と同期する。
				const newTagList = tagList?.filter((tag) => tag.id !== deletedTagId);
				mutateTagList(newTagList, false);

				options.onSuccess?.(deletedTagId);
			},
		},
	);

	return { deleteTag: mutate, isLoading, error };
}
