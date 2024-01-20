import { ListView } from '@/components/Elements';
import { useResponsive } from '@/hooks';
import { Box, ButtonBase } from '@mui/material';
import { useState } from 'react';
import { ListHeaderItem, ListItem } from '@/types';

interface ListDetailLayoutProps {
	items: ListItem[];
	children: React.ReactNode;
	listHeaderItems?: ListHeaderItem[];
}

export default function ListDetailLayout(props: ListDetailLayoutProps) {
	const { isMobile, isTablet, isDesktop } = useResponsive();
	const [isListOpen, setIsListOpen] = useState<boolean>(true);
	const toggleListOpen = () => setIsListOpen(!isListOpen);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				height: isMobile ? '100%' : isTablet ? '100%' : '100vh',
			}}
		>
			<Box
				sx={{
					width: isDesktop ? '300px' : isListOpen ? '100%' : '0px',
					display: isListOpen ? 'block' : 'none',
				}}
			>
				<ListView
					items={props.items}
					headerItems={props.listHeaderItems}
				/>
			</Box>
			<ButtonBase
				sx={{
					height: '100%',
					width: '20px',
					bgcolor: 'divider',
				}}
				onClick={toggleListOpen}
			/>

			<Box
				sx={{
					flexGrow: isDesktop ? 1 : isListOpen ? 0 : 1,
					display: isDesktop ? 'block' : isListOpen ? 'none' : 'block',
				}}
			>
				{props.children}
			</Box>
		</Box>
	);
}
