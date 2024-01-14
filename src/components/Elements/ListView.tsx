import { Box, List, ListItemButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ListItem } from '@/types';

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
						<Typography
							color='text.primary'
							variant='subtitle1'
						>
							{item.text}
						</Typography>
					</ListItemButton>
				))}
			</List>
		</Box>
	);
}
