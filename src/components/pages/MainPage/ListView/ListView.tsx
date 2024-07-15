import { Box, Divider, List, ListItemButton, Tooltip, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ListHeaderItem } from '@/types';
import { useNoteList, useResponsive, useSplitView } from '@/hooks';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@/components/ui/IconButton/IconButton';
import DehazeIcon from '@mui/icons-material/Dehaze';

export default function ListView() {
	const { toggleSplitRatio } = useSplitView();

	const navigate = useNavigate();

	const { noteList } = useNoteList();

	const { isMobile } = useResponsive();

	const headerItems: ListHeaderItem[] = [
		{
			icon: <AddIcon />,
			onClick: () => {
				navigate('/');
			},
			disabled: false,
		},
	];

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
						Overview
					</Typography>
				</Box>
				{headerItems?.map((item: ListHeaderItem, index: number) => (
					<IconButton
						key={index}
						onClick={item.onClick}
						disabled={item.disabled}
						variant='ghost'
						size='small'
					>
						{item.icon}
					</IconButton>
				))}
				{/* Mobileだったら追加でIconButtonを表示 */}
				{isMobile && (
					<IconButton
						onClick={toggleSplitRatio}
						variant='ghost'
						size='small'
					>
						<DehazeIcon />
					</IconButton>
				)}
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
					{noteList?.map((note) => (
						<Tooltip
							title={note.title}
							placement='right'
							disableHoverListener={note.title.length < 20}
						>
							<ListItemButton
								key={note.id}
								component={Link}
								to={`/${note.id}`}
							>
								<Typography
									color='text.primary'
									variant='subtitle1'
									whiteSpace={'nowrap'}
									sx={{
										overflow: 'hidden',
										textOverflow: 'ellipsis',
									}}
								>
									{note.title}
								</Typography>
							</ListItemButton>
						</Tooltip>
					))}
				</List>
			</Box>
		</Box>
	);
}
