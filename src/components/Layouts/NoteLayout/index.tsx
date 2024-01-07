import { useNoteList } from '@/hooks';
import { ListDetailLayout } from '..';

interface NoteLayoutProps {
	children: React.ReactNode;
}

export default function NoteLayout(props: NoteLayoutProps) {
	const { data } = useNoteList();
	return (
		<ListDetailLayout
			items={
				data?.map((note) => ({
					text: note.title,
					to: `/app/note/${note.id}`,
				})) ?? []
			}
		>
			{props.children}
		</ListDetailLayout>
	);
}
