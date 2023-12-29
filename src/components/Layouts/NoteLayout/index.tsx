import { ListView } from '@/components/Elements';
import SidebarDetailLayout from '../SidebarDetailLayout';

interface NoteLayoutProps {
	children: React.ReactNode;
}

export default function NoteLayout(props: NoteLayoutProps) {
	return <SidebarDetailLayout sidebar={<ListView />}>{props.children}</SidebarDetailLayout>;
}
