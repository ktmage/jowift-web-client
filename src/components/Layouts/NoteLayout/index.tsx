import { ListDetailLayout } from '..';

interface NoteLayoutProps {
	children: React.ReactNode;
}

export default function NoteLayout(props: NoteLayoutProps) {
	return (
		<ListDetailLayout
			items={[
				{ text: 'Note 1', to: '/app/note/1' },
				{ text: 'Note 2', to: '/app/note/2' },
				{ text: 'Note 3', to: '/app/note/3' },
			]}
		>
			{props.children}
		</ListDetailLayout>
	);
}
