import { ListView } from '@/components/Elements';
import { ListDetailLayout } from '..';

interface TagLayoutProps {
	children: React.ReactNode;
}

export default function TagLayout(props: TagLayoutProps) {
	return (
		<ListDetailLayout
			sidebar={
				<ListView
					items={[
						{ text: 'Tag 1', to: '/app/tag/1' },
						{ text: 'Tag 2', to: '/app/tag/2' },
						{ text: 'Tag 3', to: '/app/tag/3' },
					]}
				/>
			}
		>
			{props.children}
		</ListDetailLayout>
	);
}
