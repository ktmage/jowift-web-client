import { TagRepository } from '@/repositories';
import { useMutation, useTagList } from '@/hooks';
import { TagModel } from '@/models';
import { MutationOptions } from '@/types';

export default function usePostTag(name: string, options: MutationOptions<TagModel> = {}) {
	const tagRepository = new TagRepository();
	const { tagList, mutateTagList } = useTagList();

	const { mutate, isLoading, error } = useMutation<TagModel>(
		async () => {
			return await tagRepository.post(name);
		},
		{
			...options,
			onSuccess: (createdTag: TagModel) => {
				// 作成に成功した場合
				// TagList(キャッシュ)に新しいTagを追加 サーバー側と同期する。
				// ここでは、追加するだけなので、TagListのキャッシュを更新するだけ
				const newTagList = tagList ? [...tagList, createdTag] : [createdTag];
				mutateTagList(newTagList, false);

				options.onSuccess?.(createdTag);
			},
		},
	);

	return { postTag: mutate, isLoading, error };
}
