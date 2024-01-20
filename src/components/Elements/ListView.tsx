import { Box, Divider, IconButton, List, ListItemButton, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ListHeaderItem, ListItem } from '@/types';
import { useOverflowDetect } from '@/hooks';

type ListViewProps = {
	items: ListItem[];
	headerItems?: ListHeaderItem[];
};

export default function ListView(props: ListViewProps) {
	return (
		<Box
			bgcolor={'background.paper'}
			display={'flex'}
			flexDirection={'column'}
			height={'100%'}
		>
			<Box
				display={'flex'}
				flexDirection={'row-reverse'}
				padding={1}
			>
				{props.headerItems?.map((item: ListHeaderItem, index: number) => (
					<IconButton
						key={index}
						onClick={item.onClick}
					>
						{item.icon}
					</IconButton>
				))}
			</Box>
			<Divider />
			<Box
				height={'100%'}
				display={'flex'}
				flexGrow={1}
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
