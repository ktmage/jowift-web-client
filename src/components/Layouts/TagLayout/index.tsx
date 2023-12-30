import { ListDetailLayout } from '..';
import { useTagList } from '@/hooks';

interface TagLayoutProps {
	children: React.ReactNode;
}

export default function TagLayout(props: TagLayoutProps) {
	const { data } = useTagList();
	return (
		<ListDetailLayout
			items={
				data?.tags.map((tag) => ({
					text: tag.name,
					to: `/app/tag/${tag.id}`,
				})) ?? []
			}
		>
			{props.children}
		</ListDetailLayout>
	);
}
