import { ListView } from '@/components/Elements';
import { ListDetailLayout } from '..';

interface NoteLayoutProps {
	children: React.ReactNode;
}

export default function NoteLayout(props: NoteLayoutProps) {
	return <ListDetailLayout sidebar={<ListView />}>{props.children}</ListDetailLayout>;
}
