import { Box, List, ListItemButton, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ListItem } from '@/types';
import { useOverflowDetect } from '@/hooks';

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
					<ListViewItem
						key={index}
						{...item}
					/>
				))}
			</List>
		</Box>
	);
}

function ListViewItem(item: ListItem) {
	const [ref, isOverflowing] = useOverflowDetect();
	return (
		<Tooltip
			title={item.text}
			placement='right'
			disableHoverListener={!isOverflowing}
		>
			<ListItemButton
				component={Link}
				to={item.to}
			>
				<Typography
					ref={ref}
					color='text.primary'
					variant='subtitle1'
					whiteSpace={'nowrap'}
					sx={{
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}
				>
					{item.text}
				</Typography>
			</ListItemButton>
		</Tooltip>
	);
}
