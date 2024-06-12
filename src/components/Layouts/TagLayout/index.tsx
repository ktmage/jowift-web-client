import { ListDetailLayout } from '..';
import { useTagList } from '@/hooks';
import { useMatch, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

interface TagLayoutProps {
	children: React.ReactNode;
}

export default function TagLayout(props: TagLayoutProps) {
	const { tagList } = useTagList();
	const navigate = useNavigate();
	const matchCreate = useMatch('/app/tag/');

	return (
		<ListDetailLayout
			text={'タグ一覧'}
			items={
				tagList?.map((item) => ({
					text: item.name,
					to: `/app/tag/${item.id}`,
				})) ?? []
			}
			listHeaderItems={[
				{
					icon: <AddIcon />,
					onClick: () => navigate('/app/tag'),
					disabled: !!matchCreate,
				},
			]}
		>
			{props.children}
		</ListDetailLayout>
	);
}
