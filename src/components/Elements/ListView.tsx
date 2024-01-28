import { Box, Divider, IconButton, List, ListItemButton, Tooltip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ListHeaderItem, ListItem } from '@/types';
import { useOverflowDetect } from '@/hooks';

type ListViewProps = {
	text: string;
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
				paddingY={1}
				paddingX={2}
			>
				<Box
					display={'flex'}
					alignItems={'center'}
					flexGrow={1}
					sx={{ overflow: 'hidden' }}
				>
					<Typography
						color={'text.secondary'}
						variant={'subtitle1'}
						sx={{
							fontWeight: 600,
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
						}}
					>
						{props.text}
					</Typography>
				</Box>
				{props.headerItems?.map((item: ListHeaderItem, index: number) => (
					<IconButton
						key={index}
						onClick={item.onClick}
						disabled={item.disabled}
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
