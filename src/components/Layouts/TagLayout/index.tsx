import { ListDetailLayout } from '..';
import { useTagList } from '@/hooks';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

interface TagLayoutProps {
	children: React.ReactNode;
}

export default function TagLayout(props: TagLayoutProps) {
	const { data } = useTagList();
	const navigate = useNavigate();

	return (
		<ListDetailLayout
			items={
				data?.map((tag) => ({
					text: tag.name,
					to: `/app/tag/${tag.id}`,
				})) ?? []
			}
			listHeaderItems={[
				{
					icon: <AddIcon />,
					onClick: () => navigate('/app/tag'),
				},
			]}
		>
			{props.children}
		</ListDetailLayout>
	);
}
