import { Box, List, ListItemButton } from '@mui/material';
import { Link } from 'react-router-dom';

type ListItem = {
	text: string;
	to: string;
};

type ListViewProps = {
	items: ListItem[];
};

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
				{props.items.map((item: ListItem, index: number) => (
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
