import { NoteModel } from '@/models';
import { NoteRepository } from '@/repositories';
import CacheKeyGenerator from '@/util/CacheKeyGenerator';
import useSWR from 'swr';

export default function useNote(id: string) {
	const repository = new NoteRepository();

	const { data, isLoading, error, mutate } = useSWR<NoteModel>(
		CacheKeyGenerator.generateNoteKey(id),
		() => repository.get(id),
		{
			dedupingInterval: 1000 * 60 * 5,
		},
	);

	return { data, isLoading, error, mutate };
}
