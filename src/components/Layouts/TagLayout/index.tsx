import { ListView } from '@/components/Elements';
import SidebarDetailLayout from '../SidebarDetailLayout';

interface TagLayoutProps {
	children: React.ReactNode;
}

export default function TagLayout(props: TagLayoutProps) {
	return (
		<SidebarDetailLayout
			sidebar={
				<ListView
					items={[
						{ text: 'Tag 1', to: '/tag/1' },
						{ text: 'Tag 2', to: '/tag/2' },
						{ text: 'Tag 3', to: '/tag/3' },
					]}
				/>
			}
		>
			{props.children}
		</SidebarDetailLayout>
	);
}
