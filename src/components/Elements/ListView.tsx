import { Box, List, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';

interface ListViewItem {
	text: string;
	to: string;
}

interface ListViewProps {
	items: ListViewItem[];
}

export default function ListView(props: ListViewProps) {
	return (
		<Box
			bgcolor={'background.paper'}
			height={'100%'}
			display={'flex'}
			flexDirection={'column'}
			overflow={'visible'}
			sx={{
				overflowX: 'hidden',
			}}
		>
			<List>
				{props.items.map((item, index) => (
					<ListItemButton
						key={index}
						component={Link}
						to={item.to}
					>
						{item.text}
					</ListItemButton>
				))}
			</List>
		</Box>
	);
}
